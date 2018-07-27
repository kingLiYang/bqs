<template>
<div class="sky">
	<div class="clouds_one"></div>
	<div class="clouds_two"></div>
	<div class="clouds_three"></div>
   <el-form :rules="rules2" label-position="left" label-width="0px" class="demo-ruleForm card-box loginform">
    <h3 class="title">冰骑士后台</h3>
    <el-form-item>
      <el-input type="text" auto-complete="off" placeholder="账号" v-model="account"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" auto-complete="off" placeholder="密码" v-model="checkPass"  @keyup.enter.native="handleSubmit2"></el-input>
    </el-form-item>
<el-form-item style="width:100%;">
<el-button type="primary" style="width:100%;" @click.native="handleSubmit2" :loading="logining">登录</el-button>
</el-form-item> 
 </el-form>
</div>

</template>

<script>
export default {
  data() {
    return {
      logining: false,
      show: true,
      account: "",
      checkPass: "",
      rules2: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit2(ev) {
      let that = this;
      this.$axios({
        url: this.URL_API+"/bqs/backend/web/index.php/login/login",
        method: "post",
        data: {
          username: this.account,
          pwd:this.checkPass
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
          window.sessionStorage.setItem('username',that.account);
          window.sessionStorage.setItem('token',res.data.data.token);
          window.sessionStorage.setItem('items',JSON.stringify(res.data.data.menu));
          that.$router.push({path:'/home'});

        }else{
          that.$message(res.data.message);
        }
      });

    }
  }
};
</script>

<style lang="css" scoped>
@import "../../css/style.css";
.card-box {
  padding: 20px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin-bottom: 20px;
  background-color: #f9fafc;
  margin: 180px auto;
  width: 400px;
  border: 2px solid #8492a6;

}

.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.loginform {
  width: 350px;
  padding: 35px 35px 15px 35px;
  position: absolute;
  left:50%;
  margin-left: -175px;
}

</style>