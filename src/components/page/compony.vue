<template>
    <div>
         <div class="divBut">
            <!-- <el-row>
                <el-button type="primary" round @click="add()">添加</el-button>

            </el-row> -->
            <!-- <div style="margin:0 60px 0 0;">
                总条数：<span>{{count}}</span>条
            </div> -->
        </div>
                 <!-- <div class="divBut" style="margin:20px 0 0 0;">
          <el-form :inline="true" class="demo-form-inline">
             <el-form-item label="公司名称">
                 <el-input placeholder="请输入公司名称" v-model="userNam"></el-input>
             </el-form-item>
             <el-form-item label="所属大区">
                 <el-select  v-model="formIn"  placeholder="请选择大区">
                 </el-select>
             </el-form-item>
             <el-form-item label="所属分公司">
                 <el-select  v-model="formInline"  placeholder="请选择分公司">
                 </el-select>
             </el-form-item>
             <el-form-item>
                 <el-button type="primary" @click="searchUser()">查询</el-button>
             </el-form-item>
             </el-form>
         </div> -->
        <!-- 表格 -->
         <table style="width:100%;border:1px solid #ccc;margin:10px 0 0 0;">
          <thead>
            <th>序号</th>
            <th>公司名称</th>
            <th>城市管理</th>
            <th>操作</th>
          </thead>
          <tbody>
            <template v-for="(item,index) in options">
                    <tr>
                        <td>{{Number(index)+1}}</td>
                        <td>{{item.level}}{{item.name}}</td>
                        <td>
                            <el-button type="primary" size="small" round :data_id="item.c_id" @click.native.prevent="allotCity($event)">分配城市</el-button>
                            <el-button type="primary" size="small" round :data_id="item.c_id" @click.native.prevent="seeCity($event)">查看城市</el-button>
                        </td>
                            <template v-if="item.level_num!='4'">
                                <td>
                                    <el-button type="primary" size="small" round :data_id="item.pid_path" @click="addChild($event)" >添加子公司</el-button>
                                    <el-button type="warning" size="small" round :data_id="item.c_id" @click="editChild($event)">修改</el-button>
                                    <el-button type="danger" size="small" round :data_id="item.pid_path" @click="delChild($event)">删除</el-button>
                                    
                                </td>
                            </template>
                            <template v-else>
                                <td>
                                    <span style="width:90px;display:inline-block;"></span>
                                    <el-button type="warning" size="small" round :data_id="item.c_id" @click="editChild($event)">修改</el-button>
                                    <el-button type="danger" size="small" round :data_id="item.pid_path" @click="delChild($event)">删除</el-button>
                                    
                                </td>
                            </template>
                            
                        
                    </tr>        
            </template>    
          </tbody>
        </table>
        <!-- 添加公司   弹框 -->
        <el-dialog title="添加公司" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="公司名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="form.con" auto-complete="off" placeholder="格式为：湖南省邵阳市韶山县东湖大街2号// 省市必填"></el-input>
            </el-form-item>
            <el-form-item label="所在省份" :label-width="formLabelWidth">
             <el-select v-model="form.region" placeholder="请选择省份" @change="getCity()">
                 <el-option  :label="item.name" :value="item.id" v-for="(item,index) in getSheng" :key="index"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="所在城市" :label-width="formLabelWidth">
             <el-select v-model="form.region1" placeholder="请选择城市">
                 <el-option  :label="item.name" :value="item.id" v-for="(item,index) in getAllCity" :key="index"></el-option>
            </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addOrder()">确 定</el-button>
        </div>
        </el-dialog>
         <!--
                <! 修改权限   弹框 -->
        <el-dialog title="修改公司" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="form">
            <el-form-item label="公司名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="form.con" auto-complete="off"></el-input>
            </el-form-item>
        
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="editOrder()">确 定</el-button>
        </div>
        </el-dialog>
        <!-- 删除   弹框 -->
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
            <h3 style="text-align:center;">确定删除吗？</h3>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="delOrder()">确 定</el-button>
            </span>
            </el-dialog> 
        
           <!--
                <! 分配城市   弹框 -->
        <el-dialog title="分配城市" :visible.sync="allotVisible">
        <el-form :model="form">
            <div style="display:flex;justify-content: space-between;">
              <!-- 省 -->
              <ul>
                <li v-for='(item,index) in getSheng' :key="index" >
                  <input type="checkbox" :data_id="item.id" @change="shengStatus($event)" :checked="checkCity">
                  <span @click="flag && huoquCity($event)" :data_id="item.id">{{item.name}}</span>
                  </li>
              </ul>
              <!-- 市 -->
              <ul style="margin:0 200px 0 0;">
                <li v-for="(item,index) in getAllCity" :key="index" >
                    <input type="checkbox" :data_id="item.id" @change="changeStatus($event)">
                    <span :data_id="item.id">{{item.name}}</span>
                </li>
              </ul>
            </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="allotVisible = false">取 消</el-button>
            <el-button type="primary" @click="allotAddOrder()">添加</el-button>
            <el-button type="primary" @click="allotEditOrder()">修改</el-button>
        </div>
        </el-dialog>
        <!-- 查看城市  弹框 -->
        <el-dialog title="查看城市" :visible.sync="seeVisible">
        <el-form :model="form">
            <div>
              <ul style="display:flex;width:100%;flex-wrap:wrap;">
                <li v-for="(item,index) in citys" :key="index" style="width:150px;">
                    <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="seeVisible = false">确定</el-button>
        </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data() {
    return {
      flag: true,
      name: "",
      userNam: "",
      formIn: "",
      formInline: "",
      options: [],
      getSheng: [],
      getAllCity: [],
      arr:[],
      arr1:[],
      citys:[],
      p_id: "",
      count: "",
      dialogFormVisible: false,
      dialogVisible: false,
      dialogFormVisibleEdit: false,
      allotVisible:false,
      seeVisible:false,
      checkCity:false,
      form: {
        name: "",
        region: "",
        region1: "",
        delivery: false,
        con: "",
        act: "",
        icon: ""
      },
      formLabelWidth: "120px",
      isAllot:""
    };
  },
  created() {
    this.show(); // 组件刚渲染  获取数据
  },
  methods: {
    show() {
      // 组件刚渲染  获取数据
      let that = this;
      this.$axios({
        url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/company/list",
        method: "post",
        data: {token:window.sessionStorage.getItem("token")},
        transformRequest: [
          function(data) {
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          }
        ],
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }).then(function(res) {
        if(res.data.code == '0'){
            that.options = res.data.data;
        that.count = res.data.data.length;
        }else if(res.data.code == '450'){
              that.$message("暂无权限");
            }else if(res.data.code == '400'){
          that.$message("请先登录");
          that.$router.push('/');
        }
        
      });
    },
    huoquSheng(){
      // 获取省
      let that = this;
      this.$axios({
        url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/company/city",
        method: "post",
        data: {token: window.sessionStorage.getItem("token")},
        transformRequest: [
          function(data) {
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          }
        ],
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }).then(function(res) {
        if (res.data.code == "0") {
          that.getSheng = res.data.data;
          if(that.isAllot == '分配'){
            that.allotVisible = true;
          }else{
            that.dialogFormVisible = true;
          }
        }else if(res.data.code == '450'){
          that.$message("暂无权限");
        }
      });
    },
    addChild(e) {
      // 添加   弹框
      this.p_id = e.currentTarget.getAttribute("data_id");
      this.isAllot = '添加';
      this.form.name = '';
      this.form.con = '';
      this.form.region = '';
      this.form.region1 = '';
      // 
      this.huoquSheng();
      
    },
    getCity() {
      this.form.region1 = '';
      let that = this;
      this.$axios({
        url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/company/city",
        method: "post",
        data: { pid: this.form.region ,token: window.sessionStorage.getItem("token")},
        transformRequest: [
          function(data) {
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          }
        ],
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }).then(function(res) {
        that.getAllCity = res.data.data;
      });
    },
    addOrder() {
      // 添加公司    提交
      if (this.form.region1 != "") {
        let that = this;
        this.$axios({
          url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/company/add",
          method: "post",
          data: {
            name: this.form.name,
            address: this.form.con,
            pid_path: this.p_id,
            city: this.form.region1,
            token: window.sessionStorage.getItem("token")
          },
          transformRequest: [
            function(data) {
              let ret = "";
              for (let it in data) {
                ret +=
                  encodeURIComponent(it) +
                  "=" +
                  encodeURIComponent(data[it]) +
                  "&";
              }
              return ret;
            }
          ],
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }).then(function(res) {
          if (res.data.code == "0") {
            that.dialogFormVisible = false;
            that.show();
          }else if(res.data.code == '450'){
              that.$message("暂无权限");
            }else{
              that.$message(res.data.message);
            }
        });
      }else{
        this.$message("请输入完整信息");
      }
    },
    editChild(e) {
      // 修改  弹框
      this.p_id = e.currentTarget.getAttribute("data_id");
      let that = this;
      this.$axios({
        url: `http://www.zjcoldcloud.com/bqs/backend/web/index.php/company/update?id=${this.p_id}&token=${window.sessionStorage.getItem("token")}`,
        method: "get",
        data: {},
        transformRequest: [
          function(data) {
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          }
        ],
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }).then(function(res) {
        if (res.data.code == "0") {
          that.form.name = res.data.data.name;
          that.form.con = res.data.data.address;
          that.dialogFormVisibleEdit = true;
        }else if(res.data.code == '450'){
              that.$message("暂无权限");
            }
      });
    },
    editOrder() {
      let that = this;
      this.$axios({
        url: `http://www.zjcoldcloud.com/bqs/backend/web/index.php/company/update`,
        method: "post",
        data: {
          address: this.form.con,
          name: this.form.name,
          id: this.p_id,
          token: window.sessionStorage.getItem("token")
        },
        transformRequest: [
          function(data) {
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          }
        ],
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }).then(function(res) {
        if (res.data.code == "0") {
          that.dialogFormVisibleEdit = false;
          that.show();
        }else if(res.data.code == '450'){
              that.$message("暂无权限");
            }
      });
    },
    delChild(e) {
      // 删除 弹框  需要二次确认
      this.p_id = e.currentTarget.getAttribute("data_id");
      this.dialogVisible = true;
    },
    delOrder() {
      // 删除  提交
      let that = this;
      this.$axios({
        url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/company/delete",
        method: "post",
        data: {
          pid_path: this.p_id,
          token: window.sessionStorage.getItem("token")
        },
        transformRequest: [
          function(data) {
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          }
        ],
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }).then(function(res) {
        if (res.data.code == "0") {
          that.dialogVisible = false;
          that.show();
        } else if (res.data.code == "10") {
          that.dialogVisible = false;
          that.$message("该公司已有用户使用");
        }else if(res.data.code == '450'){
              that.$message("暂无权限");
            }
      });
    },
    allotCity(e){
      // 点击 分配城市
      this.p_id = e.currentTarget.getAttribute("data_id");
      this.huoquSheng();
      this.checkCity = false;
      this.isAllot = '分配';
      this.getAllCity = [];
    },
    huoquCity(e){
      // 点击 省 获取 城市
       if(e.currentTarget.parentNode.firstChild.checked==true){
         this.$message("该省所辖市已默认全部选中");
         this.getAllCity = [];
       }else{
         let that = this;
          this.$axios({
            url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/company/city",
            method: "post",
            data: { pid: e.currentTarget.getAttribute("data_id"),token: window.sessionStorage.getItem("token") },
            transformRequest: [
              function(data) {
                let ret = "";
                for (let it in data) {
                  ret +=
                    encodeURIComponent(it) +
                    "=" +
                    encodeURIComponent(data[it]) +
                    "&";
                }
                return ret;
              }
            ],
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
          }).then(function(res) {
              that.getAllCity = res.data.data;
          });
       }
      
    },
    shengStatus(e){
      // 点击 省 多选框
      if(e.currentTarget.checked == true){
        this.arr1.push(e.currentTarget.getAttribute("data_id"));
      }else{
        for(let i=0;i<this.arr1.length;i++){
          if(e.currentTarget.getAttribute("data_id")==this.arr1[i]){
            this.arr1.splice(i,1);
          }
        }

      }
    },
    changeStatus(e){
      // 点击 市 多选框
      
      if(e.currentTarget.checked == true){
        this.arr.push(e.currentTarget.getAttribute("data_id"));
      }else{
        for(let i=0;i<this.arr.length;i++){
          if(e.currentTarget.getAttribute("data_id")==this.arr[i]){
            this.arr.splice(i,1);
          }
        }

      }

      if(this.arr.length == 0){
        this.flag = true;
      }else{
        this.flag = false;
      }
      console.log(this.arr);
    },
    allotEditOrder(){
      // 修改
      let that = this;
          this.$axios({
            url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/company/allot_city",
            method: "post",
            data: { id:  this.p_id,sheng:this.arr1.join(','),city: this.arr.join(','),token: window.sessionStorage.getItem("token"),sta:2},
            transformRequest: [
              function(data) {
                let ret = "";
                for (let it in data) {
                  ret +=
                    encodeURIComponent(it) +
                    "=" +
                    encodeURIComponent(data[it]) +
                    "&";
                }
                return ret;
              }
            ],
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
          }).then(function(res) {
            if(res.data.code == "0"){
              that.allotVisible = false;
              that.$message("修改成功");
            }else if(res.data.code == '450'){
              that.$message("暂无权限");
            }else{
              that.$message('请选择城市');
            }
          });
    },
    allotAddOrder(){
      // 添加
      let that = this;
          this.$axios({
            url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/company/allot_city",
            method: "post",
            data: { id:  this.p_id,sheng:this.arr1.join(','),city: this.arr.join(','),token: window.sessionStorage.getItem("token"),sta:1},
            transformRequest: [
              function(data) {
                let ret = "";
                for (let it in data) {
                  ret +=
                    encodeURIComponent(it) +
                    "=" +
                    encodeURIComponent(data[it]) +
                    "&";
                }
                return ret;
              }
            ],
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
          }).then(function(res) {
            if(res.data.code == "0"){
              that.allotVisible = false;
              that.$message("添加成功");
            }else if(res.data.code == '450'){
              that.$message("暂无权限");
            }else{
              that.$message('请选择城市');
            }
          });
    },
    seeCity(e){
      // 查看城市
      let that = this;
          this.$axios({
            url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/company/list_city",
            method: "post",
            data: { id:  e.currentTarget.getAttribute("data_id"),token: window.sessionStorage.getItem("token")},
            transformRequest: [
              function(data) {
                let ret = "";
                for (let it in data) {
                  ret +=
                    encodeURIComponent(it) +
                    "=" +
                    encodeURIComponent(data[it]) +
                    "&";
                }
                return ret;
              }
            ],
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
          }).then(function(res) {
            if(res.data.code == "0"){
              that.citys = res.data.data;
              that.seeVisible = true;
            }else if(res.data.code == '450'){
              that.$message("暂无权限");
            }else{
              that.$message("暂无管辖城市");
            }
          });
    }



  
  }
};
</script>
<style scoped>
td,
th {
  border: solid #ccc;
  border-width: 0px 1px 1px 0px;
  padding: 10px 0px;
  text-align: center;
}
tr td:nth-child(2) {
  text-align: left;
  padding: 0 0 0 40px;
}
table {
  border: solid #ccc;
  border-width: 1px 0px 0px 1px;
  border-collapse: collapse;
}
.divBut {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
ul{
  width:150px;
  margin:0 0 0 30px;
}
ul li{
  list-style: none;
  height:50px;
  line-height: 50px;
  
}
ul li span{
  font-size: 18px;
  cursor: pointer;

}
ul li input{
  outline: none;
}
</style>
