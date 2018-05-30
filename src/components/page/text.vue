<template>
  <el-row class="warp">


    <el-col :span="24" class="warp-main">
      <!--工具条-->
      <el-col :span="24" class="toolbar" align="left">
        <el-form :inline="true">

          <el-form-item>
            <el-button type="primary" @click="showAddDialog('add')" size="small">新增</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="exportTable" size="small">导出Excel</el-button>
          </el-form-item>
          <el-form-item>
            <el-input v-model="filters.name" placeholder="请输入关键词" @keyup.enter.native="handleSearch" size="small" style="width: 110px"></el-input>
            <el-button type="primary" v-on:click="handleSearch" size="small">查询</el-button>
          </el-form-item>
        </el-form>

      </el-col>
      <!--列表-->
      <div style="width: 100%;margin: auto">
        <el-table :data="tableDatas" tooltip-effect="dark"   align="center" border=""  @selection-change="selsChange" v-loading="loading" element-loading-text="拼命加载中">
          <el-table-column type="selection" label="序号"> </el-table-column>
          <el-table-column label="抽奖人"   align="center" prop="name"  ></el-table-column>
          <el-table-column label="抽中奖品" align="center" prop="shortname"> </el-table-column>
          <el-table-column label="礼品码/优惠券" align="center" prop="small_pic_url">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top">
                <img :src="scope.row.small_pic_url" width="500" height=""/>
                <div slot="reference" class="name-wrapper">
                  <img :src="scope.row.small_pic_url" width="130"  class="head_pic"/>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="类型"   align="center" prop="large_pic_url">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top">
                <img :src="scope.row.large_pic_url" width="500" height=""/>
                <div slot="reference" class="name-wrapper">
                  <img :src="scope.row.large_pic_url" width="130"  class="head_pic"/>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作"   align="center" width="300px">
            <template slot-scope="scope">
              <el-button  @click="showEditDialog(scope.$index,scope.row)"  size="small">编辑</el-button>
              <el-button  @click="deleteShop(scope.$index,scope.row)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--工具条-->
        <div style="height: 50px;margin-top: 20px">
          <el-button  size="small" :disabled="this.sels.length===0" @click="deletecheck" type="danger" style="float: left">删除</el-button>
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            style="float: left">
          </el-pagination>
        </div>
      </div>
    </el-col>

    <!--新增界面-->
    <el-dialog title="新增" :visible.sync ="addFormVisible" >
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="抽奖人姓名" prop="username" label-width="90px">
          <el-input v-model="addForm.username " auto-complete="off" placeholder="请输入礼物全称" ></el-input>
        </el-form-item>
        <el-form-item label="抽奖人头像" prop="avatar_file " label-width="90px">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="#"
            :auto-upload="false"
            multiple
            :limit="1"
            :on-change="handleChange">
            <el-button size="small" type="primary">上传小图</el-button>
            <div slot="tip" class="el-upload__tip">请上传20*20的图标，单位：像素，支持PNG、JPG、JPEG格式，大小不超过500kb，若未上传，将显示默认图标</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="抽中奖品" prop="awardid">
          <el-select v-model="awardtypeValue" placeholder="请选择" @change="awardtypeChange">
            <el-option
              v-for="item in awardtypeOption"
              :key="item.awardtypeValue"
              :label="item.awardtypelabel"
              :value="item.awardtypeValue">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">保存</el-button>
      </div>
    </el-dialog>

  </el-row>
</template>

