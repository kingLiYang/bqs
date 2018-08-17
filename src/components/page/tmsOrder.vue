<template>
    <div class="table">

        <div class="divBut" style="margin:20px 0 0 0;">
         <el-form :inline="true" class="demo-form-inline">
             <el-form-item label="订单号">
                <el-input placeholder="请输入订单号" v-model="iceNum"></el-input>
            </el-form-item>
            <el-form-item label="运单号">
                <el-input placeholder="请输入运单号" v-model="iceName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchUser()">查询</el-button>
            </el-form-item>
            </el-form>
        </div>

           <!-- 表格 -->
           <div style='width: 100%;overflow-x: auto;'>
             <el-table
              :data="tableData">
              <el-table-column
                type="index"
                label="序号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="tms_order_code"
                label="订单号">
              </el-table-column>
              <el-table-column
                prop="company"
                label="TMS平台">
              </el-table-column>
              <el-table-column
                label="下单时间">
				<template slot-scope="scope">{{ scope.row.addtime | formatDate}}</template>
              </el-table-column>
              <el-table-column
                label="操作">
				<template slot-scope="scope">
                <el-button type="success" size="small">指派</el-button>
                </template>
              </el-table-column>
              <el-table-column
			  	prop='tms_get_goods_plan_time'
                label="要求取件时间">
				<!-- <template slot-scope="scope">{{ scope.row.tms_get_goods_plan_time | formatDate}}</template> -->
              </el-table-column>
              <el-table-column
			  	prop='plan_time'
                label="要求时限">
              </el-table-column>
              <el-table-column
                prop="tms_get_goods_depart"
                label="寄件省份">
              </el-table-column>
              <el-table-column
                prop="tms_get_goods_city"
                label="寄件城市">
              </el-table-column>
			  <el-table-column
                prop="tms_get_goods_man"
                label="寄件人">
              </el-table-column>
			  <el-table-column
                prop="tms_get_goods_phone"
                label="寄件人电话">
              </el-table-column>
			  <el-table-column
                prop="tms_get_goods_company"
                label="寄件公司">
              </el-table-column>
			  <el-table-column
                prop="tms_get_goods_address"
                label="寄件地址">
              </el-table-column>
			  <el-table-column
                prop="box_sum"
                label="件数">
              </el-table-column>
			  <el-table-column
                prop="history_money"
                label="温度区间、箱型和数量">
				<template slot-scope="scope">
					<el-button type="primary" size="small" round @click="showDetails(scope)">详情</el-button></template>	
              </el-table-column>
			  <el-table-column
                prop="order_status"
                label="订单状态">
              </el-table-column>
			  <el-table-column
                prop="tms_way_code"
                label="运单号">
              </el-table-column>
			  <el-table-column
                prop="tms_send_goods_depart"
                label="收件省份">
              </el-table-column>
			  <el-table-column
                prop="tms_send_goods_city"
                label="收件城市">
              </el-table-column>
			  <el-table-column
                prop="tms_send_goods_man"
                label="收件人">
              </el-table-column>
			  <el-table-column
                prop="tms_send_goods_phone"
                label="收件人电话">
              </el-table-column>
			  <el-table-column
                prop="tms_send_goods_address"
                label="收件地址"
                width="420px;">
              </el-table-column>
			  <el-table-column
                prop="tms_send_goods_company"
                label="收件公司">
              </el-table-column>
			  <el-table-column
                prop="clearing_form"
                label="结算方式">
              </el-table-column>
			  <el-table-column
                prop="is_to_pay"
                label="是否到付"
                :formatter="judge">
              </el-table-column>
			  <el-table-column
                prop="order_money"
                label="金额">
              </el-table-column>
			  	<el-table-column
                prop="is_insure"
                label="是否投保">
              </el-table-column>
			  	<el-table-column
                prop="order_money"
                label="投保金额">
              </el-table-column>
			  	<el-table-column
                prop="remark"
                label="备注">
              </el-table-column>
              
              
            </el-table>
      <!-- 分页 -->
        <!-- <div style="margin:20px 0 0 0;">
            <el-pagination
                background
                @current-change="handleCurrentChange"
                layout="total,prev, pager, next"
                :total="ccc">
            </el-pagination>
        </div> -->
        </div>
        <el-dialog title="温箱详情" :visible.sync="dialogTableVisible">
            <div v-for="(item,index) in detailsData" :key="index">
                <p style='padding:10px 0;'>温度区间：{{item.temperature_interval}}</p>
                <ul>
                    <li v-for="(ite,index) in item.box" :key="index">
                        <span>{{ite.box_type}}</span>
                        <span>{{ite.box_num}}</span>
                    </li>
                </ul>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { formatDate } from "./../../js/data";
export default {
  data() {
    return {
        dialogTableVisible: false,
        iceNum: "",
        iceName:"",
      tableData: [],
      detailsData: [],
      options: [],
      options1: [],
      userNam: "",
      form: {
        name: "",
        password: "",
        phone: "",
        relly_name: ""
      },
      form1: {
        name: "",
        username: "",
        password: "",
        phone: "",
        com: "",
        region: "",
        zhan: "",
        email: ""
      },
      ccc: 0,
      id: "",
      currentPage: 1
      
    };
  },
  created() {
    this.getData();// 获取列表
  },
  computed: {},
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    getData() {
      // 查询
      let that = this;
      this.$axios({
        url: this.URL_API+"/bqs/backend/web/index.php/tms_order/list",
        method: "post",
        data: {
          page: this.currentPage,
          tms_order_code: this.iceNum,// 订单号
          tms_way_code: this.iceName,// 运单号
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
          res.data.data.map( v => {
            switch (v.is_insure){ // 是否投保
              case '0':
              v.is_insure =  '否';
              v.order_money = '';
              break;
              case '1':
              v.is_insure =   '是';
              break;
            }
          })
          that.tableData = res.data.data;
        //   that.ccc = Number(res.data.data.count) || 0;
        }else if(res.data.code == '450'){
          that.$message("暂无权限");
        }else if(res.data.code == '400'){
          that.$message("请先登录");
          that.$router.push('/');
        }
        
      });
    },
    judge(data){ // 是否到付
      return Number(data.is_to_pay)==1 ? '是' : '否'
    },
    searchUser() {
      // 查询
      this.currentPage = 1;
      this.getData();
    },
    showDetails(rows){
        // 详情
      let tms_order_code = rows.row.tms_order_code;
      let that = this;
      this.$axios({
        url: this.URL_API+"/bqs/backend/web/index.php/tms_order/details",
        method: "post",
        data: {
          tms_order_code: tms_order_code,// 订单号
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
          that.detailsData = res.data.data;
          that.dialogTableVisible = true;

        }else if(res.data.code == '450'){
          that.$message("暂无权限");
        }else if(res.data.code == '400'){
          that.$message("请先登录");
          that.$router.push('/');
        }
        
      });
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
li {
  text-align: center;
  list-style-type: none;
  width:50%;
  display: flex;
}
li span{
    border:1px  solid #ccc;
    width:50%;
    padding:5px;
}
.el-table{
	min-width:5000px;
}
.el-table__body tbody tr td:nth-child(22){
    /* width:800px; */
    border:1px solid red;
}
</style>