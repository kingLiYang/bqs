<template>
    <div class="table">
        <div class="divBut">

            <el-row>
                <!-- <el-button type="primary" round @click="add()">添加账号</el-button>
                <el-button type="primary" round @click='edit()'>修改账号</el-button> -->
                <!-- <el-button type="primary" round @click="is_yes()">启用</el-button> -->
                <!-- <el-button type="primary" circle @click="del()">删除</el-button> -->
                <el-button type="primary" round @click="is_no()">导出</el-button>
            </el-row>
        </div>
        <div class="divBut" style="margin:20px 0 0 0;display:flex;justify-content: space-between;">
         <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="账户名">
                <el-input placeholder="请输入账户名" v-model="userNam"></el-input>
            </el-form-item>
            <el-form-item label="电话号码">
                <el-input placeholder="请输入电话号码" v-model="userNum"></el-input>
              <!-- <el-select v-model="form1.region" filterable  placeholder="请输入银行卡号">
                <el-option :label="item.name" :value="item.pid_path" v-for="(item,index) in optionsZhan" :key="index"></el-option>
              </el-select> -->
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchUser()">查询</el-button>
            </el-form-item>
            </el-form>

        </div>
        
           <!-- 表格 -->
             <el-table
              :data="tableData"
              style="width: 100%">

              <el-table-column
                type="index"
                label="序号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="username"
                label="账户名">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="电话号码">
              </el-table-column>
              <el-table-column
                prop="bank_name"
                label="银行名称">
              </el-table-column>
              <el-table-column
                prop="bank_coke"
                label="银行卡号">
              </el-table-column>
              <el-table-column
                prop="bank_address"
                label="归属地">
              </el-table-column>
              <el-table-column
                prop="bank_branck"
                label="开户支行">
              </el-table-column>
              <!-- <el-table-column
                label="创建时间">
                <template slot-scope="scope">{{ scope.row.addtime | formatDate}}</template>
              </el-table-column> -->
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
      tableData: [],
      userNum: "",
      arr: [],
      userNam: "",
      formLabelWidth: "120px",
      ccc: 0,
      id: "",
      currentPage: 1
    };
  },
  created() {
    this.getData(); // 获取列表
  },
  computed: {},
  methods: {
    handleCurrentChange(val) {
      this.arr = [];
      this.currentPage = val;
      this.getData();
    },
    getData() {
      // 查询

      let that = this;
      this.$axios({
        url: this.URL_API + "/bqs/backend/web/index.php/knight/list",
        method: "post",
        data: {
          page: this.currentPage,
          username: this.userNam, // 账户名
          phone: this.userNum, // 电话号码
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
          that.tableData = res.data.data.data;
          that.ccc = Number(res.data.data.count) || 0;
        } else if (res.data.code == "450") {
          that.$message("暂无权限");
        }
      });
    },

    searchUser() {
      // 查询
      this.currentPage = 1;
      this.getData();
    },

    is_no() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../js/Export2Excel");
        const tHeader = [
          "账户名",
          "电话号码",
          "银行名称",
          "银行卡号",
          "归属地",
          "开户支行"
        ];
        const filterVal = [
          "username",
          "phone",
          "bank_name",
          "bank_coke",
          "bank_address",
          "bank_branck"
        ];
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "银行卡信息列表");
      });
    },
    formatJson: function(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
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
.work {
  width: 15px;
  height: 15px;
  background: green;
  border-radius: 50%;
  display: inline-block;
}
.fire {
  width: 15px;
  height: 15px;
  background: yellow;
  border-radius: 50%;
  display: inline-block;
}
</style>