<template>
    <div>
         <div class="divBut">
            <el-row>
                <el-button type="primary" round>添加</el-button>
            </el-row>
        </div>

        <!-- 表格 -->
         <table style="width:100%;border:1px solid #ccc;margin:10px 0 0 0;">
          <thead>
            <th>序号</th>
            <th>权限名</th>
            <th>权限</th>
            <th>是否为菜单</th>
            <th style="width:255px;">操作</th>
          </thead>
          <tbody>
            <template v-for="(item,index) in options">
                <template v-if="item.son">
                    <tr>
                        <td>{{index+1}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.controller}}/{{item.action}}</td>
                        <td v-if="item.type==1">是</td>
                        <td v-if="item.type==0">否</td>
                        <td>
                            <el-button type="primary" size="small" round>添加子权限</el-button>
                            <el-button type="primary" size="small" round>添加</el-button>
                            <el-button type="primary" size="small" round>删除</el-button>
                        </td>
                    </tr>
                    <template v-for="(ite,inde) in item.son">
                        <template v-if="ite.son">
                            <tr>
                                <td>{{inde+1+index+1}}</td>
                                <td>Ⅱ&nbsp;&nbsp; {{ite.name}}</td>
                                <td>{{ite.controller}}/{{ite.action}}</td>
                                <td v-if="ite.type==1">是</td>
                                <td v-if="ite.type==0">否</td>
                                <td>
                                    <el-button type="primary" size="small" round>添加子权限</el-button>
                                    <el-button type="primary" size="small" round>添加</el-button>
                                    <el-button type="primary" size="small" round>删除</el-button>
                                </td>
                            </tr>
                            <tr v-for="(item,ind) in ite.son">
                                <td>{{inde+1+index+1+ind+1}}</td>
                                <td>Ⅲ&nbsp;&nbsp; {{item.name}}</td>
                                <td>{{item.controller}}/{{item.action}}</td>
                                <td v-if="item.type==1">是</td>
                                <td v-if="item.type==0">否</td>
                                <td>
                                    <el-button type="primary" size="small" round>添加子权限</el-button>
                                    <el-button type="primary" size="small" round>添加</el-button>
                                    <el-button type="primary" size="small" round>删除</el-button>
                                </td>
                            </tr>
                        </template>
                        
                    </template>
                    
                </template>
            </template>    
          </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: '',
                options:[]
            }
        },
        created(){
                let that = this;
                this.$axios({
                url: "api/bqs/backend/web/index.php/oauth/list",
                method: "get",
                data: {},
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
                    that.options = res.data.data.data;
                });
        }
    }
</script>
<style scoped>
td,th{border:solid #ccc; border-width:0px 1px 1px 0px; padding:10px 0px;text-align: center;}
table{border:solid #ccc; border-width:1px 0px 0px 1px;border-collapse: collapse;}
</style>
