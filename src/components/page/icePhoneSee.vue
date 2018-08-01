<template>
    <div>
        <!-- 个人信息 -->
        <div>
            <h2 style='margin: 0 0 10px 0;'>个人信息：</h2>
            <div>
                <table v-model='mine'>
                    <tr>
                        <td class='table_td'>姓名</td>
                        <td>{{mine.username}}</td>
                        <td class='table_td'>联系电话</td>
                        <td>{{mine.phone}}</td>
                        <td class='table_td'>身份证号码</td>
                        <td>{{mine.card}}</td>
                    </tr>
                    <tr>
                        <td class='table_td'>所属城市</td>
                        <td>{{mine.city}}</td>
                        <td class='table_td'>详细地址</td>
                        <td>{{mine.address}}</td>
                        <td class='table_td'>紧急联系人</td>
                        <td>{{mine.help_user}}</td>
                    </tr>
                    <tr>
                        <td class='table_td'>紧急联系人电话</td>
                        <td>{{mine.help_phone}}</td>
                    </tr>
                </table>
            </div>
        </div>

        <!-- 车辆信息 -->
        <div v-if="isShow">
            <h2 style='margin: 0 0 10px 0;'>车辆信息：</h2>
            <div>
                <table v-model='car'>
                    <tr>
                        <td class='table_td'>车牌颜色</td>
                        <td>{{car.car_color}}</td>
                        <td class='table_td'>车牌号码</td>
                        <td>{{car.car_code}}</td>
                        <td class='table_td'>车辆类型</td>
                        <td>{{car.car_type}}</td>
                    </tr>
                    <tr>
                        <td class='table_td'>车身长宽高</td>
                        <td>{{car.car_bulk}}米</td>
                        <td class='table_td'>第三方责任险</td>
                        <td>{{car.insure}}W</td>
                    </tr>
                </table>
            </div>
        </div>
        <div style='margin: 10px 0;'>
            <el-button type="primary" round @click.native.prevent="delChild()">确定</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            isShow: false,
            id:"",
            mine:{ 
                username: "",
                phone: "", 
                card: "", 
                city:"",
                address:"", 
                help_user:"", 
                help_phone:""
            },
            car:{
                car_color:"",
                car_code:"", 
                car_type:"", 
                car_bulk:"", 
                insure:""
            }
        }
    },
  created(){
      this.id = this.$route.query.id;
      this.getData();
      Number(this.$route.query.type) == 1 ? this.isShow = false : this.isShow = true;
  },
  methods:{
      getData(){
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
        }).then((res)=>{
            this.mine.username = res.data.data.username;
            this.mine.phone = res.data.data.phone;
            this.mine.card = res.data.data.card;
            this.mine.city = res.data.data.city_name;
            this.mine.address = res.data.data.address;
            this.mine.help_user = res.data.data.help_user;
            this.mine.help_phone = res.data.data.help_phone;

            this.car.car_color = res.data.data.car_color;
            this.car.car_code =  res.data.data.car_code;
            this.car.car_type =  res.data.data.car_type;
            this.car.car_bulk =  res.data.data.car_bulk;
            this.car.insure = res.data.data.insure;
        });

      },
      delChild(){
          this.$router.push("/icePhone");
      }
  }
}
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
</style>


