<template>
    <div class="table">
        <div class="divBut">
            <el-row>
                <!-- <el-button type="primary" round @click="is_no()">导出</el-button> -->
            </el-row>
        </div>
        <div class="divBut" style="margin:20px 0 0 0;display:flex;justify-content: space-between;">
         <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="手机号">
                <el-input placeholder="请输入手机号" v-model="userNam"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input placeholder="姓名" v-model="userNum"></el-input>
            </el-form-item>
            <el-form-item label="审核状态">
                <el-select v-model="form1.region" filterable  placeholder="请选择">
                  <el-option label="请选择" value=""></el-option>
                  <el-option label="待分配" value="2"></el-option>
                  <el-option label="未通过" value="1"></el-option>
                  <el-option label="待审核" value="0"></el-option>
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
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="手机号">
              </el-table-column>
              <el-table-column
                prop="relly_name"
                label="姓名">
              </el-table-column>
              <el-table-column
                label="提交时间">
                <template slot-scope="scope">{{ scope.row.updatetime | formatDate}}</template>
              </el-table-column>
              <el-table-column
                label="审核状态">
                <template slot-scope="scope" >
                    <span v-if="scope.row.check_status == '2'">未分配</span>
                  <span v-if="scope.row.check_status == '1'">未通过</span>
                  <span v-if="scope.row.check_status == '0'">未审核</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope" >
                  <el-button type="success" size="small" round @click.native.prevent="delChild(scope.row)" v-if="scope.row.check_status =='2'">分配</el-button>
                  <el-button type="success" size="small" round @click.native.prevent="chaChild(scope.row)" v-if="scope.row.check_status =='2'">查看</el-button>
                  <el-button type="primary" size="small" round @click.native.prevent="editChild(scope.row)" v-if="scope.row.check_status =='1'">原因</el-button>
                  <el-button type="primary" size="small" round @click.native.prevent="seeChild(scope.row)" v-if="scope.row.check_status =='0'">审核</el-button>
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
          <!--   原因  弹框-->
    <el-dialog
            title="原因"
            :visible.sync="allotDialogVisible"
            width="30%">
            <div>
              <span>{{whyCon}}</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="allotDialogVisible = false">确 定</el-button>
                
            </span>
            </el-dialog>
                      <!--   分配  弹框-->
    <el-dialog
            title="分配站点"
            :visible.sync="allotDialogVisible1"
            width="30%">
            <div>
               <el-form style='width:100%;'>
              <el-form-item label="转运中心">
              <el-select v-model="form1.region1" filterable  placeholder="请选择" style='width:70%;'>
                <el-option :label="item.name" :value="item.pid_path" v-for="(item,index) in optionsZhan" :key="index"></el-option>
              </el-select>
            </el-form-item>
               </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="allotDialogVisible1 = false">取消</el-button>
                 <el-button type="primary" @click="allotOrder()">确定</el-button>
            </span>
            </el-dialog>
    </div>
</template>

<script>
import { formatDate } from "./../../js/data";
export default {

  data() {
    return {
      tableData: [],
      optionsZhan: [],
      userNum:"",
      arr: [],
      whyCon:"",
      userNam: "",
      allotDialogVisible:false,
      allotDialogVisible1: false,
      del_list: [],
      form1: {
        region: "",
        region1:""
      },
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
        url: this.URL_API + "/bqs/backend/web/index.php/knight/check_knight",
        method: "post",
        data: {
          page: this.currentPage,
          phone: this.userNam,// 手机号
          relly_name: this.userNum,// 姓名
          check_status: this.form1.region,// 状态
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
    chaChild(rows){
      // 点击  查看
      this.$router.push({path:"/audit",query:{id: rows.k_id,sta:true}});
    },
    seeChild(rows){
      // 点击  审核
      this.$router.push({path:"/audit",query:{id: rows.k_id,sta: false}});
    },
    editChild(rows){
      // 点击  原因
        let that = this;
        this.$axios({
            url: this.URL_API + "/bqs/backend/web/index.php/knight/update?id="+rows.k_id+"&token="+window.sessionStorage.getItem("token"),
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
              that.whyCon = res.data.data.remark;
              that.allotDialogVisible = true;
            } else if (res.data.code == "450") {
            that.$message("暂无权限");
            }
        });
    },
    delChild(rows){
      // 点击分配
      this.id = rows.k_id;
      this.getZhandian();
      this.allotDialogVisible1 = true;
    },
    allotOrder(){
      // 分配站点  提交
      let that = this;
      this.$axios({
        url: this.URL_API + "/bqs/backend/web/index.php/knight/update",
        method: "post",
        data: {
          id: this.id,
          company_path: this.form1.region1,// 状态
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
          that.$message(res.data.message);
          that.allotDialogVisible1 = false;
          that.getData();
        } else if (res.data.code == "450") {
          that.$message("暂无权限");
        }
      });

    },
    getZhandian() {
      // 获取转运中心
      let that = this;
      this.$axios({
        url:
          "http://www.zjcoldcloud.com/bqs/backend/web/index.php/company/company",
        method: "post",
        data: { level: 4, token: window.sessionStorage.getItem("token") },
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
          that.optionsZhan = res.data.data;
          that.optionsZhan.unshift({ name: "请选择", pid_path: "" });
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
.work{
  width:15px;
  height:15px;
  background: green;
  border-radius: 50%;
  display: inline-block;
}
.fire{
  width:15px;
  height:15px;
  background: yellow;
  border-radius: 50%;
  display: inline-block;
}

</style>