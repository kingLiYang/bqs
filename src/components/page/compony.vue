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
                 <div class="divBut" style="margin:20px 0 0 0;">
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
         </div>
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
                            <el-button type="primary" size="small" round @click.native.prevent="allotCity()">分配城市</el-button>
                            <el-button type="primary" size="small" round @click.native.prevent="seeCity()">查看城市</el-button>
                        </td>
                            <template v-if="item.level!='---------'">
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
            <el-input v-model="form.con" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="所在省份" :label-width="formLabelWidth">
             <el-select v-model="form.region" placeholder="请选择省份" @change="getCity()">
                 <el-option  :label="item.name" :value="item.id" v-for="(item,index) in getSheng"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="所在城市" :label-width="formLabelWidth">
             <el-select v-model="form.region1" placeholder="请选择城市">
                 <el-option  :label="item.name" :value="item.id" v-for="(item,index) in getAllCity"></el-option>
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
                  <input type="checkbox" :data_id="item.id">
                  <span @click="flag && huoquCity($event)" :data_id="item.id">{{item.name}}</span>
                  </li>
              </ul>
              <!-- 市 -->
              <ul style="margin:0 200px 0 0;">
                <li v-for="(item,index) in getAllCity" :key="index">
                    <input type="checkbox" :data_id="item.id" @change="changeStatus($event)">
                    <span :data_id="item.id">{{item.name}}</span>
                </li>
              </ul>
            </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="allotVisible = false">取 消</el-button>
            <el-button type="primary" @click="allotOrder()">确 定</el-button>
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
      p_id: "",
      count: "",
      dialogFormVisible: false,
      dialogVisible: false,
      dialogFormVisibleEdit: false,
      allotVisible:false,
      form: {
        name: "",
        region: "",
        region1: "",
        delivery: false,
        con: "",
        act: "",
        icon: ""
      },
      formLabelWidth: "120px"
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
        url: "api/bqs/backend/web/index.php/company/list",
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
        that.options = res.data.data;
        that.count = res.data.data.length;
      });
    },
    huoquSheng(){
      // 获取省
      let that = this;
      this.$axios({
        url: "api/bqs/backend/web/index.php/company/city",
        method: "post",
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
          that.getSheng = res.data.data;
        }
      });
    },
    addChild(e) {
      // 添加   弹框
      //this.p_id = e.currentTarget.getAttribute("data_id");

      this.dialogFormVisible = true;
      this.huoquSheng();
      
    },
    getCity() {
      let that = this;
      this.$axios({
        url: "api/bqs/backend/web/index.php/company/city",
        method: "post",
        data: { pid: this.form.region },
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
          url: "api/bqs/backend/web/index.php/company/add",
          method: "post",
          data: {
            name: this.form.name,
            address: this.form.con,
            pid_path: this.p_id,
            city: this.form.region1
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
          }
        });
      }
    },
    editChild(e) {
      // 修改  弹框
      this.p_id = e.currentTarget.getAttribute("data_id");
      let that = this;
      this.$axios({
        url: `api/bqs/backend/web/index.php/company/update?id=${this.p_id}`,
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
        }
      });
    },
    editOrder() {
      let that = this;
      this.$axios({
        url: `api/bqs/backend/web/index.php/company/update`,
        method: "post",
        data: {
          address: this.form.con,
          name: this.form.name,
          id: this.p_id
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
        url: "api/bqs/backend/web/index.php/company/delete",
        method: "post",
        data: {
          pid_path: this.p_id
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
        }
      });
    },
    allotCity(){
      // 点击 分配城市
      this.huoquSheng();
      this.allotVisible = true;
    },
    huoquCity(e){
      // 点击 省 获取 城市
       if(e.currentTarget.parentNode.firstChild.checked==true){
         this.$message("该省所辖市已默认全部选中");
         this.getAllCity = [];
       }else{
         let that = this;
          this.$axios({
            url: "api/bqs/backend/web/index.php/company/city",
            method: "post",
            data: { pid: e.currentTarget.getAttribute("data_id") },
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
    changeStatus(e){
      // 点击 市
      
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