<script>

  export default {
    data() {
      return {
        //表格数据
        total: 0,
        loading: false,
        currentPage:1,
        pagesize:10,
        deleArr:[],
        sels:[],
        filters: {
          name: ''
        },
        getObj:{
          action:'1',
          awardtype:'0',
          forged:'-1',
          key_words:''
        },
        tableDatas:[],
        //新增相关数据
        addFormVisible: false,
        addLoading: false,
        addFormRules: {
          name: [
            {required: true, message: '请填写展商和媒体名称', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请填写类型', trigger: 'blur'}
          ],
          seat: [
            {required: true, message: '请填写展位号', trigger: 'blur'}
          ],
          longitude: [
            {required: true, message: '请填写经度', trigger: 'blur'}
          ],
          latitude: [
            {required: true, message: '请填写纬度', trigger: 'blur'}
          ]
        },
        addForm: {
          username :'',
          avatar_file :'',
          awardid:'',
        },
        //下拉框
        awardtypeOption: [],
        awardtypeValue:'',
        fileList:[]
      }
    },
    methods: {
      //表格里面操作
      handleSizeChange: function (size) {
        this.pagesize = size;
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        this.getTableData(this.getObj)
      },
      selsChange:function(sels){
        this.deleArr = [];
        for (var i = 0;i<sels.length;i++){
          this.deleArr.push(sels[i].id)
        }
        this.sels = sels;
      },
      deletecheck:function () {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var obj = {
            ids:this.deleArr,
          };
          this.loading = true;
          this.deleteTableData(obj,'true');
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleSearch(){
        this.loading = true;
        this.getObj.awardtype = "0";
        this.getObj.kind = "0";
        this.getObj.key_words = this.filters.name;
        this.currentPage = 1;
        this.getTableData(this.getObj)
      },

      //上传文件一些列的操作
      handleChange:function (file, fileList) {
        const extension = file.name.split('.')[1] === 'jpeg';
        const extension2 = file.name.split('.')[1] === 'jpg';
        const extension3 = file.name.split('.')[1] === 'png';
//        const extension4 = file.name.split('.')[1] === 'mp4';
        const isLt2M = file.size / 1024 / 1024 < 20;
        if (!extension && !extension2 && !extension3) {
          alert('上传格式不正确')
        }
        if (!isLt2M) {
          alert('上传模板大小不能超过 20MB!');
        }else {
          this.addForm.avatar_file = file.raw;
        }
      },
      addSubmit:function () {
        console.log(this.addForm);
        var form = new FormData();
        form.append('username',this.addForm.username);
        form.append('avatar_file ',this.addForm.avatar_file);
        form.append('awardid ',this.addForm.awardid );
        this.addLoading = true;
        this.addTableData(form,'true');
      },
      //下拉菜单
      awardtypeChange:function (val) {
        this.addForm.awardid = val;
      },
      statusChange:function (val) {
        this.getObj.status = val;
        this.loading = true;
        this.getTableData(this.getObj)
      },
      typesChange:function (val) {
        this.getObj.type = val;
        this.loading = true;
        this.getTableData(this.getObj)
      },
      isdeletedChange:function (val) {
        this.getObj.recommended = val;
        this.loading = true;
        this.getTableData(this.getObj)
      },
      radioChange:function (val) {
        this.addForm.type = val;
      },
      recommendedChange:function (val) {
        this.addForm.recommended = val;
      },
      deleteShop:function (index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var obj = {
            ids:row.id
          };
          this.loading = 'true';
          this.deleteTableData(obj,'true');
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      showAddDialog: function (val) {
        console.log(val);
        var that = this;
        this.addFormVisible = true;
      },

      //ajax
      getTableData:function (obj) {
        let that = this;
        this.$http({
          url: this.URL_API+'retail/award/search/',
          method: 'post',
          data:obj,
        }).then(function (res) {
          console.log(res);
          if(res.data.ret === true){
            that.loading = false;
            that.tableDatas = res.data.data.awards.slice((that.currentPage-1)*that.pagesize,that.currentPage*that.pagesize);
            that.total = res.data.data.awards.length;
          }else {
            that.$notify({
              title: '错误',
              message: '数据返回错误',
              type: 'warning'
            });
          }
        })
      },
      deleteTableData:function (obj,callback) {
        let that = this;
        this.$http({
          url: this.URL_API+'/retail/award/delete/',
          method: 'post',
          data:obj,
        }).then(function (res) {
          console.log(res);
          if(res.data.ret === true){
            that.$notify({
              title: '成功',
              message: '状态改变成功',
              type: 'success'
            });
            if(callback){
              that.getTableData(that.getObj)
            }
          }
        })
      },

      addTableData:function (obj,callback) {
        let that = this;
        let config = {
          transformRequest:[function(data){
            return data;
          }],
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        this.$http.post(this.URL_API+'retail/award/result/search/', obj,config).then(function (res) {
          console.log(res);
          if(res.data.ret === true){
            that.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            });
            that.addLoading = false;
            that.addFormVisible = false;
//            that.$refs['addForm'].resetFields();
//            that.$refs['upload'].clearFiles();
//            that.$refs['ziliao'].clearFiles();
            if(callback){
              that.getTableData(that.getObj)
            }
          }else {
            that.addLoading = false;
            that.$notify({
              title: '失败',
              message: '请填写必填字段信息',
              type: 'warning'
            });
          }
        })
      },
      getAward:function () {
        let that = this;
        this.$http.post(this.URL_API+'retail/award/list/').then(function (res) {
          console.log(res);
          if(res.data.ret === true){
            for(let i in res.data.data.awards){
             let obj = {
               awardtypeValue:i,
               awardtypelabel:res.data.data.awards[i]
             };
              that.awardtypeOption.push(obj)
          }
          }
        })
      },

      //导出功能
      exportTable:function() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('../vendor/Export2Excel');
          const tHeader = ['名称', '展位号', '联系人', '电话', '地区','类型','状态'];
          const filterVal = ['name', 'position_no', 'contact_person', 'phone','address','type','status'];
          const list = this.tableDatas;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, '亚展会展商列表');
        })
      },
      formatJson:function(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },

    },
    created () {
      this.getObj.awardtype = "0";
      this.getObj.kind = "0";
      this.getObj.key_words = "";
//      this.getTableData(this.getObj);
      this.getAward()
    }
  }
</script>
