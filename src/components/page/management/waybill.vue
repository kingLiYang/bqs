<template>
    <div>
        <div class="divBut">
            <el-row>
                <el-button type="primary" round @click="add()">添加运单</el-button>
            </el-row>
        </div>
        <div class="divBut" style="margin:20px 0 0 0;">
         <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="订单号">
                <el-input placeholder="请输入订单号" v-model="orderNum"></el-input>
            </el-form-item>
            <el-form-item label="TMS订单号">
                <el-input placeholder="请输入TMS订单号" v-model="orderMath"></el-input>
            </el-form-item>
            <el-form-item label="运单号">
                <el-input placeholder="请输入运单号" v-model="wayMath"></el-input>
            </el-form-item>
            <el-form-item label="选择方式" >
               <el-select v-model="form1.region"  placeholder="请选择启用状态">
                  <el-option label="请选择" value=""></el-option>
                  <el-option label="揽派" value="1"></el-option>
                  <el-option label="揽件" value="2"></el-option>
                  <el-option label="派件" value="3"></el-option>
                  <el-option label="转运" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchUser()">查询</el-button>
            </el-form-item>
            </el-form>
        </div>
        <!-- 表格 -->
             <el-table
              :data="tableData"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="index"
                label="序号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="order_code"
                label="订单号">
              </el-table-column>
              <el-table-column
                prop="tms_order_code"
                label="TMS订单号">
              </el-table-column>
              <el-table-column
                prop="tms_way_code"
                label="运单号">
              </el-table-column>
              <el-table-column
                prop="relly_name"
                label="骑士姓名">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="骑士电话">
              </el-table-column>
              <!-- 0 未接单 1 已接单 2 已取箱 3 已取货 4 已签收 5 已返箱 6 已拒单 7 已完成 -->
              <el-table-column
                prop="status"
                label="订单状态"
                :formatter="judge">
              </el-table-column>
              <!-- order_type  -->
              <el-table-column
                prop="order_type"
                label="类型"
                :formatter="judge1">
              </el-table-column>
              <el-table-column
                prop="money"
                label="金额(元)">
              </el-table-column>
              <el-table-column
                label="生成时间" min-width="70">
                <template slot-scope="scope">{{ scope.row.add_time | formatDate}}</template>
              </el-table-column>
              
              <el-table-column
                label="操作" min-width="250">
                <template slot-scope="scope" >
                  <div style='display:flex;flex-wrap: wrap;'>
                    <el-button type="primary" size="small" round @click.native.prevent="editChild(scope.row)" v-if="scope.row.status == '0' || scope.row.status == '6'">修改信息</el-button>
                  <el-button type="warning" size="small" round @click.native.prevent="seeChild(scope.row)" v-if="scope.row.status == '0' || scope.row.status == '6'">指派骑士</el-button>
                  <el-button type="primary" size="small" round @click.native.prevent="details(scope.row)">详情</el-button>
                  <el-button type="danger" size="small" round @click.native.prevent="delChild(scope.row)" v-if="scope.row.status == '0' || scope.row.status == '6'">删除</el-button>
                  </div>
                  
                </template>
              </el-table-column>
            </el-table>
      <!-- 分页 -->
        <div style="margin:20px 0 0 0;">
            <el-pagination
                background
                @current-change="handleCurrentChange"
                layout="total,prev, pager, next"
                :total="ccc">
            </el-pagination>
        </div>
        <!-- 添加  弹框 选择4中类型 -->
        <el-dialog
          title="请选择"
          :visible.sync="dialogFormVisible"
          width="10%">
          <el-form :inline="true" style="display:flex;justify-content:center;">
            <el-button type="primary" size="medium" round @click.native.prevent="choice(row=1)">揽派</el-button>
            <el-button type="primary" size="medium" round @click.native.prevent="choice(row=2)">揽件</el-button>
            <el-button type="primary" size="medium" round @click.native.prevent="choice(row=3)">派件</el-button>
            <el-button type="primary" size="medium" round @click.native.prevent="choice(row=4)">转运</el-button>
            
          </el-form>
         <el-row style="margin: 10px 0 0 0;">
            <el-col :span="24" class="row-bg"><div>揽派：同一个城市从发件客户揽件，给收件客户派件</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="row-bg"><div>揽件：始发城市从发件客户处揽件，给目的城市收件客户派件，只涉及揽件过程</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="row-bg"><div>派件：始发城市从发件客户处揽件，给目的城市收件客户派件，只涉及派件过程</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="row-bg"><div>转运：在同一城市从转运中心A揽件，给转运中心B派件</div></el-col>
          </el-row>
        </el-dialog>
        <!-- 指派骑士   弹框 -->
        <el-dialog
          title="请选择"
          :visible.sync="dialogNight"
          width="10%">
          <el-form v-model="form4" :inline="true">
            <el-row>
            <el-form-item label="省份">
               <el-select  v-model="form4.region"  placeholder="请选择" @change="getCity2()" :disabled="isDisabled">
                    <el-option  :label="item.name" :value="item.id" v-for="(item,index) in getSheng" :key="index"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="城市">
                <el-select v-model="form4.region1" placeholder="请选择" @change="getZhan2()" :disabled="isDisabled">
                  <el-option label='请选择' value=''></el-option>
                    <el-option  :label="item.name" :value="item.id" v-for="(item,index) in getAllCity2" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="站点">
                <el-select v-model="form4.region2" placeholder="请选择" @change="getKnight2()">
                  <el-option label='请选择' value=''></el-option>
                    <el-option  :label="item.name" :value="item.pid_path" v-for="(item,index) in getAllZhan2" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="骑士">
                <el-select v-model="form4.region3" placeholder="请选择">
                  <el-option label='请选择' value=''></el-option>
                    <el-option  :label="item.relly_name" :value="item.k_id" v-for="(item,index) in getAllKnight" :key="index"></el-option>
                </el-select>
            </el-form-item>
            </el-row>            
          </el-form>
          <span slot="footer" class="dialog-footer">
                <el-button @click="dialogNight = false">取 消</el-button>
                <el-button type="primary" @click="allotOrder()">确 定</el-button>
            </span>
         
        </el-dialog>
        <!-- 删除  弹框 -->
        <el-dialog
          title=""
          :visible.sync="deldialogNight"
          width="10%">
          <h2 style='text-align:center;'>确定删除吗？</h2>
          <span slot="footer" class="dialog-footer">
                <el-button @click="deldialogNight = false">取 消</el-button>
                <el-button type="primary" @click="delOrder()">确 定</el-button>
            </span>
         
        </el-dialog>
    </div>
