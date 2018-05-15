<template>
    <div>
         <div class="divBut">
            <el-row>
                <el-button type="primary" round @click="add()">添加</el-button>

            </el-row>
            <div style="margin:0 60px 0 0;">
                总条数：<span>{{count}}</span>条
            </div>
        </div>

        <!-- 表格 -->
         <table style="width:100%;border:1px solid #ccc;margin:10px 0 0 0;">
          <thead>
            <th>序号</th>
            <th style="width:200px;padding:0 0 0 20px;">权限名</th>
            <th>权限</th>
            <th>是否为菜单</th>
            <th style="width:255px;">操作</th>
          </thead>
          <tbody>
            <template v-for="(item,index) in options">
                    <tr>
                        <td>{{Number(index)+1}}</td>
                        <td>{{item.level}}{{item.name}}</td>
                        <td>{{item.controller}}/{{item.action}}</td>
                        <td v-if="item.type==1">是</td>
                        <td v-if="item.type==0">否</td> 
                            <template v-if="item.level!='------'">
                                <td>
                                    <el-button type="primary" size="small" round :data_id="item.p_path" @click="addChild($event)" >添加子权限</el-button>
                                    <el-button type="warning" size="small" round :data_id="item.o_id" @click="editChild($event)">修改</el-button>
                                    <el-button type="danger" size="small" round :data_id="item.p_path" @click="delChild($event)">删除</el-button>
                                </td>
                            </template>
                            <template v-else>
                                <td>
                                    <span style="width:90px;display:inline-block;"></span>
                                    <el-button type="warning" size="small" round :data_id="item.o_id" @click="editChild($event)">修改</el-button>
                                    <el-button type="danger" size="small" round :data_id="item.p_path" @click="delChild($event)">删除</el-button>
                                </td>
                            </template>
                            
                        
                    </tr>        
            </template>    
          </tbody>
        </table>
        <!-- 添加子权限   弹框 -->
        <el-dialog title="添加子权限" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="权限名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="权限类型" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择权限类型">
                <el-option label="菜单权限" value="1"></el-option>
                <el-option label="动作权限" value="0"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="控制器" :label-width="formLabelWidth">
            <el-input v-model="form.con" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="方法" :label-width="formLabelWidth">
            <el-input v-model="form.act" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="icon" :label-width="formLabelWidth">
            <el-input v-model="form.icon" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addOrder()">确 定</el-button>
        </div>
        </el-dialog>
                <!-- 修改权限   弹框 -->
        <el-dialog title="修改权限" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="form">
            <el-form-item label="权限名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="权限类型" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择权限类型">
                <el-option label="菜单权限" value="1"></el-option>
                <el-option label="动作权限" value="0"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="控制器" :label-width="formLabelWidth">
            <el-input v-model="form.con" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="方法" :label-width="formLabelWidth">
            <el-input v-model="form.act" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="icon" :label-width="formLabelWidth">
            <el-input v-model="form.icon" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
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
    </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      options: [],
      p_id: "",
      count: "",
      dialogFormVisible: false,
      dialogVisible: false,
      dialogFormVisibleEdit: false,
      form: {
        name: "",
        region: "",
        delivery: false,
        con: "",
        act: "",
        icon: ""
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    this.show(); // 组件刚渲染  获取数据
  },
  methods: {
    show() {
      // 组件刚渲染  获取数据
      let that = this;
      this.$axios({
        url: "api/bqs/backend/web/index.php/oauth/list",
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
        that.options = res.data.data.data;
        that.count = res.data.data.count;
      });
    },
    add() {
      // 添加 一级数据
      this.p_id = 0;
      this.dialogFormVisible = true;
    },
    addChild(e) {
      // 添加子权限   弹框
      this.p_id = e.currentTarget.getAttribute("data_id");
      this.dialogFormVisible = true;
    },
    addOrder() {
      // 添加子权限    提交
      let that = this;
      this.$axios({
        url: "api/bqs/backend/web/index.php/oauth/add",
        method: "post",
        data: {
          action: this.form.act,
          controller: this.form.con,
          name: this.form.name,
          p_path: this.p_id,
          type: this.form.region,
          icon: this.form.icon
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
          that.dialogFormVisible = false;
          that.show();
        }
      });
    },
    editChild(e) {
      // 修改  弹框
      this.p_id = e.currentTarget.getAttribute("data_id");
      let that = this;
      this.$axios({
        url: `api/bqs/backend/web/index.php/oauth/update?id=${this.p_id}`,
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
          that.form.name = res.data.data.name;
          if (res.data.data.type == 0) {
            that.form.region = "动作权限";
          } else {
            that.form.region = "菜单权限";
          }
          that.form.con = res.data.data.controller;
          that.form.act = res.data.data.action;
          that.dialogFormVisibleEdit = true;
          that.form.icon = res.data.data.icon;
        }
      });
    },
    editOrder() {
      let that = this;
      this.$axios({
        url: `api/bqs/backend/web/index.php/oauth/update`,
        method: "post",
        data: {
          action: this.form.act,
          controller: this.form.con,
          name: this.form.name,
          type: this.form.region,
          id: this.p_id,
          icon: this.form.icon
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
            that.dialogFormVisibleEdit = false;
            that.show();
        }
      });
    },
    delChild(e) {
      // 删除 弹框  需要二次确认
      this.p_id = e.currentTarget.getAttribute("data_id");
      this.dialogVisible = true;
    },
    delOrder() {
      // 删除  提交
      let that = this;
      this.$axios({
        url: "api/bqs/backend/web/index.php/oauth/delete",
        method: "post",
        data: {
          p_path: this.p_id
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
          that.dialogVisible = false;
          that.show();
        }
      });
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
}
tr td:nth-child(2) {
  text-align: left;
  padding: 0 0 0 40px;
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
