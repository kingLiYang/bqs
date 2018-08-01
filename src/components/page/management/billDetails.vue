<template>
    <div>
<el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item title="TMS订单信息" name="0">
      <table v-model="TMSorder">
          <tr>
            <td class='table_td'>TMS订单号</td>
            <td>{{TMSorder.tms_order_code}}</td>
            <td class='table_td'>TMS运单号</td>
            <td>{{TMSorder.tms_way_code}}</td>
            <td class='table_td'>设备号</td>
            <td>{{TMSorder.device_code}}</td>
          </tr>
          <tr>
            <td class='table_td'>发货人</td>
            <td>{{TMSorder.tms_get_goods_man}}</td>
            <td class='table_td'>发货人电话</td>
            <td>{{TMSorder.tms_get_goods_phone}}</td>
            <td class='table_td'>发货时间</td>
            <td>{{TMSorder.tms_get_goods_plan_time}}</td>
          </tr>
          <tr>
            <td class='table_td'>收货人</td>
            <td>{{TMSorder.tms_send_goods_man}}</td>
            <td class='table_td'>收货人电话</td>
            <td>{{TMSorder.tms_send_goods_phone}}</td>
            <td class='table_td'>时限</td>
            <td>{{TMSorder.plan_time}}</td>
          </tr>
          <tr>
            <td class='table_td'>发货人地址</td>
            <td>{{TMSorder.tms_get_goods_address}}</td>
            <td>{{TMSorder.tms_get_goods_company}}</td>
            <td class='table_td'>收货人地址</td>
            <td>{{TMSorder.tms_send_goods_address}}</td>
            <td>{{TMSorder.tms_send_goods_company}}</td>
          </tr>
      </table>
  </el-collapse-item>
  <el-collapse-item title="订单信息" name="1">
      <table v-model="order">
          <tr>
            <td class='table_td'>订单号</td>
            <td>{{order.order_code}}</td>
            <td class='table_td'>订单状态</td>
            <td>{{order.status}}</td>
            <td class='table_td'>订单类型</td>
            <td>{{order.order_type}}</td>
          </tr>
          <tr>
            
            <td class='table_td'>订单添加时间</td>
            <td>{{order.add_time | formatDate}}</td>
            <td class='table_td'>骑士姓名</td>
            <td>{{order.relly_name}}</td>
            <td class='table_td'>骑士电话</td>
            <td>{{order.phone}}</td>
          </tr>
          <tr>
            
            <td class='table_td'>骑士所属站点</td>
            <td>{{order.knight_company}}</td>
            <td class='table_td'>导出类型</td>
            <td>{{order.export_type}}</td>
          </tr>
      </table>
  </el-collapse-item>
  <el-collapse-item title="取箱信息" name="2" v-if='isShow1'>
    <table v-model='getbox'>
          <tr>
            <td class='table_td'>姓名</td>
            <td>{{getbox.get_box_man}}</td>
            <td class='table_td'>电话</td>
            <td>{{getbox.get_box_phone}}</td>
            <td class='table_td'>地址</td>
            <td>{{getbox.get_box_address}}</td>
          </tr>
          <tr>
            <td class='table_td'>规定时间</td>
            <td>{{getbox.get_box_plan_time | formatDate}}</td>
            <td class='table_td'>到达时间</td>
            <td>{{getbox.get_box_now_time | formatDate}}</td>
          </tr>
      </table>
      <div class='isPhoto'>
          <div>照片：</div>
          <div v-for='(item,index) in getbox.get_box_img' :key="index">
              <img :src="item" alt="" @click='isHover($event)'>
          </div>
         <div v-if='Number(getbox.get_box_img.length) == 0' >暂无照片</div>
      </div>
  </el-collapse-item>
  <el-collapse-item title="取货信息" name="3" v-if='isShow2'>
    <table v-model='getgoods'>
          <tr>
            <td class='table_td'>姓名</td>
            <td>{{getgoods.get_goods_man}}</td>
            <td class='table_td'>电话</td>
            <td>{{getgoods.get_goods_phone}}</td>
            <td class='table_td'>地址</td>
            <td>{{getgoods.get_goods_address}}</td>
          </tr>
          <tr>
            <td class='table_td'>规定时间</td>
            <td>{{getgoods.get_goods_plan_time | formatDate}}</td>
            <td class='table_td'>到达时间</td>
            <td>{{getgoods.get_goods_now_time | formatDate}}</td>
          </tr>
      </table>
      <div class='isPhoto'>
          <div>照片：</div>
          <div v-for='(item,index) in getgoods.get_goods_img' :key="index">
              <img :src="item" alt="" @click='isHover($event)'>
          </div>
          <div v-if='Number(getgoods.get_goods_img.length) == 0'>暂无照片</div>
      </div>
  </el-collapse-item>
  <el-collapse-item title="送货信息" name="4" v-if='isShow3'>
    <table v-model='sendgoods'>
          <tr>
            <td class='table_td'>姓名</td>
            <td>{{sendgoods.send_goods_man}}</td>
            <td class='table_td'>电话</td>
            <td>{{sendgoods.send_goods_phone}}</td>
            <td class='table_td'>地址</td>
            <td>{{sendgoods.send_goods_address}}</td>
          </tr>
          <tr>
            <td class='table_td'>规定时间</td>
            <td>{{sendgoods.send_goods_plan_time | formatDate}}</td>
            <td class='table_td'>到达时间</td>
            <td>{{sendgoods.send_goods_now_time | formatDate}}</td>
          </tr>
      </table>
      <div class='isPhoto'>
          <div>照片：</div>
          <div v-for='(item,index) in sendgoods.send_goods_img' :key="index">
              <img :src="item" alt="" @click='isHover($event)'>
          </div>
          <div v-if='Number(sendgoods.send_goods_img.length) == 0'>暂无照片</div>
      </div>
  </el-collapse-item>
  <el-collapse-item title="返箱信息" name="5" v-if='isShow4'>
    <table v-model = 'sendbox'>
          <tr>
            <td class='table_td'>姓名</td>
            <td>{{sendbox.send_box_man}}</td>
            <td class='table_td'>电话</td>
            <td>{{sendbox.send_box_phone}}</td>
            <td class='table_td'>地址</td>
            <td>{{sendbox.send_box_address}}</td>
          </tr>
          <tr>
            <td class='table_td'>规定时间</td>
            <td>{{sendbox.send_box_plan_time | formatDate}}</td>
            <td class='table_td'>到达时间</td>
            <td>{{sendbox.send_box_now_time | formatDate}}</td>
          </tr>
      </table>
      <div class='isPhoto'>
          <div>照片：</div>
          <div v-for='(item,index) in sendbox.send_box_img' :key="index">
              <img :src="item" alt="" @click='isHover($event)'>
          </div>
          <div v-if='Number(sendbox.send_box_img.length) == 0'>暂无照片</div>
      </div>
  </el-collapse-item>

  <el-collapse-item title="货物信息" name="43">
      <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="temperature_interval"
                label="温度区间">
              </el-table-column>
              <el-table-column
                prop="box_type"
                label="箱型">
              </el-table-column>
              <el-table-column
                prop="box_num"
                label="数量">
              </el-table-column>
            </el-table>
  </el-collapse-item>