</template>

<script>
import { formatDate } from "./../../../js/data";
export default {
  data() {
    return {
      orderMath:"",
      orderNum:"",
      wayMath:"",
      tableData: [],
      arr: [],
      checkedAll: false,
      isChecked: false,
      isDisabled:  false,
      dialogVisible: false,
      form1: {
        region: ""
      },
      dialogFormVisible: false,
      deldialogNight:false,
      formLabelWidth: "120px",
      ccc: 0,
      id: "",
      currentPage: 1,
      knight_tid:"",
      dialogNight: false,
      form4:{
            region:"",
            region1:"",
            region2:"",
            region3:""
        },
      getSheng: [],
      getAllKnight:[],
      getAllZhan2: [],
      getAllCity2:[]
      
    };
  },
   beforeCreate(){
    let token = window.sessionStorage.getItem('token');
    if(token == ''|| token == undefined){
      this.$router.push('/');
    }
  },
  created() {
    this.getData();// 获取列表
    window.localStorage.removeItem("data");
  },
  computed: {},
  methods: {
    add() {
      // 添加   弹框
      this.dialogFormVisible = true;
    },
    choice(row){
      // 下单 页面
      this.$router.push({path:"/billType",query:{type:row,sta:false}})
    },
    judge(data){
      // 0 未接单 1 已接单 2 已取箱 3 已取货 4 已签收 5 已返箱 6 已拒单 7 已完成
        switch (data.status){
          case '0':
           return '未接单';
          break;
          case '1':
          return '已接单';
          break;
          case '2':
          return '已取箱';
          break;
          case '3':
          return '已取货';
          break;
          case '4':
          return '已签收';
          break;
          case '5':
          return '已返箱';
          break;
          case '6':
          return '已拒单';
          break;
          case '7':
          return '已完成';
          break;
        }
    },
    judge1(data){
      // 1 揽派 2 揽件 3 派件 4 转运 
        switch (data.order_type){
          case '1':
          return '揽派';
          break;
          case '2':
          return '揽件';
          break;
          case '3':
          return '派件';
          break;
          case '4':
          return '转运';
          break;
        }
    },
    handleCurrentChange(val) {
      this.checkedAll = false;
      this.isChecked = false;
      this.arr = [];
      this.currentPage = val;
      this.getData();
    },
    getData() {
      // 查询
      let that = this;
      this.$axios({
        url: this.URL_API+"/bqs/backend/web/index.php/order/list",
        method: "post",
        data: {
           page: this.currentPage,
           tms_order_code: this.orderMath,
           order_code: this.orderNum,
           type: this.form1.region,
           tms_way_code: this.wayMath,
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
        if(res.data.code == '0'){
          let tableData1 = res.data.data.data;
          tableData1.forEach((item,index)=>{
            if(item.tms_way_code == 'null'){
              item.tms_way_code = '';
            }
          })
          that.tableData = tableData1;
          that.ccc = Number(res.data.data.count) || 0;
        }else if(res.data.code == '450'){
          that.$message("暂无权限");
        }else if(res.data.code == '1'){
          that.tableData = [];
          that.ccc = 0;
        }else if(res.data.code == '400'){
          that.$message("请先登录");
          that.$router.push('/');
        }
        
      });
    },
    seeChild(rows){
      // 指派骑士
      this.knight_tid = rows.order_id;
      this.form4.region = '';
      this.form4.region1 = '';
      this.form4.region2 = '';
      this.form4.region3 = '';
      this.getDefaultCity();
      this.dialogNight = true;
    },
    getDefaultCity() {
      // 获取  默认  城市
      let that = this;
      this.$axios({
        url: this.URL_API + "/bqs/backend/web/index.php/order/default",
        method: "post",
        data: {
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
          if (Number(res.data.data.station.length) == 0) {
            that.isDisabled = false;
            that.huoquSheng();
          } else {
            that.isDisabled = true;
            that.form4.region = res.data.data.province; // 骑士 信息   省份
            that.form4.region1 = res.data.data.city; // 骑士 信息 chengshi
            that.getAllZhan2 = res.data.data.station;
          }
        } else if (res.data.code == "450") {
          that.$message("暂无权限");
        } else if (res.data.code == "400") {
          that.$message("请先登录");
          that.$router.push("/");
        } else {
          that.$message(res.data.message);
        }
      });
    },
    editChild(rows){
      // 修改信息   条页面
       this.$router.push({path:"/billType",query:{id:rows.order_id,type:rows.order_type,sta:true}});
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
        }else if(res.data.code == '450'){
          that.$message("暂无权限");
        }
      });
    },
    getCity2(){
      if(this.isDisabled != true){
this.form4.region1 = '';
        this.form4.region2 = '';
        let that = this;
      this.$axios({
        url: this.URL_API+"/bqs/backend/web/index.php/company/city",
        method: "post",
        data: { pid: this.form4.region ,token: window.sessionStorage.getItem("token")},
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
        that.getAllCity2 = res.data.data;
      });
      }
        
    },
    getZhan2(){
      if(this.isDisabled != true){
this.form4.region2 = '';
        this.form4.region3 = '';
        let that = this;
      this.$axios({
        url: this.URL_API+"/bqs/backend/web/index.php/order/company",
        method: "post",
        data: { id: this.form4.region1 ,token: window.sessionStorage.getItem("token")},
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
        that.getAllZhan2 = res.data.data;
      });
      }
        
    },
    getKnight2(){
        this.form4.region3 = '';
        let that = this;
      this.$axios({
        url: this.URL_API+"/bqs/backend/web/index.php/order/knight",
        method: "post",
        data: { company_path: this.form4.region2 ,token: window.sessionStorage.getItem("token")},
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
        that.getAllKnight = res.data.data;
      });
    },
    allotOrder(){
      // 指派 骑士   提交
      let that = this;
      this.$axios({
        url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/order/change_knight",
        method: "post",
        data: { knight_id: this.form4.region3,order_id: this.knight_tid,token: window.sessionStorage.getItem("token") },
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
      
          that.dialogNight = false;
          that.$message('指派成功');
          that.getData();
          // that.options = res.data.data;
        }else if(res.data.code == '450'){
          that.$message("暂无权限");
        }
        
      });
    },
    details(rows){
      let id = rows.order_id;
      // 详情
      let that = this;
      this.$axios({
        url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/order/details",
        method: "post",
        data: { order_id: id,token: window.sessionStorage.getItem("token") },
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
      
          that.$router.push({path:"/billDetails"});
          window.localStorage.setItem('data',JSON.stringify(res.data));
          // that.options = res.data.data;
        }else if(res.data.code == '450'){
          that.$message("暂无权限");
        }
        
      });
    },
    delChild(rows){
      this.deldialogNight = true;
      // 删除
      this.id = rows.order_id;
      
    },
    delOrder(){
      let that = this;
      this.$axios({
        url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/order/delete",
        method: "post",
        data: { id: this.id,token: window.sessionStorage.getItem("token") },
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
         that.deldialogNight = false;
         that.$message('删除成功');
         that.getData();
       }else if(res.data.code == '450'){
         that.$message('暂无权限');
       }
        
      });
    },
    searchUser() {
      // 查询
      this.currentPage = 1;
      this.getData();
    },
    handleSelectionChange(val) {
      // 全选 ID
      this.arr = [];
      val.forEach((item,index)=>{
        this.arr.push(item.k_id);
      })
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time * 1000);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>

<style scoped>
.divBut {
  padding: 0 0 10px 0;
}
td,
th {
  border: solid #ccc;
  border-width: 0px 1px 1px 0px;
  padding: 10px 0px;
  text-align: center;
}
table {
  border: solid #ccc;
  border-width: 1px 0px 0px 1px;
  border-collapse: collapse;
}
.row-bg {
    padding: 10px 20%;
  }
</style>