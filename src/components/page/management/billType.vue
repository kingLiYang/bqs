<template>
    <div>
        <div>
            <el-form  :inline="true">
                <el-row>
                    <el-form-item label="tms订单号" v-if='isTmsNum'>
                        <el-input v-model="tmsNum" auto-complete="off" @blur="getTmsMsg()"></el-input>
                    </el-form-item>
                    <el-form-item label="运单号" v-if='isWayNum'>
                        <el-input v-model="billNum" auto-complete="off"  @blur="getMsg()"></el-input>
                    </el-form-item>
                    <el-form-item label="冰骑士订单号" v-if="isA">
                      <el-input v-model="iceNum" auto-complete="off" :disabled="true"></el-input>
                    </el-form-item>
                </el-row>
            </el-form>
        </div>

        <!-- 四种情况 -->
        <div >
        <h2 style="margin:0 0 20px 0;" >{{quxiang}}</h2>
        <el-form v-model="form" :inline="true">
        <el-row>
            <el-form-item label="省份">
               <el-select  v-model="form.region"  placeholder="请选择" @change="getCity()" :disabled='isDisabled'>
                    <el-option  :label="item.name" :value="item.id" v-for="(item,index) in getSheng" :key="index"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="城市">
                <el-select v-model="form.region1" placeholder="请选择" @change="getZhan()" :disabled='isDisabled'>
                  <el-option label='请选择' value=''></el-option>
                    <el-option  :label="item.name" :value="item.id" v-for="(item,index) in getAllCity" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="站点">
                <el-select v-model="form.region2" placeholder="请选择" @change="getMan()">
                  <el-option label='请选择' value=''></el-option>
                    <el-option  :label="item.name" :value="item.c_id" v-for="(item,index) in getAllZhan" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="站点人员">
                <el-select v-model="form.region3" placeholder="请选择">
                  <el-option label='请选择' value=''></el-option>
                    <el-option  :label="item.relly_name" :value="item.u_id" v-for="(item,index) in getAllMan" :key="index"></el-option>
                </el-select>
            </el-form-item>
                <el-form-item label="规定时间">
                <el-date-picker
                    v-model="value1"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    @change="changeTime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>
            </el-row>
        </el-form>
        </div>
        <div v-if="isQu">
        <h2 style="margin:0 0 20px 0;">取货信息：</h2>
        <el-form v-model="form1" :inline="true">
            <el-form-item label="姓名">
                <el-input v-model="form1.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form1.phone" auto-complete="off" @blur="testPhone(val='取货')"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="form1.address" auto-complete="off" style='width:25rem;'></el-input>
            </el-form-item>
            <el-form-item label="规定时间">
                <el-date-picker
                    v-model="value2"
                    type="datetime"
                    placeholder="选择日期时间"
                    @change="changeTime2"
                    align="right"
                    disabled
                    :picker-options="pickerOptions1">
                </el-date-picker>
            </el-form-item>
        </el-form>
        </div>
        <div v-if="isFan">
        <h2 style="margin:0 0 20px 0;">送货信息：</h2>
        <el-form v-model="form2" :inline="true">
            <el-form-item label="姓名">
                <el-input v-model="form2.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form2.phone" auto-complete="off" @blur="testPhone(val='送货')"></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="form2.address" auto-complete="off" style='width:25rem;'></el-input>
            </el-form-item>
            <el-form-item label="规定时间">
                <el-date-picker
                    v-model="value3"
                    type="datetime"
                    placeholder="选择日期时间"
                    @change="changeTime3"
                    align="right"
                    disabled
                    :picker-options="pickerOptions1">
                </el-date-picker>
            </el-form-item>
        </el-form>
        </div>
        <div >
        <h2 style="margin:0 0 20px 0;">{{fanName}}</h2>
        <el-form v-model="form3" :inline="true">
        <el-row>
            <el-form-item label="省份" >
               <el-select  v-model="form3.region"  placeholder="请选择" @change="getCity1()">
                    <el-option  :label="item.name" :value="item.id" v-for="(item,index) in getSheng" :key="index"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="城市">
                <el-select v-model="form3.region1" placeholder="请选择" @change="getZhan1()">
                  <el-option label='请选择' value=''></el-option>
                    <el-option  :label="item.name" :value="item.id" v-for="(item,index) in getAllCity1" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="站点">
                <el-select v-model="form3.region2" placeholder="请选择" @change="getMan1()">
              <el-option label='请选择' value=''></el-option>
                  
                    <el-option  :label="item.name" :value="item.c_id" v-for="(item,index) in getAllZhan1" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="站点人员">
                <el-select v-model="form3.region3" placeholder="请选择">
                  <el-option label='请选择' value=''></el-option>
                    <el-option  :label="item.relly_name" :value="item.u_id" v-for="(item,index) in getAllMan1" :key="index"></el-option>
                </el-select>
            </el-form-item>
                <el-form-item label="规定时间">
                <el-date-picker
                    v-model="value4"
                    type="datetime"
                    placeholder="选择日期时间"
                    @change="changeTime4"
                    align="right"
                    :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>
            </el-row>
        </el-form>
        </div>
        <h2 style="margin:0 0 20px 0;">骑士信息</h2>
        <el-form v-model="form4" :inline="true">
        <el-row>
            <el-form-item label="省份">
               <el-select  v-model="form4.region"  placeholder="请选择" @change="getCity2()" :disabled='isDisabled'>
                    <el-option  :label="item.name" :value="item.id" v-for="(item,index) in getSheng" :key="index"></el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="城市">
                <el-select v-model="form4.region1" placeholder="请选择" @change="getZhan2()" :disabled='isDisabled'>
                  <el-option label='请选择' value=''></el-option>
                    <el-option  :label="item.name" :value="item.id" v-for="(item,index) in getAllCity2" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="站点">
                <el-select v-model="form4.region2" placeholder="请选择" @change="getKnight2()">
                  <el-option label='请选择' value=''></el-option>
                    <el-option  :label="item.name" :value="item.pid_path" v-for="(item,index) in getAllZhan2" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="骑士">
                <el-select v-model="form4.region3" placeholder="请选择">
                  <el-option label='请选择' value=''></el-option>
                    <el-option  :label="item.relly_name" :value="item.k_id" v-for="(item,index) in getAllKnight" :key="index"></el-option>
                </el-select>
            </el-form-item>
            </el-row>
        </el-form>
    <!-- 提交  返回 -->
    <div class="divBut">
            <el-row>
                <el-button type="primary" round @click="add()">确定</el-button>
                <el-button type="primary" round @click='edit()'>返回</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
