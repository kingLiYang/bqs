<template>
    <div class="table">
        <div class="divBut">

            <el-row>
                <el-button type="primary" round @click="add()">添加账号</el-button>
                <el-button type="primary" round @click='edit()'>修改账号</el-button>
                <!-- <el-button type="primary" round @click="is_yes()">启用</el-button> -->
                <el-button type="primary" circle @click="del()">删除</el-button>
                <el-button type="primary" round @click="is_no()">导出</el-button>
            </el-row>
        </div>
        <div class="divBut" style="margin:20px 0 0 0;display:flex;justify-content: space-between;">
         <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input placeholder="请输入姓名" v-model="userNam"></el-input>
            </el-form-item>
            <el-form-item label="公司">
              <el-select v-model="form1.region" filterable  placeholder="请选择">
                <el-option :label="item.name" :value="item.pid_path" v-for="(item,index) in optionsZhan" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchUser()">查询</el-button>
            </el-form-item>
            </el-form>
            <div style='text-align:right;'>
          <div>
            <span class='work'></span><span>上班</span>
            <span class='fire'></span><span>下班</span>
          </div>
        </div>
        </div>
        
           <!-- 表格 -->
             <el-table
              :data="tableData"
              style="width: 100%"
              cell-class-name='sheyan'
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
                prop="username"
                label="账号">
              </el-table-column>
              <el-table-column
                prop="relly_name"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="company"
                label="所属转运中心">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="联系方式">
              </el-table-column>
              <el-table-column
                label="工作状态">
                <template slot-scope="scope" >
                  <span class='work' v-if="scope.row.working_status == '1'"></span>
                  <span class='fire' v-if="scope.row.working_status == '0'"></span>
                </template>
              </el-table-column>
              <el-table-column
                label="创建时间">
                <template slot-scope="scope">{{ scope.row.addtime | formatDate}}</template>
              </el-table-column>
              
              <el-table-column
                label="操作">
                <template slot-scope="scope" >
                  <el-button type="success" size="small" round @click.native.prevent="delChild(scope.row)" v-if="scope.row.card ==null">添加信息</el-button>
                  <el-button type="primary" size="small" round @click.native.prevent="editChild(scope.row)" v-if="scope.row.card !=null">修改信息</el-button>
                  <el-button type="primary" size="small" round @click.native.prevent="seeChild(scope.row)" v-if="scope.row.card !=null">查看信息</el-button>
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
            <!-- 添加账号   弹框 -->
        <el-dialog title="添加账号" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" auto-complete="off"></el-input>
            </el-form-item>
            
            <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.relly_name" auto-complete="off" @blur="testName(val='添加')"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" :label-width="formLabelWidth">
            <el-input v-model="form.phone" auto-complete="off" @blur="testPhone(val='添加')"></el-input>
            </el-form-item>
            <el-form-item label="所属转运中心" :label-width="formLabelWidth">
              <el-select v-model="form.region" filterable  placeholder="请选择">
                <el-option :label="item.name" :value="item.pid_path" v-for="(item,index) in optionsZhan" :key="index"></el-option>
              </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addOrder()">确 定</el-button>
        </div>
        </el-dialog>
        <!-- 修改账号 -->
        <el-dialog title="修改账号" :visible.sync="editFormVisible">
        <el-form :model="form1">
            <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="form1.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form1.password" auto-complete="off"></el-input>
            </el-form-item>
            
            <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form1.relly_name" auto-complete="off" @blur="testName(val='修改')"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" :label-width="formLabelWidth">
            <el-input v-model="form1.phone" auto-complete="off" @blur="testPhone(val='修改')"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="editFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editOrder()">确 定</el-button>
        </div>
        </el-dialog>

        <!-- 删除   弹框 -->
        <deleteDia :dialogVisible = "dialogVisible" :categoryid = 'categoryid' v-on:changeCart="changeCart"></deleteDia>
    </div>
</template>

