<template>
    <div>
      <el-form>
      <el-button class="submit-btn fr" type="primary" @click="openbiaozhun (formSer) ">差旅费补贴标准</el-button>
</el-form>

      <!-- 弹框  start -->
       <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <el-form >
            <el-form-item label="用户姓名">
            <el-input auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" >确 定</el-button>
        </div>
        </el-dialog>
        <!-- 弹框 end   -->
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      dialogFormVisible: false
    };
  },
  created() {},
  methods: {
    openbiaozhun(formSer) {
      this.dialogFormVisible = true;
    }
  }
};
</script>

<style scoped>

</style>