import { formatDate } from "./../../../js/data";
export default {
  data: function() {
    return {
      isWayNum: true,
      isTmsNum: true,
      isDisabled: false,
      isTms: false,
      isWay: false,
      getSheng: [],
      getAllCity: [],
      getAllZhan: [],
      getAllMan: [],
      getAllKnight: [],
      getAllCity1: [],
      getAllZhan1: [],
      getAllMan1: [],
      getAllCity2: [],
      getAllZhan2: [],
      form: {
        region: "",
        region1: "",
        region2: "",
        region3: ""
      },
      form1: {
        name: "",
        address: "",
        phone: ""
      },
      form2: {
        name: "",
        address: "",
        phone: ""
      },
      form3: {
        region: "",
        region1: "",
        region2: "",
        region3: ""
      },
      form4: {
        region: "",
        region1: "",
        region2: "",
        region3: ""
      },
      pickerOptions1: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value2: "",
      value1: "",
      value3: "",
      value4: "",
      isFan: true,
      isQu: true,
      fanName: "返箱信息：",
      quxiang: "取箱信息：",
      billNum: "",
      tmsNum: "",
      id: "",
      type: "",
      sta: "",
      isA: false,
      iceNum: ""
    };
  },
  created() {
    // 判断 是否是总部

    this.getDefaultCity();
    // 判断  四种  情况
    this.type = this.$route.query.type;
    this.sta = this.$route.query.sta;
    if (this.sta == true) {
      // 修改订单的信息
      this.isTms = true;
      this.isWay = true;
      this.isA = true;
      this.id = this.$route.query.id;
      this.editOrder();
      setTimeout(() => {
        this.getTmsMsg();
      }, 1000);
    } else {
      // 下单
      this.isTms = false;
      this.isWay = false;
      this.isA = false;
      // this.add();
    }
    if (this.type == "1") {
      this.isWayNum = false;
      this.isTmsNum = true;
      this.isFan = true;
      this.isQu = true;
    } else if (this.type == "2") {
      this.isWayNum = false;
      this.isTmsNum = true;
      this.isFan = false;
      this.isQu = true;
      this.fanName = "送货信息：";
    } else if (this.type == "3") {
      this.isWayNum = true;
      this.isTmsNum = false;
      this.isQu = false;
      this.isFan = true;
      this.quxiang = "取货信息：";
    } else {
      this.isWayNum = true;
      this.isTmsNum = false;
      this.isQu = false;
      this.isFan = false;
      this.fanName = "送货信息：";
      this.quxiang = "取货信息：";
    }
  },
  methods: {
    getDefaultCity() {
      let that = this;
      this.$axios({
        url: this.URL_API + "/bqs/backend/web/index.php/order/default",
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
        if (Number(res.data.code) == 0) {
          that.huoquSheng();
          if (Number(res.data.data.station.length) == 0) {
            that.isDisabled = false;
            
          } else {
            that.isDisabled = true;
            switch (Number(that.type)) {
              case 1:
                that.form.region = res.data.data.province; // 省份
                that.form.region1 = res.data.data.city; // chengshi
                that.getAllZhan = res.data.data.station; // 站点
                that.form4.region = res.data.data.province; // 骑士 信息   省份
                that.form4.region1 = res.data.data.city; // 骑士 信息 chengshi
                that.getAllZhan2 = res.data.data.station;
                break;
              case 2:
                that.form.region = res.data.data.province; // 省份
                that.form.region1 = res.data.data.city; // chengshi
                that.getAllZhan = res.data.data.station; // 站点
                that.form4.region = res.data.data.province; // 骑士 信息   省份
                that.form4.region1 = res.data.data.city; // 骑士 信息 chengshi
                that.getAllZhan2 = res.data.data.station;
                break;
              case 3:
                that.form.region = res.data.data.province; // 省份
                that.form.region1 = res.data.data.city; // chengshi
                that.getAllZhan = res.data.data.station; // 站点
                that.form4.region = res.data.data.province; // 骑士 信息   省份
                that.form4.region1 = res.data.data.city; // 骑士 信息 chengshi
                that.getAllZhan2 = res.data.data.station;
                break;
              case 4:
                that.form.region = res.data.data.province; // 省份
                that.form.region1 = res.data.data.city; // chengshi
                that.getAllZhan = res.data.data.station; // 站点
                that.form4.region = res.data.data.province; // 骑士 信息   省份
                that.form4.region1 = res.data.data.city; // 骑士 信息 chengshi
                that.getAllZhan2 = res.data.data.station;
                break;
            }
          }
        } else if (res.data.code == "450") {
          that.$message("暂无权限");
        } else if (res.data.code == "400") {
          that.$message("请先登录");
          that.$router.push("/");
        } else {
          that.$message(res.data.message);
        }
      });
    },
    formatDate(time) {
      // 时间戳
      if (time == null) {
        return "";
      } else {
        var date = new Date(time * 1000);
        return formatDate(date, "yyyy-MM-dd hh:mm:ss");
      }
    },
    getMsg(){
      // 获取信息  输入运单
            let that = this;
      this.$axios({
        url:
          "http://www.zjcoldcloud.com/bqs/backend/web/index.php/order/get_tms_data",
        method: "post",
        data: {
          token: window.sessionStorage.getItem("token"),
          tms_way_code: this.billNum,
          type: this.type
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
            that.isTms = false;
            that.isWay = false;
          switch (Number(that.type)) {
            case 1:
              that.form1.address = res.data.data.tms_get_goods_address; //取货地址
              that.form1.name = res.data.data.tms_get_goods_man; //取货姓名
              that.form1.phone = res.data.data.tms_get_goods_phone; //取货电话
              that.value2 = that.formatDate(
                res.data.data.tms_get_goods_plan_time
              ); //取货规定时间
              that.form2.address = res.data.data.tms_send_goods_address; //送货地址
              that.form2.name = res.data.data.tms_send_goods_man; //送货姓名
              that.form2.phone = res.data.data.tms_send_goods_phone; //送货电话
              that.value3 = that.formatDate(res.data.data.send_goods_plan_time); //送货规定时间
              that.value1 = that.formatDate(res.data.data.get_box_plan_time); //取箱规定时间
              that.value4 = that.formatDate(res.data.data.send_box_plan_time); //返箱规定时间
              that.tmsNum = res.data.data.tms_order_code;

              break;
            case 2:
              that.form1.address = res.data.data.tms_get_goods_address; //取货地址
              that.form1.name = res.data.data.tms_get_goods_man; //取货姓名
              that.form1.phone = res.data.data.tms_get_goods_phone; //取货电话
              that.value2 = that.formatDate(
                res.data.data.tms_get_goods_plan_time
              ); //取货规定时间
              that.value1 = that.formatDate(res.data.data.get_box_plan_time); //取箱规定时间
              that.tmsNum = res.data.data.tms_order_code;
              break;
            case 3:
              that.form2.address = res.data.data.tms_send_goods_address; //送货地址
              that.form2.name = res.data.data.tms_send_goods_man; //送货姓名
              that.form2.phone = res.data.data.tms_send_goods_phone; //送货电话
              that.value3 = that.formatDate(res.data.data.send_goods_plan_time); //送货规定时间
              that.tmsNum = res.data.data.tms_order_code;
              break;
            case 4:
            that.tmsNum = res.data.data.tms_order_code;
              break;
          }
        } else if (res.data.code == "450") {
          that.$message("暂无权限");
        } else if (res.data.code == "400") {
          that.$message("请先登录");
          that.$router.push("/");
        } else {
          that.$message(res.data.message);
        }
      });
    },
    getTmsMsg() {
      // tmsNum  tms信息  输入 订单
      let that = this;
      this.$axios({
        url:
          "http://www.zjcoldcloud.com/bqs/backend/web/index.php/order/get_tms_data",
        method: "post",
        data: {
          token: window.sessionStorage.getItem("token"),
          tms_order_code: this.tmsNum,
          type: this.type
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
                that.isTms = false;
                that.isWay = false;
          switch (Number(that.type)) {
            case 1:
              that.form1.address = res.data.data.tms_get_goods_address; //取货地址
              that.form1.name = res.data.data.tms_get_goods_man; //取货姓名
              that.form1.phone = res.data.data.tms_get_goods_phone; //取货电话
              that.value2 = that.formatDate(
                res.data.data.tms_get_goods_plan_time
              ); //取货规定时间
              that.form2.address = res.data.data.tms_send_goods_address; //送货地址
              that.form2.name = res.data.data.tms_send_goods_man; //送货姓名
              that.form2.phone = res.data.data.tms_send_goods_phone; //送货电话
              that.value3 = that.formatDate(res.data.data.send_goods_plan_time); //送货规定时间
              that.value1 = that.formatDate(res.data.data.get_box_plan_time); //取箱规定时间
              that.value4 = that.formatDate(res.data.data.send_box_plan_time); //返箱规定时间
              that.billNum = res.data.data.tms_way_code || '';

              break;
            case 2:
              that.form1.address = res.data.data.tms_get_goods_address; //取货地址
              that.form1.name = res.data.data.tms_get_goods_man; //取货姓名
              that.form1.phone = res.data.data.tms_get_goods_phone; //取货电话
              that.value2 = that.formatDate(
                res.data.data.tms_get_goods_plan_time
              ); //取货规定时间
              that.value1 = that.formatDate(res.data.data.get_box_plan_time); //取箱规定时间
              that.billNum = res.data.data.tms_way_code || '';
              break;
            case 3:
              that.form2.address = res.data.data.tms_send_goods_address; //送货地址
              that.form2.name = res.data.data.tms_send_goods_man; //送货姓名
              that.form2.phone = res.data.data.tms_send_goods_phone; //送货电话
              that.value3 = that.formatDate(res.data.data.send_goods_plan_time); //送货规定时间
              that.billNum = res.data.data.tms_way_code || '';
              break;
            case 4:
            that.billNum = res.data.data.tms_way_code || '';
              break;
          }
        } else if (res.data.code == "450") {
          that.$message("暂无权限");
        } else if (res.data.code == "400") {
          that.$message("请先登录");
          that.$router.push("/");
        } else {
          that.$message(res.data.message);
        }
      });
    },
    huoquSheng() {
      // 获取省
      let that = this;
      this.$axios({
        url:
          "http://www.zjcoldcloud.com/bqs/backend/web/index.php/company/city",
        method: "post",
        data: { token: window.sessionStorage.getItem("token") },
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
          that.getSheng = res.data.data;
        } else if (res.data.code == "450") {
          that.$message("暂无权限");
        } else if (res.data.code == "400") {
          that.$message("请先登录");
          that.$router.push("/");
        }
      });
    },
    getCity() {
      if (this.isDisabled != true) {
        this.form.region1 = "";
        this.form.region2 = "";
        let that = this;
        this.$axios({
          url: this.URL_API + "/bqs/backend/web/index.php/company/city",
          method: "post",
          data: {
            pid: this.form.region,
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
          that.getAllCity = res.data.data;
        });
      }
    },
    getCity1() {
      this.form3.region1 = "";
      this.form3.region2 = "";
      let that = this;
      this.$axios({
        url: this.URL_API + "/bqs/backend/web/index.php/company/city",
        method: "post",
        data: {
          pid: this.form3.region,
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
        that.getAllCity1 = res.data.data;
      });
    },
    getCity2() {
      if (this.isDisabled != true) {
        this.form4.region1 = "";
        this.form4.region2 = "";
        let that = this;
        this.$axios({
          url: this.URL_API + "/bqs/backend/web/index.php/company/city",
          method: "post",
          data: {
            pid: this.form4.region,
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
          that.getAllCity2 = res.data.data;
        });
      }
    },
    getZhan() {
      if (this.isDisabled != true) {
        this.form.region2 = "";
        let that = this;
        this.$axios({
          url: this.URL_API + "/bqs/backend/web/index.php/order/company",
          method: "post",
          data: {
            id: this.form.region1,
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
          that.getAllZhan = res.data.data;
        });
      }
    },
    getZhan1() {
      this.form3.region2 = "";
      let that = this;
      this.$axios({
        url: this.URL_API + "/bqs/backend/web/index.php/order/company",
        method: "post",
        data: {
          id: this.form3.region1,
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
        that.getAllZhan1 = res.data.data;
      });
    },
    getZhan2() {
      if (this.isDisabled != true) {
        this.form4.region2 = "";
        this.form4.region3 = "";
        let that = this;
        this.$axios({
          url: this.URL_API + "/bqs/backend/web/index.php/order/company",
          method: "post",
          data: {
            id: this.form4.region1,
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
          that.getAllZhan2 = res.data.data;
        });
      }
    },
    getMan() {
      this.form.region3 = "";
      let that = this;
      this.$axios({
        url: this.URL_API + "/bqs/backend/web/index.php/order/company_user",
        method: "post",
        data: {
          id: this.form.region2,
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
        that.getAllMan = res.data.data;
      });
    },
    getMan1() {
      this.form3.region3 = "";
      let that = this;
      this.$axios({
        url: this.URL_API + "/bqs/backend/web/index.php/order/company_user",
        method: "post",
        data: {
          id: this.form3.region2,
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
        that.getAllMan1 = res.data.data;
      });
    },
    getKnight2() {
      this.form4.region3 = "";
      let that = this;
      this.$axios({
        url: this.URL_API + "/bqs/backend/web/index.php/order/knight",
        method: "post",
        data: {
          company_path: this.form4.region2,
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
        that.getAllKnight = res.data.data;
      });
    },
    add() {
      // 提交
      let obj = {};
      obj.token = window.sessionStorage.getItem("token");
      if (this.type == "1") {
        obj.get_company_id = this.form.region2; // 取箱站点
        obj.get_user_id = this.form.region3; // 取箱站点人员
        obj.send_company_id = this.form3.region2; // 返箱站点
        obj.send_user_id = this.form3.region3; // 返箱站点人员
        obj.tms_order_code = this.tmsNum; // tms订单号
        obj.tms_way_code = this.billNum; // tms运单号
        obj.get_box_plan_time = this.value1; //取箱规定时间
        obj.send_box_plan_time = this.value4; //返箱规定时间
        obj.get_goods_address = this.form1.address; //取货地址
        obj.get_goods_man = this.form1.name; //取货姓名
        obj.get_goods_phone = this.form1.phone; //取货电话
        obj.get_goods_plan_time = this.value2; //取货规定时间
        obj.send_goods_address = this.form2.address; //送货地址
        obj.send_goods_man = this.form2.name; //送货姓名
        obj.send_goods_phone = this.form2.phone; //送货电话
        obj.send_goods_plan_time = this.value3; //送货规定时间
        obj.type = this.type; //订单类型
        obj.knight_id = this.form4.region3; //骑士id
      } else if (this.type == "2") {
        obj.get_company_id = this.form.region2; // 取箱站点
        obj.get_user_id = this.form.region3; // 取箱站点人员
        obj.send_company_id = this.form3.region2; // 送货站点
        obj.send_user_id = this.form3.region3; // 送货站点人员
        obj.get_box_plan_time = this.value1; //取箱规定时间
        obj.send_goods_plan_time = this.value4; //送货规定时间
        obj.get_goods_address = this.form1.address; //取货地址
        obj.get_goods_man = this.form1.name; //取货姓名
        obj.get_goods_phone = this.form1.phone; //取货电话
        obj.get_goods_plan_time = this.value2; //取货规定时间
        obj.type = this.type; //订单类型
        obj.knight_id = this.form4.region3; //骑士id
        obj.tms_order_code = this.tmsNum; // tms订单号
        obj.tms_way_code = this.billNum; // tms运单号
      } else if (this.type == "3") {
        obj.get_company_id = this.form.region2; // 取货站点
        obj.get_user_id = this.form.region3; // 取货站点人员
        obj.send_company_id = this.form3.region2; // 返箱站点
        obj.send_user_id = this.form3.region3; // 返箱站点人员

        obj.tms_order_code = this.tmsNum; // tms订单号
        obj.tms_way_code = this.billNum; // tms运单号
        
        obj.get_goods_plan_time = this.value1; //取货规定时间
        obj.send_box_plan_time = this.value4; //返箱规定时间
        obj.send_goods_address = this.form2.address; //送货地址
        obj.send_goods_man = this.form2.name; //送货姓名
        obj.send_goods_phone = this.form2.phone; //送货电话
        obj.send_goods_plan_time = this.value3; //送货规定时间
        obj.type = this.type; //订单类型
        obj.knight_id = this.form4.region3; //骑士id
      } else {
        obj.get_company_id = this.form.region2; // 取货站点
        obj.get_user_id = this.form.region3; // 取货站点人员
        obj.send_company_id = this.form3.region2; // 送货站点
        obj.send_user_id = this.form3.region3; // 送货站点人员
        obj.tms_order_code = this.tmsNum; // tms订单号
        obj.tms_way_code = this.billNum; // tms运单号
        obj.get_goods_plan_time = this.value1; //取货规定时间
        obj.send_goods_plan_time = this.value4; //送货规定时间
        obj.type = this.type; //订单类型
        obj.knight_id = this.form4.region3; //骑士id
      }
      // 添加  修改
      if (this.sta == true) {
        // 修改  提交
        obj.order_id = this.id;
        let that = this;
        this.$axios({
          url:
            "http://www.zjcoldcloud.com/bqs/backend/web/index.php/order/update",
          method: "post",
          data: obj,
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
            that.$router.push("/waybill");
            that.$message("修改成功");
          } else if (res.data.code == "450") {
            that.$message("暂无权限");
          }
        });
      } else {
        let that = this;
        this.$axios({
          url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/order/add",
          method: "post",
          data: obj,
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
            that.$router.push("/waybill");
            that.$message("下单成功");
          } else if (res.data.code == "450") {
            that.$message("暂无权限");
          } else {
            that.$message(res.data.message);
          }
        });
      }
    },
    edit() {
      // 返回
      this.$router.push("/waybill");
    },
    editOrder() {
      // 修改   默认
      let that = this;
      this.$axios({
        url:
          this.URL_API +
          "/bqs/backend/web/index.php/order/update?id=" +
          this.id +
          "&token=" +
          window.sessionStorage.getItem("token"),
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
          that.tmsNum = res.data.data.tms_order_code; // tms订单号
          if(res.data.data.tms_way_code == 'null'){
            that.billNum =''; // tms运单号
          }
          
          that.iceNum = res.data.data.order_code;
        } else if (res.data.code == "450") {
          that.$message("暂无权限");
        }
      });
    },
    changeTime(val) {
      this.value1 = val;
    },
    changeTime2(val) {
      this.value2 = val;
    },
    changeTime3(val) {
      this.value3 = val;
    },
    changeTime4(val) {
      this.value4 = val;
    },
    testPhone(val) {
      // 验证  手机号
      let reg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
      let reg1 = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
      if (val == "取货") {
        if (!reg.test(this.form1.phone) && !reg1.test(this.form1.phone)) {
          this.$message("请输入正确的手机号");
          this.form1.phone = "";
        }
      } else {
        if (!reg.test(this.form2.phone) && !reg1.test(this.form2.phone)) {
          this.$message("请输入正确的手机号");
          this.form2.phone = "";
        }
      }
    }
  }
};
</script>

<style scoped>
.divBut {
  margin: 20px 0 0 0;
  display: flex;
  justify-content: center;
}
</style>