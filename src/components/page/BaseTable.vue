<template>
    <div class="table">
        <div class="divBut">
            <el-row>
                <el-button type="primary" round @click="add()">添加</el-button>
                <el-button type="primary" round @click='edit($event)'>修改</el-button>
                <el-button type="primary" round>启用</el-button>
                <el-button type="primary" round>禁用</el-button>
                <el-button type="primary" round>删除</el-button>
            </el-row>
        </div>
        <div class="divBut">
         <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="启用状态">
                <el-select  v-model="formInline"  placeholder="请选择启用状态">
                <el-option label="审核通过" value="tongguo"></el-option>
                <el-option label="禁用" value="jinyong"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
            </el-form-item>
            </el-form>
        </div>

        <el-table border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column  label="序号">
            </el-table-column>
            <el-table-column  label="姓名">
            </el-table-column>
            <el-table-column  label="账号" >
            </el-table-column>
            <el-table-column  label="电话" >
            </el-table-column>
             <el-table-column  label="公司名称" >
            </el-table-column>
            <el-table-column  label="创建时间" >
            </el-table-column>
            <el-table-column  label="启用状态" >
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination>
                    <!-- @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="1000" -->
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
  data() {
      return {
          tableData: [],
          cur_page: 1,
          multipleSelection: [],
          select_cate: '',
          select_word: '',
          del_list: [],
          is_search: false,
          formInline:''
      }
  },
  created(){
    //   this.getData();
  },
  computed: {
    //   data(){
    //       const self = this;
    //       return self.tableData.filter(function(d){
    //           let is_del = false;
    //           for (let i = 0; i < self.del_list.length; i++) {
    //               if(d.name === self.del_list[i].name){
    //                   is_del = true;
    //                   break;
    //               }
    //           }
    //           if(!is_del){
    //               if(d.address.indexOf(self.select_cate) > -1 &&
    //                   (d.name.indexOf(self.select_word) > -1 ||
    //                   d.address.indexOf(self.select_word) > -1)
    //               ){
    //                   return d;
    //               }
    //           }
    //       })
    //   }
  },
  methods: {
      add(){
          this.$router.push({ path: '/userAdd' });
      },
      edit(e){
          console.log(e);
          this.$router.push({ path: '/userEdit' });

      },
    //   handleCurrentChange(val){
    //       this.cur_page = val;
    //       this.getData();
    //   },
    //   getData(){
    //       let self = this;
    //       if(process.env.NODE_ENV === 'development'){
    //           self.url = '/ms/table/list';
    //       };
    //       self.$axios.post(self.url, {page:self.cur_page}).then((res) => {
    //           self.tableData = res.data.list;
    //       })
    //   },
    //   search(){
    //       this.is_search = true;
    //   },
    //   formatter(row, column) {
    //       return row.address;
    //   },
    //   filterTag(value, row) {
    //       return row.tag === value;
    //   },
    //   handleEdit(index, row) {
    //       this.$message('编辑第'+(index+1)+'行');
    //   },
    //   handleDelete(index, row) {
    //       this.$message.error('删除第'+(index+1)+'行');
    //   },
    //   delAll(){
    //       const self = this,
    //           length = self.multipleSelection.length;
    //       let str = '';
    //       self.del_list = self.del_list.concat(self.multipleSelection);
    //       for (let i = 0; i < length; i++) {
    //           str += self.multipleSelection[i].name + ' ';
    //       }
    //       self.$message.error('删除了'+str);
    //       self.multipleSelection = [];
    //   },
      handleSelectionChange(val) {
        //   this.multipleSelection = val;
        console.log(3);
      }
  }
};
</script>

<style scoped>
.divBut{
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
</style>