</el-collapse>
        <div slot="footer" class="dialog-footer" style='margin: 20px 0 0 0;'>
            <el-button type="primary" @click="editOrder()">返回</el-button>
        </div>

      <!-- 图片弹框 -->
        <el-dialog
          title=""
          :visible.sync="centerDialogVisible"
          size='large'
          center>
          <div style='display:flex;justify-content: center;cursor:pointer;'>
            <img src="../../../../static/img/tran.png"  @click="changeImg()">
          </div>
          <div style='display:flex;justify-content: center;'>
            <img :src="isSrc" alt="" style='width:1000px;height:1000px;' :class='{imgRotate: isClass, imgRotate1 : isClass1,imgRotate2: isClass2,imgRotate3: isClass3,imgRotate4: isClass4}'>
          </div>
        </el-dialog>

    </div>
</template>

<script>
import { formatDate } from "./../../../js/data";
export default {
  data() {
    return {
      activeNames: ["1", "0"],
      tableData:[],
      isShow1: false,
      isShow2: false,
      isShow3: false,
      isShow4: false,
      centerDialogVisible:false,
      isClass:true,
      isClass1:false,
      isClass2:false,
      isClass3:false,
      isClass4:false,
      isSrc:"",
      TMSorder: {
        tms_order_code:"",
        tms_way_code:"",
        device_code:"",
        tms_get_goods_man:"",
        tms_get_goods_phone:"",
        tms_get_goods_plan_time:"",
        tms_send_goods_man:"",
        tms_send_goods_phone:"",
        tms_get_goods_address:"",
        tms_send_goods_address:"",
        tms_send_goods_company:"",
        tms_get_goods_company:"",
        plan_time:""
      },
      order:{
          
          order_code:"",
          add_time:"",
          order_type:"",
          status:"",
          relly_name:"",
          phone:"",
          knight_company:"",
          export_type:""
      },
      getbox:{
          get_box_man:"",
          get_box_phone:"",
          get_box_address:"",
          get_box_plan_time:"",
          get_box_now_time:"",
          get_box_img:[]
      },
      getgoods:{
          get_goods_man:"",
          get_goods_phone:"",
          get_goods_address:"",
          get_goods_plan_time:"",
          get_goods_now_time:"",
          get_goods_img:[]
      },
      sendgoods:{
          send_goods_man:"",
          send_goods_phone:"",
          send_goods_address:"",
          send_goods_plan_time:"",
          send_goods_now_time:"",
          send_goods_img:[]
      },
      sendbox:{
          send_box_man:"",
          send_box_phone:"",
          send_box_address:"",
          send_box_plan_time:"",
          send_box_now_time:"",
          send_box_img:[]
      }

    };
  },

  created() {
    
    let data = JSON.parse(window.localStorage.getItem('data'));
    if(data == ''|| data == null){
      this.$router.push('/');
    }
       // 1 揽派 2 揽件 3 派件 4 转运 
    switch (data.data.order_type){
          case '1':
          this.isShow1 = true;
          this.isShow2 = true;
          this.isShow3 = true;
          this.isShow4 = true;
          this.order.order_type =  '揽派';
          break;
          case '2':
          this.isShow1 = true;
          this.isShow2 = true;
          this.isShow3 = true;
          this.isShow4 = false;
          this.order.order_type =  '揽件';
          break;
          case '3':
          this.isShow1 = false;
          this.isShow2 = true;
          this.isShow3 = true;
          this.isShow4 = true;
          this.order.order_type =  '派件';
          break;
          case '4':
          this.isShow1 = false;
          this.isShow2 = true;
          this.isShow3 = true;
          this.isShow4 = false;
          this.order.order_type =  '转运';
          break;

        }

    this.tableData = data.data.goods;
    // 订单信息
    this.TMSorder.tms_order_code = data.data.tms_order_code;
    this.TMSorder.tms_way_code = data.data.tms_way_code;
    this.TMSorder.device_code = data.data.device_code;
    this.TMSorder.tms_get_goods_man = data.data.tms_get_goods_man;

    this.TMSorder.tms_get_goods_phone = data.data.tms_get_goods_phone;
    this.TMSorder.tms_get_goods_plan_time = data.data.tms_get_goods_plan_time;

    this.TMSorder.tms_send_goods_man = data.data.tms_send_goods_man;
    this.TMSorder.tms_send_goods_phone = data.data.tms_send_goods_phone;

    this.TMSorder.tms_get_goods_address = data.data.tms_get_goods_address;
    this.TMSorder.tms_send_goods_address = data.data.tms_send_goods_address;

    this.TMSorder.tms_get_goods_company = data.data.tms_get_goods_company;
    this.TMSorder.tms_send_goods_company = data.data.tms_send_goods_company;
    this.TMSorder.plan_time = data.data.plan_time;

    switch (data.data.export_type){
      case '1':
      this.order.export_type = '现场导出';
      break;
      case '2':
      this.order.export_type = '不需要导出';
      break;
      case '3':
      this.order.export_type = '客服导出';
      break;
    }

    this.order.order_code = data.data.order_code;
    this.order.add_time = data.data.add_time;
    // 0 未接单 1 已接单 2 已取箱 3 已取货 4 已签收 5 已返箱 6 已拒单 7 已完成 
    switch (data.data.status){
          case '0':
           this.order.status =  '未接单';
          break;
          case '1':
          this.order.status = '已接单';
          break;
          case '2':
          this.order.status = '已取箱';
          break;
          case '3':
          this.order.status = '已取货';
          break;
          case '4':
          this.order.status = '已签收';
          break;
          case '5':
          this.order.status = '已返箱';
          break;
          case '6':
          this.order.status = '已拒单';
          break;
          case '7':
          this.order.status = '已完成';
          break;

        }
    this.order.relly_name = data.data.relly_name;
    this.order.phone = data.data.phone;
    this.order.knight_company = data.data.knight_company;
    // 取箱信息
    this.getbox.get_box_man = data.data.get_box_man;
    this.getbox.get_box_phone = data.data.get_box_phone;
    this.getbox.get_box_address = data.data.get_box_address;
    this.getbox.get_box_plan_time = data.data.get_box_plan_time;
    this.getbox.get_box_now_time = data.data.get_box_now_time;
    this.getbox.get_box_img = data.data.get_box_img || [];

    // 取货信息
    this.getgoods.get_goods_man = data.data.get_goods_man;
    this.getgoods.get_goods_phone = data.data.get_goods_phone;
    this.getgoods.get_goods_address = data.data.get_goods_address;
    this.getgoods.get_goods_plan_time = data.data.get_goods_plan_time;
    this.getgoods.get_goods_now_time = data.data.get_goods_now_time;
    this.getgoods.get_goods_img = data.data.get_goods_img || [];

    // 送货信息
    this.sendgoods.send_goods_man = data.data.send_goods_man;
    this.sendgoods.send_goods_phone = data.data.send_goods_phone;
    this.sendgoods.send_goods_address = data.data.send_goods_address;
    this.sendgoods.send_goods_plan_time = data.data.send_goods_plan_time;
    this.sendgoods.send_goods_now_time = data.data.send_goods_now_time;
    this.sendgoods.send_goods_img = data.data.send_goods_img || [];
    // 返箱 信息
    this.sendbox.send_box_man = data.data.send_box_man;
    this.sendbox.send_box_phone = data.data.send_box_phone;
    this.sendbox.send_box_address = data.data.send_box_address;
    this.sendbox.send_box_plan_time = data.data.send_box_plan_time;
    this.sendbox.send_box_now_time = data.data.send_box_now_time;
    this.sendbox.send_box_img = data.data.send_box_img || [];
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    editOrder(){
        this.$router.push("/waybill");
    },
    isHover(e){
        // console.log(e.currentTarget);
        this.isSrc = e.currentTarget.getAttribute("src");
        this.isClass = true;
        this.isClass1 = false;
        this.isClass2 = false;
        this.isClass3 = false;
        this.isClass4 = false;
        this.centerDialogVisible = true;

    },
    changeImg(){
      // 点击 改变图片显示方向
      // this.isClass1 = true;
      if(this.isClass == true){
        this.isClass = false;
        this.isClass1 = true;
      }else if(this.isClass1 == true){
        this.isClass1 = false;
        this.isClass2 = true;
      }else if(this.isClass2 == true){
        this.isClass2 = false;
        this.isClass3 = true;
      }else if(this.isClass3 == true){
        this.isClass3 = false;
        this.isClass4 = true;
      }else if(this.isClass4 == true){
        this.isClass4 = false;
        this.isClass1 = true;
      }
    }

  },
  filters: {
    formatDate(time) {
      if(time == null || time == '' || time == '0'){
            return '';
        }else{
            var date = new Date(time * 1000);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }
    }
  }
};
</script>

<style scoped>
td,
th {
  border: solid #ccc;
  border-width: 0px 1px 1px 0px;
  padding: 10px 0px;
  text-align: center;
}

table {
  border: solid #ccc;
  border-width: 1px 0px 0px 1px;
  border-collapse: collapse;
  width: 100%;
}
.table_td {
  background-color: #eff4f6;
  }  
.isPhoto{
    margin: 10px 0 0 0;
    display: flex;
    justify-content: flex-start;
    position: relative;
    
}
.isPhoto img{
    width:100px;
    height:100px;
    margin: 0 100px  0 0;
}
.imgRotate{
  transform: rotate(0deg);
}
.imgRotate1{
  transform: rotate(90deg);
}
.imgRotate2{
  transform: rotate(180deg);
}
.imgRotate3{
  transform: rotate(270deg);
}
.imgRotate4{
  transform: rotate(360deg);
}
</style>