<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> 位置:</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="table">

            <div class="divBut">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item label="订单号">
                        <el-input placeholder="请输入订单号"></el-input>
                    </el-form-item>
                    <el-form-item label="运单号">
                        <el-input placeholder="请输入运单号"></el-input>
                    </el-form-item>
                    <el-form-item label="同城单号">
                        <el-input placeholder="请输入同城单号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="crumbs" style="background: #cccccc;padding: 5px 0px;" >
                <el-row :gutter="12">
                    <el-col :span="22"><div class="grid-content bg-purple" style="margin:5px 0px 0px 10px;">查询结果</div></el-col>
                    <el-col :span="2"><el-button type="primary" round @click="add()">导出</el-button></el-col>

                </el-row>
            </div>
            <el-table :data="data" border style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column  label="序号">
                </el-table-column>
                <el-table-column  label="订单号">
                </el-table-column>
                <el-table-column  label="同城单号" >
                </el-table-column>
                <el-table-column  label="备箱" >
                </el-table-column>
                <el-table-column  label="接货" >
                </el-table-column>
                <el-table-column  label="送货" >
                </el-table-column>
                <el-table-column  label="收箱" >
                </el-table-column>
                <el-table-column  label="具体信息" >
                </el-table-column>

            </el-table>
            <div class="pagination">
                <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
            </div>
        </div>




    </div>
</template>
<style>

</style>
<script>
    export default {
        data: function(){
            return {

            }
        },
        methods: {

        }
    }
</script>
