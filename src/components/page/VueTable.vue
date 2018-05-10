<template>
    <div>
      <div class="divBut">
            <el-row>
                <el-button type="primary" round @click="add()">添加</el-button>
                <el-button type="primary" round @click="">修改</el-button>
                <el-button type="primary" round @click="">删除</el-button>
            </el-row>
            <div style="margin:0 60px 0 0;">
                总条数：<span>{{count}}</span>条
            </div>
        </div>
            <!-- 表格 -->
         <table style="width:100%;border:1px solid #ccc;margin:10px 0 0 0;">
          <thead>
            <th><input type="checkbox"></th>
            <th>序号</th>
            <th>角色</th>
            <th>添加时间</th>
            <th>操作</th>
          </thead>
          <tbody>
            <template v-for="(item,index) in options">
                    <tr>
                        <td><input type="checkbox" :data_id="item.r_id"></td>
                        <td>{{Number(index)+1}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.addtime | formatDate}}</td>
                        <td>
                            <el-button type="danger" size="small" round :data_id="item.p_path" @click="delChild($event)">分配权限</el-button>
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
    </div>
</template>

<script>
import { formatDate } from "./../../js/data";
export default {
  data: function() {
    const self = this;
    return {
      options: [],
      count: "",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        name: ""
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
       if(res.data.code == 0){
           that.dialogFormVisible = false;
            that.show();
       }
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