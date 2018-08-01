<template>
    <div class="table">
        <div class="divBut">
            <el-row>
                <el-button type="primary" @click="searchUser()">删除</el-button>
            </el-row>
        </div>
           <!-- 表格 -->
             <el-table
              :data="tableData"
              style="width: 100%"
              @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
              </el-table-column>
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
                label="获取时间">
                <template slot-scope="scope">{{ scope.row.updatetime | formatDate}}</template>
              </el-table-column>
              <el-table-column
                label="注册状态">
                <template slot-scope="scope" >
                    <span v-if="scope.row.register_type == '2'">待注册照片信息</span>
                  <span v-if="scope.row.register_type == '1'">待注册车辆信息</span>
                  <span v-if="scope.row.register_type == '0'">未分配</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope" >
                  <el-button type="primary" size="small" round @click.native.prevent="editChild(scope.row,2)" v-if="scope.row.register_type =='2'">查看</el-button>
                  <el-button type="primary" size="small" round @click.native.prevent="editChild(scope.row,1)" v-if="scope.row.register_type =='1'">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
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
    </div>
</template>

<script>
import { formatDate } from "./../../js/data";
export default {

  data() {
    return {
      tableData: [],
      arr: [],
      formLabelWidth: "120px",
      id: "",
      dialogVisible: false
    };
  },
  created() {
    this.getData(); // 获取列表
  },
  computed: {},
  methods: {
    handleSelectionChange(val) {
      // 全选 ID
      this.arr = [];
      val.forEach((item,index)=>{
        this.arr.push(item.k_id);
      })
    },
    getData() {
      // 查询
      let that = this;
      this.$axios({
        url: this.URL_API + "/bqs/backend/web/index.php/knight/donot_register",
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
          that.tableData = res.data.data.data;
          that.ccc = Number(res.data.data.count) || 0;
        } else if (res.data.code == "450") {
          that.$message("暂无权限");
        }
      });
    },
    editChild(rows,type){
        // 点击   代注册 车辆信息
        // type == 1  代注册 车辆信息
        // type == 2 代注册 照片信息
        this.$router.push({path: "/icePhoneSee",query: {type: type,id: rows.k_id}});
    },

    searchUser() {
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
        url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/knight/delete_knight",
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
          that.getData();
        }else if(res.data.code == '450'){
          that.$message("暂无权限");
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