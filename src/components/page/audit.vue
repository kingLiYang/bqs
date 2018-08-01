<template>
    <div>
<el-collapse v-model="activeNames" @change="handleChange">
    <el-collapse-item title="个人信息" name="0">
      <table v-model="TMSorder">
          <tr>
            <td>姓名</td>
            <td>{{TMSorder.name}}</td>
            <td>联系电话</td>
            <td>{{TMSorder.phone}}</td>
            <td>身份证号码</td>
            <td>{{TMSorder.card}}</td>
          </tr>
          <tr>
            <td>所属城市</td>
            <td>{{TMSorder.city}}</td>
            <td>详细地址</td>
            <td>{{TMSorder.adress}}</td>
            <td>紧急联系人</td>
            <td>{{TMSorder.name1}}</td>
          </tr>
          <tr>
            <td>紧急联系人电话</td>
            <td>{{TMSorder.phone1}}</td>
          </tr>
      </table>
  </el-collapse-item>
  <el-collapse-item title="车辆信息" name="1">
      <table v-model="order">
          <tr>
            <td>车辆颜色</td>
            <td>{{order.corlor}}</td>
            <td>车牌号码</td>
            <td>{{order.num}}</td>
            <td>车辆类型</td>
            <td>{{order.type}}</td>
          </tr>
          <tr>
            <td>车身长宽高</td>
            <td>{{order.tiji}}米</td>
            <td>第三方责任险</td>
            <td>{{order.insure}}</td>
          </tr>
      </table>
  </el-collapse-item>
  <el-collapse-item title="照片信息" name="43">
      <div class="bigDiv">

        <div class="man_id">
            <span>身份证正面</span>
            <div class='isPhoto'>
            <img :src="card1" alt="">
            </div>
        </div>
        <div class="man_id">
            <span>身份证反面</span>
            <div class='isPhoto'>
            <img :src="noCard" alt="">

            </div>
        </div>
        <div class="man_id">
            <span>驾驶证</span>
            <div class='isPhoto'>
            <img :src="dricing" alt="">

            </div>
        </div>
        <div class="man_id">
            <span>行驶证</span>
            <div class='isPhoto'>
            <img :src="drice" alt="">

            </div>
        </div>
         
       </div> 

  </el-collapse-item>
</el-collapse>
        <div slot="footer" class="dialog-footer" style='margin: 20px 0 0 0;'>
            <el-button type="primary" @click="editOrder()" v-if='isOr'>通过</el-button>
            <el-button type="primary" @click="noOrder()" v-if='isOr'>不通过</el-button>
            <el-button type="primary" @click="isCal()" v-if='isOrder'>确 定</el-button>
        </div>
            <!-- 不通过  原因  弹框-->
    <el-dialog
            title="原因"
            :visible.sync="allotDialogVisible"
            width="30%">
            <div>
               <textarea name="" id="" cols="30" rows="10" style='width:100%;' v-model="whyCon"></textarea>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="allotDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="allotOrder()">确 定</el-button>
                
            </span>
            </el-dialog>
    </div>
</template>

<script>
import { formatDate } from "./../../js/data";
export default {
  data() {
    return {
        allotDialogVisible: false,
      activeNames: ["1", "0" , '43'],
      tableData:[],
      isShow1: false,
      isShow2: false,
      isShow3: false,
      inputSta: true,
      isShow4: false,
      centerDialogVisible:false,
      isClass:true,
      isClass1:false,
      isClass2:false,
      isClass3:false,
      isClass4:false,
      isSrc:"",
      id:"",
      whyCon:"",
      TMSorder:{
          name:"",
          city:"",
          name1:"",
          phone:"",
          phone1:"",
          card:"",
          adress:""
      },
      order: {
          insure:"",
          tiji:"",
          corlor:"",
          num:"",
          type:""
      },
      drice:"",// 行驶证
      dricing:"",// 驾驶证
      noCard: "",
      card1: "",
      isOr: false,
      ifOrder: false



    };
  },
  created() {
      this.getData();// 刚进来  获取数据
      if(this.$route.query.sta){
          // 查看   
        this.isOrder = true;
        this.isOr = false;
      }else{
          // 审核
        this.isOrder = false;
        this.isOr = true;
      }
    

  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    getData(){
        this.id = this.$route.query.id;
        let that = this;
        this.$axios({
            url: this.URL_API + "/bqs/backend/web/index.php/knight/update?id="+this.id+"&token="+window.sessionStorage.getItem("token"),
            method: "get",
            data: {},
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
            that.drice = res.data.data.driving_license;// 行驶证
            that.dricing = res.data.data.driving_card;// 驾驶证
            that.noCard = res.data.data.card_reverse_img;// 反面
            that.card1 = res.data.data.card_front_img;// 正面
            // order
            that.order.insure= res.data.data.insure;
            that.order.tiji=res.data.data.car_bulk;
            that.order.corlor=res.data.data.car_color+'色';
            that.order.num=res.data.data.car_code;
            that.order.type=res.data.data.car_type;
            // TMSorder
            that.TMSorder.name= res.data.data.relly_name;
            that.TMSorder.city= res.data.data.city_name;
            that.TMSorder.name1=res.data.data.help_user;
            that.TMSorder.phone= res.data.data.phone;
            that.TMSorder.phone1=res.data.data.help_phone;
            that.TMSorder.card= res.data.data.card;
            that.TMSorder.adress= res.data.data.address;
            } else if (res.data.code == "450") {
            that.$message("暂无权限");
            }
        });
    },
    editOrder(){
        // 通过 
    let that = this;
      this.$axios({
        url: this.URL_API + "/bqs/backend/web/index.php/knight/update",
        method: "post",
        data: {
          id: this.id,
          check_status: 2,// 状态
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
            that.$router.push('/iceAudit');
            that.$message(res.data.message);
        } else if (res.data.code == "450") {
          that.$message("暂无权限");
        }
      });
    },
    noOrder(){
        // 不通过 弹框
        this.whyCon = '';
        this.allotDialogVisible = true;
    },
    allotOrder(){
        // 不通过  原因  提交
      let that = this;
      this.$axios({
        url: this.URL_API + "/bqs/backend/web/index.php/knight/update",
        method: "post",
        data: {
          id: this.id,// 
          why: this.whyCon,// 
          check_status: 1,// 状态
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
            that.$router.push("/iceAudit");
            that.$message(res.data.message);
        } else if (res.data.code == "450") {
          that.$message("暂无权限");
        }
      });
    },
    isCal(){
        // 点击确定   不走接口
        this.$router.push("/iceAudit");
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