<template>
    <div class="header">
        <div class="logo">后台管理系统</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: ''
            }
        },
        computed:{
            username(){
                let username = sessionStorage.getItem('username');
                return username ? username : this.name;
            }
        },
        methods:{
            handleCommand(command) {
                if(command == 'loginout'){
                    // 退出
                    let that = this;
                    this.$axios({
                        url: this.URL_API+"/bqs/backend/web/index.php/login/out",
                        method: "post",
                        data: {
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
                            sessionStorage.removeItem('username')
                            that.$router.push('/login');

                        }
                    });
                    
                }
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
