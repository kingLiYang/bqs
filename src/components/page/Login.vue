<template>
   <el-form :rules="rules2" label-position="left" label-width="0px" class="demo-ruleForm card-box loginform">
    <h3 class="title">冰骑士后台</h3>
    <el-form-item>
      <el-input type="text" auto-complete="off" placeholder="账号" v-model="account"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" auto-complete="off" placeholder="密码" v-model="checkPass"></el-input>
    </el-form-item>
<el-form-item style="width:100%;">
<el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2"  @keyup.enter="handleSubmit2" :loading="logining">登录</el-button>
</el-form-item>
</el-form>
</template>

<script>
export default {
  data() {
    return {
      logining: false,
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
      // var _this = this;
      // alert(this.checkPass);
      this.$router.push({ path: '/readme' });
    //  this.$message({
    //       message: '恭喜你，这是一条成功消息',
    //       type: 'success'
    //     });
    // this.$axios({
    //     method:'post',
    //     url:'',
    //     data:{}
    // }).then((res)=>{
    //     console.log(res);
    // }).catch((err)=>{
    //     console.log(err);
    // })





      // this.$refs.ruleForm2.validate((valid) => {
      // console.log(valid);
      //   if (valid) {
      //_this.$router.replace('/table');
      // this.logining = true;
      // NProgress.start();
      // var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };

      // requestLogin(loginParams).then(data => {
      //   this.logining = false;
      //   NProgress.done();
      //   let { msg, code, user } = data;
      //   if (code !== 200) {
      //     this.$notify({
      //       title: '错误',
      //       message: msg,
      //       type: 'error'
      //     });
      //   } else {
      //     localStorage.setItem('user', JSON.stringify(user));
      //     if (this.$route.query.redirect) {
      //       this.$router.push({ path: this.$route.query.redirect });
      //     } else {
      //       this.$router.push({ path: '/table' });
      //     }
      //   }
      // });
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
    }
  }
};
</script>

<style scoped>
.card-box {
  padding: 20px;
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
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
}
/* .login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 160px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
} */
</style>