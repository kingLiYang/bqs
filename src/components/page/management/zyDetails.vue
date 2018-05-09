<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> 位置:</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="table">


            <div class="crumbs" style="background: #f0f0f0;padding: 5px 0px;" >
                <el-row :gutter="12">
                    <el-col :span="22"><div class="grid-content bg-purple" style="margin:5px 0px 0px 10px;">运单信息</div></el-col>

                </el-row>
            </div>
            <div class="divBut">
                <el-row type="flex" class="row-bg" justify="space-around" style="margin:40px 0px;">
                    <el-col :span="6"><div class="grid-content bg-purple">订单号:</div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple-light">运单号:</div></el-col>
                    <el-col :span="6"><div class="grid-content bg-purple"></div>同城单号:</el-col>
                </el-row>
            </div>

            <table border= "1" width= "100% " cellpadding="0" cellspacing="0" style="border:1px solid #666;"  >

                <tr>
                    <td width= "3% "rowspan="4" style="background: #50bfff"> 备箱　 </td>
                    <td width= "8% " class="gray">站点人员 </td>
                    <td width= "10% ">zd200 </td>
                    <td width= "8% "  class="gray"> 站点人员姓名</td>
                    <td width= "10% "> 李 </td>
                    <td width= "8% "  class="gray"> 站点人员电话 </td>
                    <td width= "10% "> 889897645566 </td>
                </tr>
                <tr>

                    <td width= "8% "  class="gray"> 所在城市 </td>
                    <td width= "10% "> 长春 </td>
                    <td width= "8% "  class="gray"> 转运中心ID </td>
                    <td width= "10% "> JSHDL</td>
                    <td width= "8% "  class="gray"> 要求备箱时间</td>
                    <td width= "10% "> 2018年</td>
                </tr>
                <tr>

                    <td width= "8% "  class="gray">备箱地址</td>
                    <td width= "10% "> 北京</td>
                    <td width= "8% "  class="gray"> 使用包材</td>
                    <td width= "10% "> 10l </td>
                    <td width= "8% "  class="gray"> 状态 </td>
                    <td width= "10% "> 是</td>
                </tr>

            </table>

            <table border= "1" width= "100% " cellpadding="0" cellspacing="0" style="border:1px solid #666;"  >

                <tr>
                    <td width= "3% "rowspan="4" style="background: #50bfff"> 接货　 </td>
                    <td width= "8% " class="gray">站点人员 </td>
                    <td width= "10% ">zd200 </td>
                    <td width= "8% "  class="gray"> 站点人员姓名</td>
                    <td width= "10% "> 李 </td>
                    <td width= "8% "  class="gray"> 站点人员电话 </td>
                    <td width= "10% "> 889897645566 </td>
                </tr>
                <tr>

                    <td width= "8% "  class="gray"> 所在城市 </td>
                    <td width= "10% "> 长春 </td>
                    <td width= "8% "  class="gray"> 转运中心ID </td>
                    <td width= "10% "> JSHDL</td>
                    <td width= "8% "  class="gray"> 要求备箱时间</td>
                    <td width= "10% "> 2018年</td>
                </tr>
                <tr>

                    <td width= "8% "  class="gray">备箱地址</td>
                    <td width= "10% "> 北京</td>
                    <td width= "8% "  class="gray"> 使用包材</td>
                    <td width= "10% "> 10l </td>
                    <td width= "8% "  class="gray"> 状态 </td>
                    <td width= "10% "> 是</td>
                </tr>

            </table>
            <table border= "1" width= "100% " cellpadding="0" cellspacing="0" style="border:1px solid #666;"  >

                <tr>
                    <td width= "3% "rowspan="4" style="background: #50bfff"> 送货　 </td>
                    <td width= "8% " class="gray">站点人员 </td>
                    <td width= "10% ">zd200 </td>
                    <td width= "8% "  class="gray"> 站点人员姓名</td>
                    <td width= "10% "> 李 </td>
                    <td width= "8% "  class="gray"> 站点人员电话 </td>
                    <td width= "10% "> 889897645566 </td>
                </tr>
                <tr>

                    <td width= "8% "  class="gray"> 所在城市 </td>
                    <td width= "10% "> 长春 </td>
                    <td width= "8% "  class="gray"> 转运中心ID </td>
                    <td width= "10% "> JSHDL</td>
                    <td width= "8% "  class="gray"> 要求备箱时间</td>
                    <td width= "10% "> 2018年</td>
                </tr>
                <tr>

                    <td width= "8% "  class="gray">备箱地址</td>
                    <td width= "10% "> 北京</td>
                    <td width= "8% "  class="gray"> 使用包材</td>
                    <td width= "10% "> 10l </td>
                    <td width= "8% "  class="gray"> 状态 </td>
                    <td width= "10% "> 是</td>
                </tr>

            </table>

            <table border= "1" width= "100% " cellpadding="0" cellspacing="0" style="border:1px solid #666;"  >

                <tr>
                    <td width= "3% "rowspan="4" style="background: #50bfff"> 收箱　 </td>
                    <td width= "8% " class="gray">站点人员 </td>
                    <td width= "10% ">zd200 </td>
                    <td width= "8% "  class="gray"> 站点人员姓名</td>
                    <td width= "10% "> 李 </td>
                    <td width= "8% "  class="gray"> 站点人员电话 </td>
                    <td width= "10% "> 889897645566 </td>
                </tr>
                <tr>

                    <td width= "8% "  class="gray"> 所在城市 </td>
                    <td width= "10% "> 长春 </td>
                    <td width= "8% "  class="gray"> 转运中心ID </td>
                    <td width= "10% "> JSHDL</td>
                    <td width= "8% "  class="gray"> 要求备箱时间</td>
                    <td width= "10% "> 2018年</td>
                </tr>
                <tr>

                    <td width= "8% "  class="gray">备箱地址</td>
                    <td width= "10% "> 北京</td>
                    <td width= "8% "  class="gray"> 使用包材</td>
                    <td width= "10% "> 10l </td>
                    <td width= "8% "  class="gray"> 状态 </td>
                    <td width= "10% "> 是</td>
                </tr>

            </table>








        </div>

    </div>
</template>



<script type="text/javascript">
    window.onload = function(){
        var tab = document.getElementById("tab");
        var maxCol = 6, val, count, start;

        for(var col = maxCol-1; col >= 0 ; col--){
            count = 1;
            val = "";
            for(var i=0; i<tab.rows.length; i++){
                if(val == tab.rows[i].cells[col].innerHTML){
                    count++;
                }else{
                    if(count > 1){ //合并
                        start = i - count;
                        tab.rows[start].cells[col].rowSpan = count;
                        for(var j=start+1; j<i; j++){
                            tab.rows[j].cells[col].style.display = "none";
                        }
                        count = 1;
                    }
                    val = tab.rows[i].cells[col].innerHTML;
                }
            }
            if(count > 1 ){ //合并，最后几行相同的情况下
                start = i - count;
                tab.rows[start].cells[col].rowSpan = count;
                for(var j=start+1; j<i; j++){
                    tab.rows[j].cells[col].style.display = "none";
                }
            }
        }
    };

</script>
<style>
    td{
        text-align: center;
        padding: 15px 0px;
    }
    td.gray{
        background: #f0f0f0;
    }
</style>
