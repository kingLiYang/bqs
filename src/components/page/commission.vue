<template>
    <div class="table">

        <div class="divBut" style="margin:20px 0 0 0;">
         <el-form :inline="true" class="demo-form-inline">
             <el-form-item label="冰骑士账号">
                <el-input placeholder="请输入账号" v-model="iceNum"></el-input>
            </el-form-item>
            <el-form-item label="冰骑士名称">
                <el-input placeholder="请输入名称" v-model="iceName"></el-input>
            </el-form-item>
            <el-form-item label="转运中心">
              <el-select v-model="form1.region" filterable placeholder="请选择">
                <el-option :label="item.name" :value="item.pid_path" v-for="(item,index) in optionsZhan" :key="index"></el-option>
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
                prop="username"
                label="冰骑士账号">
              </el-table-column>
              <el-table-column
                prop="relly_name"
                label="冰骑士名称">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="联系电话">
              </el-table-column>
              <el-table-column
                prop="region"
                label="所属大区">
              </el-table-column>
              <el-table-column
                prop="company"
                label="所属公司">
              </el-table-column>
              <el-table-column
                prop="station"
                label="所属转运中心">
              </el-table-column>
              <el-table-column
                prop="total_money"
                label="账户余额">
              </el-table-column>
              <el-table-column
                prop="history_money"
                label="历史体现金额">
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
    add() {
      //   this.$router.push({ path: '/userAdd' });
      // 添加   弹框
      this.getCity(); // 获取公司
    },
    getCity() {
      let that = this;
      this.$axios({
        url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/company/company",
        method: "post",
        data: { level: 3,token: window.sessionStorage.getItem("token") },
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
      that.dialogFormVisible = true;
          
          that.options = res.data.data;
        }else if(res.data.code == '450'){
          that.$message("暂无权限");
        }
        
      });
    },
    getZhan() {
      // 获取站点  根据所点公司
      let that = this;
      this.$axios({
        url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/company/next",
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
        that.options1 = res.data.data;
      });
    },
    addOrder() {
      // 添加  提交
      let that = this;
      this.$axios({
        url: this.URL_API+"/bqs/backend/web/index.php/knight/add",
        method: "post",
        data: {
          username: this.form.name,// 账户
          pwd: this.form.password,// 密码
          relly_name: this.form.relly_name,// 姓名
          phone: this.form.phone,// 手机号
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
            // that.options1 = res.data.data;
          that.dialogFormVisible = false;
          that.$message("添加成功");
          that.getData();
        }else if(res.data.code == '450'){
          that.$message("暂无权限");
        }
        
      });
    },
    del() {
      // 删除  弹框
      if (this.arr.length == 0) {
        this.$message({
          message: "请选择要删除的数据",
          type: "error"
        });
      } else {
        this.dialogVisible = true;
      }
    },
    delOrder() {
      // 删除  提交
      let that = this;
      this.$axios({
        url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/knight/delete",
        method: "post",
        data: {
          id: this.arr.join(","),
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
        if (res.data.code == 0) {
          that.dialogVisible = false;
          that.$message("删除成功");
          that.arr = [];
          that.checkedAll = false;
          that.isChecked = false;
          that.getData();
        }else if(res.data.code == '450'){
          that.$message("暂无权限");
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
        url: this.URL_API+"/bqs/backend/web/index.php/knight/brokerage_list",
        method: "post",
        data: {
          page: this.currentPage,
          username: this.iceNum,
          company_path: this.form1.region,
          relly_name: this.iceName,
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
</style>