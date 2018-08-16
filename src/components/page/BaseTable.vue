<template>
    <div class="table">
        <div class="divBut">
            <el-row>
                <el-button type="primary" round @click="add()">添加</el-button>
                <el-button type="primary" round @click='edit($event)'>修改</el-button>
                <el-button type="primary" round @click="is_yes()">启用</el-button>
                <el-button type="primary" round @click="is_no()">禁用</el-button>
                <el-button type="primary" round @click="del()">删除</el-button>
            </el-row>
        </div>
        <div class="divBut" style="margin:20px 0 0 0;">
         <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input placeholder="请输入姓名" v-model="userNam"></el-input>
            </el-form-item>
            <el-form-item label="启用状态">
                <el-select  v-model="formInline"  placeholder="请选择启用状态">
                  <el-option label="请选择" value=""></el-option>
                <el-option label="审核通过" value="1"></el-option>
                <el-option label="禁用" value="0"></el-option>
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
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                type="index"
                width="120"
                label="序号">
              </el-table-column>
              <el-table-column
                prop="relly_name"
                label="用户姓名"
                width="120">
              </el-table-column>
              <el-table-column
                prop="username"
                label="用户账号">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="用户电话">
              </el-table-column>
              <el-table-column
                prop="name"
                label="公司名称">
              </el-table-column>
              <el-table-column
                label="添加时间">
                <template slot-scope="scope">{{ scope.row.addtime | formatDate }}</template>
              </el-table-column>

              <el-table-column
                prop="status"
                label="启用状态" :formatter="judge">
                <!-- <div v-if="status==1"></div>  -->
              </el-table-column>



              <el-table-column
                label="操作">
                <template slot-scope="scope">
                <el-button type="danger" size="small" round @click.native.prevent="delChild(scope.row)">分配角色</el-button>

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
            <!-- 添加用户   弹框 -->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="用户姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" @blur="testChina(val='添加')"></el-input>
            </el-form-item>
            <el-form-item label="登录账号" :label-width="formLabelWidth">
            <el-input v-model="form.username" auto-complete="off"></el-input>
            </el-form-item>
            
            <el-form-item label="登录密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" auto-complete="off" @blur="testEmail(val='添加')"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="form.phone" auto-complete="off" @blur="testPhone(val='添加')"></el-input>
            </el-form-item>
            <el-form-item label="总部名称" :label-width="formLabelWidth">
              <el-input v-model="form.admin" auto-complete="off" :disabled="true" placeholder="总部"></el-input>
            </el-form-item>
            <el-form-item label="大区名称" :label-width="formLabelWidth">
              <el-select v-model="form.tera" placeholder="请选择大区"  @change="getCompany()">
                <el-option label="请选择" value=""></el-option>
                <el-option :label="item.name" :value="item.c_id" v-for="(item,index) in optionCompany" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="公司名称" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择公司"  @change="getZhan()">
              <el-option label="请选择" value=""></el-option>
                <el-option :label="item.name" :value="item.c_id" v-for="(item,index) in options" :key="index"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="所在站点" :label-width="formLabelWidth">
            <el-select v-model="form.zhan" placeholder="请选择站点">
              <el-option label="请选择" value=""></el-option>
                <el-option  :label="item.name" :value="item.c_id" v-for="(item,index) in options1" :key="index"></el-option>
              </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addOrder()">确 定</el-button>
        </div>
        </el-dialog>
        <!-- 修改用户   弹框 -->
        <el-dialog title="修改用户" :visible.sync="editFormVisible">
        <el-form :model="form1">
            <el-form-item label="用户姓名" :label-width="formLabelWidth">
            <el-input v-model="form1.name" auto-complete="off" @blur="testChina(val='修改')"></el-input>
            </el-form-item>
            <el-form-item label="登录账号" :label-width="formLabelWidth">
            <el-input v-model="form1.username" auto-complete="off"></el-input>
            </el-form-item>
            
            <el-form-item label="登录密码" :label-width="formLabelWidth">
            <el-input v-model="form1.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱" :label-width="formLabelWidth">
            <el-input v-model="form1.email" auto-complete="off" @blur="testEmail(val='修改')"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" :label-width="formLabelWidth">
            <el-input v-model="form1.phone" auto-complete="off" @blur="testPhone(val='修改')"></el-input>
            </el-form-item>
            <el-form-item label="总部名称" :label-width="formLabelWidth">
              <el-input v-model="form1.admin" auto-complete="off" :disabled="true" placeholder="总部"></el-input>
            </el-form-item>
            <el-form-item label="大区名称" :label-width="formLabelWidth">
              <el-select v-model="form.tera" placeholder="请选择大区"  @change="getCompany()">
                <el-option label="请选择" value=""></el-option>
                <el-option :label="item.name" :value="item.c_id" v-for="(item,index) in optionCompany" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="公司名称" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择公司"  @change="getZhan()">
              <el-option label="请选择" value=""></el-option>
                <el-option :label="item.name" :value="item.c_id" v-for="(item,index) in options" :key='index'></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="所在站点" :label-width="formLabelWidth">
            <el-select v-model="form1.zhan" placeholder="请选择站点">
              <el-option label="请选择" value=""></el-option>
                <el-option  :label="item.name" :value="item.c_id" v-for="(item,index) in options1" :key="index"></el-option>
              </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="editFormVisible = false">取 消</el-button>
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
    
    <!-- 分配角色  弹框-->
    <el-dialog
            title="分配角色"
            :visible.sync="allotDialogVisible"
            width="30%">
            <div>
               <el-checkbox-group 
                v-model="checkedCities1" @change="handleCheckAllChange">
                <el-checkbox v-for="(city,index) in allRole" :label="city.r_id" :key="index">{{city.name}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="allotDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="allotOrder()">确 定</el-button>
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
      options: [],
      options1: [],
      optionCompany:[],
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
        username: "",
        password: "",
        phone: "",
        com: "",
        region: "",
        zhan: "",
        email: "",
        admin:"",
        tera:""
      },
      form1: {
        name: "",
        username: "",
        password: "",
        phone: "",
        com: "",
        region: "",
        zhan: "",
        email: "",
        admin:"",
        tera:""
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
    this.getData();
  },
  computed: {},
  methods: {
    add() {
      //   this.$router.push({ path: '/userAdd' });
      // 添加   弹框
      this.getArea(); // 获取大区

      this.form.name = '';
      this.form.username = '';
      this.form.password = '';
      this.form.phone = '';
      this.form.com = '';
      this.form.tera = '';
      this.form.region = '';
      this.form.zhan = '';
      this.form.email = '';

      this.dialogFormVisible = true;
    },
    getArea(){
       let that = this;
      this.$axios({
        url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/company/company",
        method: "post",
        data: { level: 2,token: window.sessionStorage.getItem("token") },
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
      
          
          that.optionCompany = res.data.data;
        }else if(res.data.code == '450'){
          that.$message("暂无权限");
        }
        
      });
    },
    getCompany(){
      // 点 大区  获取  公司
      let that = this;
      this.$axios({
        url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/company/next",
        method: "post",
        data: { pid: this.form.tera,token: window.sessionStorage.getItem("token") },
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
          // console.log(res.data.data);
        }else if(res.data.code == '450'){
          that.$message("暂无权限");
        }else if(res.data.code == '2'){
          that.options = [];
        }
        
      });
    },
    getZhan() {
      this.form1.zhan = '';
      this.form.zhan = '';
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
        if(res.data.code == '0'){
          that.options1 = res.data.data;
        }else{
          that.options1 = [];
        }
        
      });
    },
    addOrder() {
      // 添加  提交
      // form.admin  总部
      // form.tera  大区
      let id = "";
      if(this.form.tera == ""){
        id = 1;
      }else if(this.form.region == ""){
        id = this.form.tera;
      }else if(this.form.zhan == ""){
        id = this.form.region;
      }else{
        id = this.form.zhan;
      }
     
      let that = this;
      this.$axios({
        url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/user/add",
        method: "post",
        data: {
          username: this.form.username,
          pwd: this.form.password,
          relly_name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          company_id: id,
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
        }else{
          that.$message(res.data.message);
        }
        
      });
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
        this.getArea();
        this.form.tera = '';
        this.form.region = '';
        this.form1.zhan = '';
        let that = this;
        this.$axios({
          url: `http://www.zjcoldcloud.com/bqs/backend/web/index.php/user/update?id=${this.arr.join(",")}&token=${window.sessionStorage.getItem("token")}`,
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
            // that.form1 = res.data.data;
            that.form1.name = res.data.data.relly_name;
            that.form1.username = res.data.data.username;
            // that.form1.password = res.data.data.pwd;
            that.form1.phone = res.data.data.phone;
            that.form1.email = res.data.data.email;

            that.editFormVisible = true;
          }else if(res.data.code == '450'){
          that.$message("暂无权限");
        }
        });
      }
    },
    editOrder() {
      // 修改  提交
      let editId = "";
      if(this.form.tera == ""){
        editId = 1;
      }else if(this.form.region == ""){
        editId = this.form.tera;
      }else if(this.form1.zhan == ""){
        editId = this.form.region;
      }else{
        editId = this.form1.zhan;
      }
      let that = this;
      this.$axios({
        url: `http://www.zjcoldcloud.com/bqs/backend/web/index.php/user/update`,
        method: "post",
        data: {
          id: this.arr.join(","),
          username: this.form1.username,
          pwd: this.form1.password,
          relly_name: this.form1.name,
          email: this.form1.email,
          phone: this.form1.phone,
          company_id: editId,
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
          that.editFormVisible = false;
          that.$message("修改成功");
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
        url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/user/delete",
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
        url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/user/list",
        method: "post",
        data: {
          page: this.currentPage,
          relly_name: this.userNam,
          status: this.formInline,
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
           that.tableData = res.data.data.data;
           that.ccc = Number(res.data.data.count) || 0;
        if(res.data.code == '450'){
          that.$message("暂无权限");
        }else if(res.data.code == '400'){
          that.$message("请先登录");
          that.$router.push("/");
        }
        
      });
    },
    is_yes() {
      //  启用
      if (this.arr.length == 0) {
        this.$message({
          message: "请选择要审核的数据",
          type: "error"
        });
      } else {
        let that = this;
        this.$axios({
          url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/user/is_not",
          method: "post",
          data: {
            status: 1,
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
            that.$message({
              message: "启用通过"
            });
            that.getData();
          }else if(res.data.code == '450'){
          that.$message("暂无权限");
        }
        });
      }
    },
    is_no() {
      // 禁用
      if (this.arr.length == 0) {
        this.$message({
          message: "请选择要禁用的数据",
          type: "error"
        });
      } else {
        let that = this;
        this.$axios({
          url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/user/is_not",
          method: "post",
          data: {
            status: 0,
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
            that.$message({
              message: "禁用成功"
            });
            that.getData();
          }else if(res.data.code == '450'){
          that.$message("暂无权限");
        }
        });
      }
    },
    delChild(rows) {
      // 分配角色
      this.id = rows.u_id;
      let that = this;
      this.$axios({
        url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/user/role_list",
        method: "post",
        data: {
          id: this.id,
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
          that.allRole = res.data.data.role;
          that.checkedCities1 = res.data.data.user_role;
          that.userVal = res.data.data.user_role;
          that.allotDialogVisible = true;
        }else if(res.data.code == '450'){
          that.$message("暂无权限");
        }
      });
    },
    handleCheckAllChange(val) {
      // 选中  获取  id
      this.userVal = val;
    },
    allotOrder() {
      // 分配角色  提交
      if(this.userVal.length == 0 ){
        this.$message('请选择角色');
      }else if(this.userVal.length > 1){
        this.$message('请选择单个角色');
      }else{
      let that = this;
      this.$axios({
        url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/user/role",
        method: "post",
        data: {
          role: this.userVal.join(','),
          id: this.id,
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
          // that.allRole = res.data.data.role;
          that.allotDialogVisible = false;
           that.$message(res.data.message);
        }else if(res.data.code == '450'){
          that.$message("暂无权限");
        }else{
          that.$message(res.data.message);
        }
      });
      }
      
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
        this.arr.push(item.u_id);
      })
    },
    judge(data){
        return data.status==1 ? '启用' : '禁用'
    },
    testChina(val){
      // 验证  姓名
      //this.form.name
      let reg = /^[\u4E00-\u9FA5]{2,4}$/;
      if(val=='添加'){
        if(!reg.test(this.form.name)){
          this.$message('请输入正确的姓名');
          this.form.name = '';
        }
      }else{
        if(!reg.test(this.form1.name)){
          this.$message('请输入正确的姓名');
          this.form1.name = '';
        }
      }
      
    },
    testEmail(val){
      // 验证  邮箱
      let reg = /^([a-zA-Z0-9_\.\-]{4,})+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
      if(val=='添加'){
        if(!reg.test(this.form.email)){
          this.$message('请输入正确的邮箱');
          this.form.email = '';
        }
      }else{
        if(!reg.test(this.form1.email)){
          this.$message('请输入正确的邮箱');
          this.form1.email = '';
        }
      }
      
    },
    testPhone(val){
      // 验证  手机号
      let myreg=/^[1][3,4,5,6,7,8][0-9]{9}$/;  
      if(val=='添加'){
        if (!myreg.test(this.form.phone)) {  
              this.$message('请输入正确的手机号');
              this.form.phone = '';
          } 
      }else{
        if (!myreg.test(this.form1.phone)) {  
              this.$message('请输入正确的手机号');
              this.form1.phone = '';
          } 
      }
          
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