<script>
import { formatDate } from "./../../js/data";
import deleteDia from "./pubilc/delete.vue";
export default {
  components: {
    deleteDia
  },
  data() {
    return {
      tableData: [],
      categoryid: "",
      options: [],
      options1: [],
      optionsZhan: [],
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
        relly_name: "",
        region: ""
      },
      form1: {
        name: "",
        password: "",
        phone: "",
        relly_name: "",
        region: ""
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
   beforeCreate(){
    let token = window.sessionStorage.getItem('token');
    if(token == ''|| token == undefined){
      this.$router.push('/');
    }
  },
  created() {
    this.getData(); // 获取列表
    this.getZhandian(); // 获取站点
  },
  computed: {},
  methods: {
    getZhandian() {
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
    add() {
      //   this.$router.push({ path: '/userAdd' });
      // 添加   弹框
      this.form.name = ""; // 账户
      this.form.password = ""; // 密码
      this.form.relly_name = ""; // 姓名
      this.form.phone = ""; // 手机号

      this.dialogFormVisible = true;
    },
    edit() {
      // 修改   弹框
      if (this.arr.length == 0) {
        this.$message({
          message: "请选择要修改的数据",
          type: "error"
        });
      } else if (this.arr.length > 1) {
        this.$message({
          message: "请选择单个数据",
          type: "error"
        });
      } else {
        this.form.tera = "";
        this.form.region = "";
        this.form1.zhan = "";
        this.id = this.arr.join(",");
        let that = this;
        this.$axios({
          url: `http://www.zjcoldcloud.com/bqs/backend/web/index.php/knight/update?id=${this.arr.join(
            ","
          )}&token=${window.sessionStorage.getItem("token")}`,
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
          if (res.data.code == 0) {
            that.form1.name = res.data.data.username;
            that.form1.relly_name = res.data.data.relly_name;
            that.form1.phone = res.data.data.phone;
            that.editFormVisible = true;
          } else if (res.data.code == "450") {
            that.$message("暂无权限");
          }
        });
      }
    },
    editOrder() {
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(this.form1.phone)) {
        this.$message("请输入正确的联系方式");
        this.form1.phone = "";
      } else {
        let that = this;
        this.$axios({
          url: `http://www.zjcoldcloud.com/bqs/backend/web/index.php/knight/update`,
          method: "post",
          data: {
            id: this.id,
            username: this.form1.name, // 账户
            pwd: this.form1.password, // 密码
            relly_name: this.form1.relly_name, // 姓名
            phone: this.form1.phone, // 手机号
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
            // that.options1 = res.data.data;
            that.editFormVisible = false;
            that.$message("修改成功");
            that.getData();
          } else if (res.data.code == "450") {
            that.$message("暂无权限");
          } else {
            that.$message(res.data.message);
          }
        });
      }
    },
    addOrder() {
      // 添加  提交
      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(this.form.phone)) {
        this.$message("请输入正确的联系方式");
        this.form.phone = "";
      } else {
        let that = this;
        this.$axios({
          url: this.URL_API + "/bqs/backend/web/index.php/knight/add",
          method: "post",
          data: {
            username: this.form.name, // 账户
            pwd: this.form.password, // 密码
            relly_name: this.form.relly_name, // 姓名
            phone: this.form.phone, // 手机号
            company_path: this.form.region,
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
        })
          .then(function(res) {
            if (res.data.code == "0") {
              // that.options1 = res.data.data;
              that.dialogFormVisible = false;
              that.$message("添加成功");
              that.getData();
            } else if (res.data.code == "450") {
              that.$message("暂无权限");
            } else {
              that.$message(res.data.message);
            }
          })
          .catch(err => {
            that.$message("网络错误");
          });
      }
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
        let obj = {
          id: this.arr.join(","),
          token: window.sessionStorage.getItem("token")
        };
        this.categoryid = JSON.stringify(obj);
      }
    },
    changeCart() {
      // 删除  提交完成  子传父
      this.dialogVisible = false;
      this.getData();
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
        url: this.URL_API + "/bqs/backend/web/index.php/knight/list",
        method: "post",
        data: {
          page: this.currentPage,
          relly_name: this.userNam,
          company_path: this.form1.region,
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
    seeChild(rows) {
      // 查看信息
      this.$router.push({
        path: "/userAdd",
        query: { id: rows.k_id, sta: false }
      });
    },
    editChild(rows) {
      // 修改信息   条页面
      this.$router.push({
        path: "/userAdd",
        query: { id: rows.k_id, sta: true }
      });
    },
    delChild(rows) {
      // 添加信息  跳页面
      // console.log(rows);
      this.id = rows.k_id;
      this.$router.push({ path: "/userAdd", query: { id: rows.k_id } });
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
      val.forEach((item, index) => {
        this.arr.push(item.k_id);
      });
    },
    testName(val) {
      // 验证  姓名
      let reg = /^[\u4E00-\u9FA5]{2,4}$/;
      if (val == "添加") {
        if (!reg.test(this.form.relly_name)) {
          this.$message("请输入正确的姓名");
          this.form.relly_name = "";
        }
      } else {
        if (!reg.test(this.form1.relly_name)) {
          this.$message("请输入正确的姓名");
          this.form1.relly_name = "";
        }
      }
    },
    testPhone(val) {
      // 验证  联系方式 111
      let myreg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
      if (val == "添加") {
        if (!myreg.test(this.form.phone)) {
          this.$message("请输入正确的联系方式");
          this.form.phone = "";
        }
      } else {
        if (!myreg.test(this.form1.phone)) {
          this.$message("请输入正确的联系方式");
          this.form1.phone = "";
        }
      }
    },
    is_no() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../js/Export2Excel");
        const tHeader = [
          "姓名",
          "联系方式",
          "账号",
          "地址",
          "性别",
          "紧急联系人",
          "紧急联系人电话",
          "车牌号",
          "驾驶证类型",
          "银行卡号"
        ];
        const filterVal = [
          "relly_name",
          "phone",
          "username",
          "address",
          "sex",
          "help_user",
          "help_phone",
          "car_code",
          "driving_type",
          "bank_coke"
        ];
        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "冰骑士信息列表");
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