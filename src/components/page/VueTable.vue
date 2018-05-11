<template>
    <div>
      <div class="divBut">
            <el-row>
                <el-button type="primary" round @click="add()">添加</el-button>
                <el-button type="primary" round @click="edit()">修改</el-button>
                <el-button type="primary" round @click="del()">删除</el-button>
            </el-row>
            <div style="margin:0 60px 0 0;">
                总条数：<span>{{count}}</span>条
            </div>
        </div>
            <!-- 表格 -->
         <table style="width:100%;border:1px solid #ccc;margin:10px 0 0 0;">
          <thead>
            <th><input type="checkbox" @click="allChecked()" v-model="checkedAll"></th>
            <th>序号</th>
            <th>角色</th>
            <th>添加时间</th>
            <th>操作</th>
          </thead>
          <tbody>
            <template v-for="(item,index) in options">
                    <tr>
                        <td><input type="checkbox" :data_id="item.r_id" :checked="isChecked" @click='sel($event)'></td>
                        <td>{{Number(index)+1}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.addtime | formatDate}}</td>
                        <td>
                            <el-button type="danger" size="small" round :data_id="item.r_id" @click="delChild($event)">分配权限</el-button>
                        </td>
                    </tr>        
            </template>    
          </tbody>
        </table>
 <!-- 添加   弹框 -->
        <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="角色名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addOrder()">确 定</el-button>
        </div>
        </el-dialog>
         <!-- 修改   弹框 -->
        <el-dialog title="修改角色" :visible.sync="editFormVisible">
        <el-form :model="form1">
            <el-form-item label="角色名称" :label-width="formLabelWidth">
            <el-input v-model="form1.name" auto-complete="off"></el-input>
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

      <!-- 分配权限 树-->
         <el-dialog
            title="分配权限"
            :visible.sync="allotVisible"
            width="30%">
            <el-tree
              :data="data2"
              show-checkbox
              node-key="o_id"
              ref="tree"
              :default-expand-all=true
              :default-checked-keys="[42]"
              :props="defaultProps">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="allotVisible = false">取 消</el-button>
                <el-button type="primary" @click="allotOrder()">确 定</el-button>
            </span>
            </el-dialog>
    </div>
</template>

<script>
import { formatDate } from "./../../js/data";
export default {
  data: function() {
    return {
      data2: [],
      data3:[],
      defaultProps: {
        children: "son",
        label: "name"
      },
      options: [],
      count: "",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      allotVisible: false,
      isChecked: false,
      checkedAll: false,
      id:'',
      editFormVisible:false,
      dialogVisible: false,
      arr: [],
      form: {
        name: ""
      },
      form1:{
        name:""
      }
    };
  },
  components: {},
  created() {
    this.show(); // 刚进来的时候  请求数据
  },
  methods: {
    show() {
      let that = this;
      this.$axios({
        url: `api/bqs/backend/web/index.php/role/list`,
        method: "get",
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }).then(function(res) {
        that.options = res.data.data.data;
        that.count = res.data.data.count;
      });
    },
    add() {
      // 添加 弹框
      this.dialogFormVisible = true;
    },
    addOrder() {
      // 添加  提交
      let that = this;
      this.$axios({
        url: "api/bqs/backend/web/index.php/role/add",
        method: "post",
        data: {
          name: this.form.name
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
          that.dialogFormVisible = false;
          that.show();
        }
      });
    },
    allChecked(e) {
      // 全选
      this.arr = [];
      if (this.checkedAll) {
        this.isChecked = false;
      } else {
        this.isChecked = true;
        this.options.forEach((item, index) => {
          this.arr.push(item.r_id);
        });
      }
    },
    sel(e) {
      // 点击 列表 的 多选框
      let id = e.currentTarget.getAttribute("data_id");
      let a = false;
      for (let i = 0; i < this.arr.length; i++) {
        if (id == this.arr[i]) {
          this.arr.splice(i, 1);
          a = true;
          break;
        }
      }
      if (!a) {
        this.arr.push(id);
      }
    },
    del() {
      // 删除   弹框
      if (this.arr.length == 0) {
        this.$message({
          message: "请选择要删除的数据",
          type: "error"
        });
      } else {
        this.dialogVisible = true;
      }
      // console.log(this.arr.join(','));
    },
    delOrder() {
      // 删除  提交
      let that = this;
      this.$axios({
        url: "api/bqs/backend/web/index.php/role/delete",
        method: "post",
        data: {
          id: this.arr.join(",")
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
          that.show();
        }
      });
    },
    edit() {
      // 修改  默认
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
    
        let that = this;
        this.$axios({
          url: `api/bqs/backend/web/index.php/role/update?id=${this.arr.join(',')}`,
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
            that.form1.name = res.data.data.name;
            that.editFormVisible = true;
          }
        });
      }
    },
    editOrder(){
      // 修改   提交
      let that = this;
        this.$axios({
          url: `api/bqs/backend/web/index.php/role/update`,
          method: "post",
          data: {
            id:this.arr.join(","),
            name:this.form1.name
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
            that.$message('修改成功');
            that.show();
          }
        });
    },
    delChild(e) {
      // 分配权限  默认
      this.id = e.currentTarget.getAttribute("data_id");
      let that = this;
      this.$axios({
        url: "api/bqs/backend/web/index.php/role/get_role_oauth",
        method: "post",
        data: {
          id: this.id
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
        that.data2 = res.data.data.oauth;
        that.data3 = res.data.data.my_oauth;
        that.allotVisible = true;
      });
    },
    allotOrder() {
      // 分配权限   提交
      // console.log(this.$refs.tree.getCheckedKeys());
        // let id = e.currentTarget.getAttribute("data_id");
      let that = this;
      this.$axios({
        url: "api/bqs/backend/web/index.php/role/allocation_oauth",
        method: "post",
        data: {
          role_id: this.id,
          oauth_id: this.$refs.tree.getCheckedKeys()
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
        that.allotVisible = false;
      });
    }
  },
  computed: {},
  beforeMount() {},
  filters: {
    formatDate(time) {
      var date = new Date(time * 1000);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
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
  width: 20%;
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
</style>