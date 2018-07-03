<template>
    <div>
        <el-tabs v-model="activeName" type="border-card"  @tab-click='clickTab'>
            <el-tab-pane label="订单问题" name='first'>
                <div>
                  <div class="divBut" style="margin:20px 0 0 0;">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item label="回复状态" >
                          <el-select v-model="region"  placeholder="请选择回复状态" @change="searchOrder">
                              <el-option label="请选择" value=""></el-option>
                              <el-option label="已回复" value="1"></el-option>
                              <el-option label="未回复" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- <el-form-item>
                            <el-button type="primary" @click="searchUser()">查询</el-button>
                        </el-form-item> -->
                        </el-form>
                    </div>
                               <!-- 表格 -->
             <el-table
              :data="tableData"
              style="width: 100%"
              cell-class-name='sheyan'>
              <el-table-column
                type="index"
                label="序号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="order_code"
                label="订单号">
              </el-table-column>
              <el-table-column
                prop="tms_way_code"
                label="运单号">
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
                label="发生时间">
                <template slot-scope="scope">{{ scope.row.addtime | formatDate}}</template>
              </el-table-column>
              <el-table-column
                label="回复状态">
                <template slot-scope="scope" >
                  <span v-if="scope.row.status == '1'">已回复</span>
                  <span v-if="scope.row.status == '0'">未回复</span>
                </template>
              </el-table-column>
              
              <el-table-column
                label="问题描述">
                <template slot-scope="scope" >
                  <span v-if="scope.row.status == '1'" @click="getUpdate(scope.row)" class='sdf'>详情</span>
                  <span v-if="scope.row.status == '0'" class='asdf sdf' @click="getUpdate(scope.row)">查看</span>
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
                </div> 
            </el-tab-pane>
            <el-tab-pane label="其他问题" name='sec'>
                <div>
                    <div class="divBut" style="margin:20px 0 0 0;">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item label="回复状态" >
                          <el-select v-model="region1"  placeholder="请选择回复状态" @change="searchOther">
                              <el-option label="请选择" value=""></el-option>
                              <el-option label="已回复" value="1"></el-option>
                              <el-option label="未回复" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- <el-form-item>
                            <el-button type="primary" @click="searchUser()">查询</el-button>
                        </el-form-item> -->
                        </el-form>
                    </div>
                               <!-- 表格 -->
             <el-table
              :data="tableData"
              style="width: 100%"
              cell-class-name='sheyan'>
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
                label="发生时间">
                <template slot-scope="scope">{{ scope.row.addtime | formatDate}}</template>
              </el-table-column>
              <el-table-column
                label="回复状态">
                <template slot-scope="scope" >
                  <span v-if="scope.row.status == '1'">已回复</span>
                  <span v-if="scope.row.status == '0'">未回复</span>
                </template>
              </el-table-column>
              
              <el-table-column
                label="问题描述">
                <template slot-scope="scope" >
                  <span v-if="scope.row.status == '1'" @click="getUpdate(scope.row)" class='sdf'>详情</span>
                  <span v-if="scope.row.status == '0'" class='asdf sdf' @click="getUpdate(scope.row)">查看</span>
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
                </div> 
            </el-tab-pane>
  
        </el-tabs>
              <!-- 未回复   弹框 -->
        <el-dialog
          title="问题描述"
          :visible.sync="dialogFormVisible"
          width="10%">
          <div>
            <el-row v-if='isOrder'>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <span>订单号：</span>
                  <span>{{tms_order_code || '暂无单号'}}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <span>运单号：</span>
                  <span>{{way_code || '暂无单号'}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  <span>内容：</span>
                  <span>{{wenContent}}</span>
                </div>
              </el-col>
            </el-row>
            <div class='isflex'>
              <div>图片：</div>
              <div style='width:500px;height:300px;margin: 0 0 20px 0;'>
                <template v-if='imgList.length==1'>
                  <img :src="item" alt="" v-for='(item,index) in imgList' :key='index' alt='暂无照片' style='width:100%;height:100%;'>
                </template>
               <template v-else>
                <span>暂无照片</span>
               </template>
              </div>
            </div>
            <div class='isflex'>
              <div style='width:5%;'>回复：</div>
              <textarea name="" id="" cols="30" rows="10" :disabled='isDisabled' class='isla' v-model="replyCon"></textarea>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" v-if='!isDisabled'>取 消</el-button>
                <el-button type="primary" v-if='isDisabled1' @click="dialogFormVisible = false">关闭</el-button>
                <el-button type="primary" @click="delOrder()" v-if='!isDisabled'>提交</el-button>
            </span>
         
        </el-dialog>
        
    </div>
</template>

<script>
import { formatDate } from "./../../js/data";
export default {
  data: function() {
    return {
      activeName: "first",
      replyCon:"",
      ccc: 0,
      id:'',
      isOrder: true,
      relly_url:'order_list',
      tableData: [],
      region: '',
      region1: '',
      status: '',
      currentPage: 1,
      dialogFormVisible: false,
      isDisabled: false,
      isDisabled1: false,
      tms_order_code: '',
      way_code: '',
      wenContent: '',
      imgList : [],
      wenReply : ''

    };
  },
  beforeCreate() {
    let token = window.sessionStorage.getItem("token");
    if (token == "" || token == undefined) {
      this.$router.push("/");
    }
  },
  created() {
    this.relly_url = 'order_list';
    this.getList();
  },
  methods: {
    clickTab(tab, event) {
      // 点击  tab
      if(tab.name == 'sec'){
        this.relly_url = 'other_list';
        this.status = '';
        this.region = '';
        this.isOrder = false;
        this.currentPage = 1;
        this.ccc = 1;
        this.getList();
      }else{
        this.relly_url = 'order_list';
        this.status = '';
        this.isOrder = true;
        this.region1 = '';
        this.currentPage = 1;
        this.ccc = 1;
        this.getList();
      }

    },
    searchOrder(){
      // 搜索  订单
      this.status = this.region;
      this.getList();
    },
    searchOther(){
      // 搜索   其他
      this.status = this.region1;
      this.getList();
    },
    getList() {
      // 订单问题  展示
      let that = this;
      this.$axios({
        url: this.URL_API+"/bqs/backend/web/index.php/bug/"+this.relly_url,
        method: "post",
        data: { 
          page: this.currentPage,
          status: this.status,
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
        } else if (res.data.code == "400") {
          that.$message("请先登录");
          that.$router.push("/");
        }else if(res.data.code == '1'){
          that.tableData = [];
          that.ccc = 0;
        }
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    getUpdate(rows){
      // console.log(rows.b_id);
      this.id = rows.b_id;
      let token = window.sessionStorage.getItem("token") ;
      // 获取  内容
      let that = this;
      this.$axios({
        url: this.URL_API+"/bqs/backend/web/index.php/bug/bug_update?id="+this.id+"&token="+token,
        method: "get",
        data: { },
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
      }).then((res)=>{
        if (res.data.code == "0") {
          if(res.data.data.reply == ''){
            that.isDisabled = false;
            that.isDisabled1 = false;
          }else{
            that.isDisabled = true;
            that.isDisabled1 = true;
          }
           that.tms_order_code = res.data.data.order_code;
           that.way_code = res.data.data.tms_way_code;
           that.wenContent = res.data.data.bug;
           that.imgList = res.data.data.picture;
           that.replyCon = res.data.data.reply;
          that.dialogFormVisible = true;

        } else if (res.data.code == "450") {
          that.$message("暂无权限");
        } else if (res.data.code == "400") {
          that.$message("请先登录");
          that.$router.push("/");
        }
      });
    },
    delOrder(){
        // 回复   提交
        let token = window.sessionStorage.getItem("token") ;
      // 获取  内容
      let that = this;
      this.$axios({
        url: this.URL_API+"/bqs/backend/web/index.php/bug/bug_update",
        method: "post",
        data: {
          id: this.id,
          token: token,
          reply: this.replyCon
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
      }).then((res)=>{
        if (res.data.code == "0") {
          that.dialogFormVisible = false;
          that.$message("回复成功");
          that.getList();
        } else if (res.data.code == "450") {
          that.$message("暂无权限");
        } else if (res.data.code == "400") {
          that.$message("请先登录");
          that.$router.push("/");
        }else{
          that.$message(res.data.message);
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
.asdf{
  color:blue;
}
.sdf{
  cursor: pointer;
}
.isla{
  width:90%;
  resize:none;
}
.isflex{
  display: flex;

}
</style>