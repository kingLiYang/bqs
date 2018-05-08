<template>
    <div>
       <el-form ref="form" :model="form" label-width="80px">

  <el-form-item label="公司">
    <el-select v-model="form.region" placeholder="请选择公司">
      <!-- <el-option label="区域一" value="shanghai"></el-option> -->
      <!-- <el-option label="区域二" value="beijing"></el-option> -->
    </el-select>
  </el-form-item>
  
</el-form>
    </div>
</template>

<script>
export default {
  data: function() {
    return {};
  },
  created() {
    this.$axios({
      method: "post",
      url: "http://www.index.com/bqs/backend/web/index.php/company/company",
      data: { levle: 3 }
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>

</style>