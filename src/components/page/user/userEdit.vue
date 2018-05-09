
<template>
    <div>
      <p style="padding:0 0 10px 0;">基础信息</p>
       <el-form :model="form" label-width="80px" :inline="true">
         <el-row >
            <el-form-item label="登录账号">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="登录密码">
              <el-input></el-input>
            </el-form-item> 
          </el-row>
          <el-row>
            <el-form-item label="真实姓名">
               <el-input></el-input>
            </el-form-item> 
            <el-form-item label="联系电话">
               <el-input></el-input>
            </el-form-item> 
          </el-row>
          <el-row>
            <el-form-item label="公司">
              <el-select v-model="region" placeholder="请选择公司">
                <el-option :label="item.name" :value="item.pid" v-for="(item,index) in options"></el-option>
              </el-select>
            </el-form-item> 
          </el-row>
        </el-form>
        <div class="divBut">
            <el-row>
                <el-button type="primary" round>提交</el-button>
                <el-button type="primary" round @click="returnUser()">返回</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      region: "",
      form:'',
      options:[]// 刚进来的时候  获取的城市
    };
  },
  created() {
    let that = this;
    this.$axios({
      url: "api/bqs/backend/web/index.php/company/company",
      method: "post",
      data: { level: 3 },
      transformRequest: [
        function(data) {
          let ret = "";
          for (let it in data) {
            ret +=
              encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
          }
          return ret;
        }
      ],
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }).then(function(res) {
      that.options = res.data.data;
    });
  },
  methods:{
    returnUser(){
      this.$router.push({ path: '/basetable' });
    }
  }
};
</script>

<style scoped>

</style>