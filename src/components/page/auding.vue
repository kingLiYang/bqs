<template>
    <div class="table">
        <div class="divBut">
            <el-row>
                <el-button type="primary" round @click="isAdd(sta=1)">审核</el-button>
                <el-button type="primary" round @click="isAdd(sta=2)">打款</el-button>
                <el-button type="primary" round @click="is_no()">导出</el-button>
            </el-row>
        </div>
        <div class="divBut" style="margin:20px 0 0 0;">
         <el-form :inline="true" class="demo-form-inline">
             <!-- <el-form-item label="冰骑士账号">
                <el-input placeholder="请输入账号" v-model="iceNum"></el-input>
            </el-form-item> -->
            <el-form-item label="冰骑士名称">
                <el-input placeholder="请输入名称" v-model="iceName"></el-input>
            </el-form-item>
            <el-form-item label="转运中心">
              <el-select v-model="form1.region" filterable placeholder="请选择">
                <el-option :label="item.name" :value="item.pid_path" v-for="(item,index) in optionsZhan" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="当前状态">
               <el-select v-model="form1.region1"  placeholder="请选择">
                  <el-option label="请选择" value=""></el-option>
                  <el-option label="未审核" value="0"></el-option>
                  <el-option label="已打款" value="2"></el-option>
                  <el-option label="已审核或未打款" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间">
                <el-date-picker
                    v-model="value4"
                    type="datetime"
                    placeholder="选择日期时间"
                    @change="changeTime4"
                    align="right"
                    :picker-options="pickerOptions1">
                    </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
                <el-date-picker
                    v-model="value3"
                    type="datetime"
                    placeholder="选择日期时间"
                    @change="changeTime3"
                    align="right"
                    :picker-options="pickerOptions1">
                </el-date-picker>
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
                type="selection">
              </el-table-column>
              <el-table-column
                type="index"
                label="序号">
              </el-table-column>
              <!-- <el-table-column
                prop="username"
                label="冰骑士账号">
              </el-table-column> -->
              <el-table-column
                prop="relly_name"
                label="冰骑士名称">
              </el-table-column>
              <el-table-column
                prop="bank_coke"
                label="银行卡号">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="联系电话">
              </el-table-column>
              <!-- <el-table-column
                prop="region"
                label="所属大区">
              </el-table-column> -->
              <!-- <el-table-column
                prop="company"
                label="所属公司">
              </el-table-column> -->
              <el-table-column
                prop="station"
                label="所属转运中心">
              </el-table-column>
              <!-- <el-table-column
                prop="total_money"
                label="账户余额">
              </el-table-column> -->
              <el-table-column
                prop="withdraw_money"
                label="提现金额">
              </el-table-column>

              <el-table-column
              prop="addtime"
                label="提现时间">
                <!-- <template slot-scope="scope">{{ scope.row.addtime | formatDate}}</template> -->
              </el-table-column>
              <el-table-column
                prop="status"
                label="审核状态">
              </el-table-column>
                <el-table-column
                prop="admin_name"
                label="审核操作人">
              </el-table-column>
              <el-table-column
              prop="check_time"
                label="审核操作时间" width="200">
                <!-- <template slot-scope="scope">{{ scope.row.check_time | formatDate}}</template> -->
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
    </div>
</template>

<script>
import { formatDate } from "./../../js/data";
export default {
  data() {
    return {
            pickerOptions1: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
            value3: "",
      value4: "",
        iceNum: "",
        iceName:"",
      tableData: [],
      options: [],
      options1: [],
      optionsZhan:[],
      arr: [],
      userNam: "",
      checkedAll: false,
      isChecked: false,
      editFormVisible: false,
      del_list: [],
      is_search: false,
      dialogVisible: false,
      allotDialogVisible: false,
      formInline: "",
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
        region1:"",
        zhan: "",
        email: ""
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      ccc: 0,
      allRole: [], // 所有角色,
      checkedCities1: [], // 默认选中的,
      userVal: [],
      id: "",
      currentPage: 1
      
    };
  },
  created() {
    this.getData();// 获取列表
    this.getZhandian();// 获取站点
  },
  computed: {},
  methods: {
    changeTime3(val) {
      this.value3 = val;
    },
    changeTime4(val) {
      this.value4 = val;
    },
      judge(data){
        switch (data.status){
          case '0':
          return '未审核';
          break;
          case '1':
          return '已审核';
          break;
          case '2':
          return '已打款';
          break;

        }
      },
    getZhandian(){
      let that = this;
      this.$axios({
        url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/company/company",
        method: "post",
        data: { level: 4,token: window.sessionStorage.getItem("token") },
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
          that.optionsZhan = res.data.data;
          that.optionsZhan.unshift({name:"请选择",pid_path:''});
        }else if(res.data.code == '450'){
          that.$message("暂无权限");
        }
        
      });
    },
    is_no() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../js/Export2Excel");
        const tHeader = [
          "冰骑士名称",
          "银行卡号",
          "联系电话",
          "所属转运中心",
          "提现金额",
          "提现时间",
          "审核状态",
          "审核操作人",
          "审核操作时间"
        ];
        const filterVal = [
          "relly_name",
          "bank_coke",
          "phone",
          "station",
          "withdraw_money",
          "addtime",
          "status",
          "admin_name",
          "check_time"
        ];
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "提现审核信息列表");
      });
    },
    formatJson: function(filterVal, jsonData) {
     return jsonData.map(v => filterVal.map(j => v[j]));
    },
    isAdd(sta){
        // 审核   打款
        let that = this;
      this.$axios({
        url: this.URL_API+"/bqs/backend/web/index.php/withdraw/check",
        method: "post",
        data: {
          id: this.arr.join(","),
          status:sta,
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
            that.getData();
          that.$message(res.data.message);
        }else if(res.data.code == '450'){
          that.$message("暂无权限");
        }else{
            that.$message(res.data.message);
        }
        
      });
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
        url: this.URL_API+"/bqs/backend/web/index.php/withdraw/list",
        method: "post",
        data: {
          page: this.currentPage,
        //   username: this.iceNum,
          company_path: this.form1.region,
          relly_name: this.iceName,
          status:this.form1.region1,
          start_time:this.value4,
          end_time: this.value3,
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
          res.data.data.data.map( v => {
            switch (v.status){
              case '0':
              v.status =  '未审核';
              break;
              case '1':
              v.status =   '已审核';
              break;
              case '2':
              v.status =   '已打款';
              break;
            }
            v.addtime = that.formDate(v.addtime);
            v.check_time = that.formDate(v.check_time);
          })


          that.tableData = res.data.data.data;
          that.ccc = Number(res.data.data.count) || 0;
        }else if(res.data.code == '450'){
          that.$message("暂无权限");
        }else if(res.data.code == '400'){
          that.$message("请先登录");
          that.$router.push('/');
        }
        
      });
    },
    seeChild(rows){
      // 查看信息
       this.$router.push({path:"/userAdd",query:{id:rows.k_id,sta:false}});
    },
    editChild(rows){
      // 修改信息   条页面
      this.$router.push({path:"/userAdd",query:{id:rows.k_id,sta:true}});
    },
    delChild(rows) {
      // 添加信息  跳页面
      // console.log(rows);
      this.id = rows.k_id;
      this.$router.push({path:"/userAdd",query:{id:rows.k_id}});
    },
    handleCheckAllChange(val) {
      // 选中  获取  id
      this.userVal = val;
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
        this.arr.push(item.w_id);
      })


    },
    formDate(time) {
        if(time == null){
            return '';
        }else{
            var date = new Date(time * 1000);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }
      
    }
  },
  filters: {
    formatDate(time) {
        if(time == null){
            return '';
        }else{
            var date = new Date(time * 1000);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }
      
    }
  }
};
</script>

<style scoped>
.divBut {
  padding: 0 0 10px 0;
}
.handle-box {
  margin-bottom: 20px;
}
.handle-select {
  width: 120px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}

</style>