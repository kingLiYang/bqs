<template>
    <div>
      
        <h2 style="margin:0 0 20px 0;">个人信息：</h2>
        <el-form v-model="form" :inline="true">
        <el-row>
            <el-form-item label="性别">
              <el-input auto-complete="off" v-model="form.city" :disabled="inputSta" @blur="testSex()"></el-input>
          </el-form-item>
          <el-form-item label="身份证号码">
              <el-input auto-complete="off" v-model="form.num" :disabled="inputSta" @blur="testId()"></el-input>
          </el-form-item>
           <el-form-item label="紧急联系人">
            <el-input auto-complete="off" v-model="form.name" :disabled="inputSta" @blur="testName()"></el-input>
          </el-form-item>
           <el-form-item label="紧急联系人电话">
            <el-input auto-complete="off" v-model="form.phone" :disabled="inputSta" @blur="textPhone()"></el-input>
           </el-form-item>
            <el-form-item label="驾驶证号">
              <el-input auto-complete="off" v-model="form.runNum" :disabled="inputSta"></el-input>
          </el-form-item>
           <el-form-item label="驾驶证类型">
            <el-input auto-complete="off" v-model="form.runLei" :disabled="inputSta"></el-input>
          </el-form-item>
           <el-form-item label="驾龄">
            <el-input auto-complete="off" v-model="form.runOld" :disabled="inputSta"></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
            <el-input auto-complete="off" v-model="form.adress" style="width:480px;" :disabled="inputSta"></el-input>
        </el-form-item>
        </el-row>
        
      </el-form>
      <h2 style="margin:0 0 20px 0;">车辆信息：</h2>
      <el-form v-model="form1" :inline="true">
        <el-form-item label="车辆颜色">
            <el-input auto-complete="off" v-model="form1.city" :disabled="inputSta"></el-input>
        </el-form-item>
        <el-form-item label="车辆号码">
            <el-input auto-complete="off" v-model="form1.num" :disabled="inputSta" @blur="textRunnum()"></el-input>
        </el-form-item>
        <el-form-item label="车辆类型">
            <!-- <el-input auto-complete="off" v-model="form1.name"></el-input> -->
            <el-select  v-model="form1.name"  placeholder="请选择车辆类型" :disabled="inputSta">
                  <el-option label="请选择" value=""></el-option>
                <el-option label="小面包车" value="小面包车"></el-option>
                <el-option label="中面包车" value="中面包车"></el-option>
                <el-option label="小货车" value="小货车"></el-option>
                <el-option label="中货车" value="中货车"></el-option>
                <el-option label="大货车" value="大货车"></el-option>
                <el-option label="其它" value="其它"></el-option>
                
                </el-select>
        </el-form-item>
        <el-form-item label="车身长宽高">
            <el-input auto-complete="off" v-model="form1.phone" :disabled="inputSta"></el-input>
        </el-form-item>
        <el-form-item label="车辆商业险第三者责任险">
            <el-input auto-complete="off" v-model="form1.adress" :disabled="inputSta"></el-input>
        </el-form-item>
      </el-form>
      <h2 style="margin:0 0 20px 0;">银行卡信息：</h2>
      <div>
        <el-form v-model="form2" :inline="true">
        <el-form-item label="银行名称">
            <el-input auto-complete="off" v-model="form2.city" :disabled="inputSta"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号">
            <el-input auto-complete="off" v-model="form2.num" :disabled="inputSta" @blur="testkahao()"></el-input>
        </el-form-item>
        <el-form-item label="所属支行">
            <el-input auto-complete="off" v-model="form2.name" :disabled="inputSta"></el-input>
        </el-form-item>
        <el-form-item label="开户地址">
            <el-input auto-complete="off" v-model="form2.phone" :disabled="inputSta"></el-input>
        </el-form-item>
      </el-form>
      </div>
      <h2 style="margin:0 0 20px 0;">照片信息：</h2>
      <div class="bigDiv">
        <div class="man_id">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="#"
            :auto-upload="false"
            multiple
            :on-change="handleChange" :disabled="inputSta">
             <el-button size="small" type="primary" :disabled="inputSta">上传身份证</el-button>
          </el-upload>
         
        </div>
        <div class="man_id">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="#"
            :auto-upload="false"
            multiple
            :on-change="handleChange1" :disabled="inputSta">
            <el-button size="small" type="primary" :disabled="inputSta">上传身份证</el-button>
          </el-upload>
        </div>
        <div class="man_id">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="#"
            :auto-upload="false"
            multiple
            :on-change="handleChange2" :disabled="inputSta">
            <el-button size="small" type="primary" :disabled="inputSta">上传驾驶证</el-button>
          </el-upload>
        </div>
        <div class="man_id">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="#"
            :auto-upload="false"
            multiple
            :on-change="handleChange3" :disabled="inputSta">
            <el-button size="small" type="primary" :disabled="inputSta">上传行驶证</el-button>
          </el-upload>
        </div>
         
       </div> 
    <!-- 提交  返回 -->
    <div class="divBut">
            <el-row>
                <el-button type="primary" round @click="add()">确定</el-button>
                <el-button type="primary" round @click='edit()' v-if="!inputSta">返回</el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      form:{
        city:"",
        num:"",
        name:"",
        phone:"",
        adress:"",
        runOld:"",
        runLei:"",
        runNum:""
      },
      form1:{
        city:"",
        num:"",
        name:"",
        phone:"",
        adress:""
      },
      form2:{
        city:"",
        num:"",
        name:"",
        phone:""
      },
      fileMap:"",
      token:"",
      id:"",
      inputSta:false
    };
  },
  created() {
    // 获取 ID
    this.id = this.$route.query.id;
    // 获取token
    let that = this;
      this.$axios({
        url: "http://www.ccsc58.cc/weixinnew/Suggestions/php-sdk-7.2.3/getToken_01.php",
        method: "post",
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
        that.token = res.data.list;
      });
      // 判断  修改  还是  添加  还是  查看
      if(this.$route.query.sta){
        // alert('修改');
        this.id = this.$route.query.id;
        this.editDefault();// 修改  默认
      }else if(this.$route.query.sta == false){
        // 查看
        this.id = this.$route.query.id;
        this.see();
      }
  },
  methods: {
    handleChange(file, fileList){
      // 身份证
      let formData = new FormData();
      formData.append('file', file.raw);
      formData.append('token', this.token);
      document.getElementsByClassName('el-upload-list').innerHTML = '';
      let that = this;
      this.$axios({
        url: "http://up-z1.qiniup.com",
        method: "post",
        data: formData,
        asynd:true,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }).then(function(res) {
        // that.key = res.data.key;
        let upload_list_li = document.getElementsByClassName('el-upload--text')[0];  
        let upload_list_li_img = document.getElementsByClassName('imgQiniu')[0];  
        document.getElementsByClassName('el-upload-list')[0].innerHTML = '';
         if(upload_list_li_img == undefined){
               let imgElement = document.createElement("img");  
               imgElement.setAttribute('src', 'http://ov0v30wya.bkt.clouddn.com/' + res.data.key);  
               imgElement.setAttribute('class', "imgQiniu");
                 upload_list_li.appendChild(imgElement);  
         }else{
           upload_list_li_img.setAttribute('src','http://ov0v30wya.bkt.clouddn.com/' + res.data.key);
           imgElement.setAttribute('class', "imgQiniu");
            upload_list_li.appendChild(imgElement);  
         } 
      });
      

    },
    handleChange1(file, fileList){
      // 身份证
      let formData = new FormData();
      formData.append('file', file.raw);
      formData.append('token', this.token);
      document.getElementsByClassName('el-upload-list').innerHTML = '';
      let that = this;
      this.$axios({
        url: "http://up-z1.qiniup.com",
        method: "post",
        data: formData,
        asynd:true,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }).then(function(res) {
        let upload_list_li = document.getElementsByClassName('el-upload--text')[1];  
      let man_is_img = upload_list_li.getElementsByTagName("img");
      document.getElementsByClassName('el-upload-list')[1].innerHTML = '';
      if(man_is_img.length==0){
         let imgElement = document.createElement("img");  
          imgElement.setAttribute('src', 'http://ov0v30wya.bkt.clouddn.com/' + res.data.key);  
          imgElement.setAttribute('class', "imgQiniu2");
          upload_list_li.appendChild(imgElement);  
      }else{
          man_is_img[0].setAttribute('src', 'http://ov0v30wya.bkt.clouddn.com/' + res.data.key);  
           man_is_img[0].setAttribute('class', "imgQiniu2");
          upload_list_li.appendChild(man_is_img[0]);  
      }
      });
    },
    handleChange2(file, fileList){
      // 驾驶证
      let formData = new FormData();
      formData.append('file', file.raw);
      formData.append('token', this.token);
      document.getElementsByClassName('el-upload-list').innerHTML = '';
      let that = this;
      this.$axios({
        url: "http://up-z1.qiniup.com",
        method: "post",
        data: formData,
        asynd:true,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }).then(function(res) {
        let upload_list_li = document.getElementsByClassName('el-upload--text')[2];  
      let man_is_img = upload_list_li.getElementsByTagName("img");
      document.getElementsByClassName('el-upload-list')[2].innerHTML = '';
      if(man_is_img.length==0){
         let imgElement = document.createElement("img");  
          imgElement.setAttribute('src', 'http://ov0v30wya.bkt.clouddn.com/' + res.data.key);  
          imgElement.setAttribute('class', "imgQiniu3");
          upload_list_li.appendChild(imgElement);  
      }else{
          man_is_img[0].setAttribute('src', 'http://ov0v30wya.bkt.clouddn.com/' + res.data.key);  
           man_is_img[0].setAttribute('class', "imgQiniu3");
          upload_list_li.appendChild(man_is_img[0]);  
      }
      });
    },
    handleChange3(file, fileList){
      // 行驶证
      let formData = new FormData();
      formData.append('file', file.raw);
      formData.append('token', this.token);
      document.getElementsByClassName('el-upload-list').innerHTML = '';
      let that = this;
      this.$axios({
        url: "http://up-z1.qiniup.com",
        method: "post",
        data: formData,
        asynd:true,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }).then(function(res) {
        let upload_list_li = document.getElementsByClassName('el-upload--text')[3];  
      let man_is_img = upload_list_li.getElementsByTagName("img");
      document.getElementsByClassName('el-upload-list')[3].innerHTML = '';
      if(man_is_img.length==0){
         let imgElement = document.createElement("img");  
          imgElement.setAttribute('src', 'http://ov0v30wya.bkt.clouddn.com/' + res.data.key);  
          imgElement.setAttribute('class', "imgQiniu4");
          upload_list_li.appendChild(imgElement);  
      }else{
          man_is_img[0].setAttribute('src', 'http://ov0v30wya.bkt.clouddn.com/' + res.data.key);  
           man_is_img[0].setAttribute('class', "imgQiniu4");
          upload_list_li.appendChild(man_is_img[0]);  
      }
      });
    },
    edit(){
      // 返回
      this.$router.push("/oldCharts");
    },
    add(){
      if(this.$route.query.sta){
        this.editOrder();// 修改  提交
      }else if(this.$route.query.sta==false){
        // 查看
        this.$router.push("/oldCharts");
      }else{
        // 添加
      let img1 = document.getElementsByClassName('imgQiniu')[0];
      let img2 = document.getElementsByClassName('imgQiniu2')[0];
      let img3 = document.getElementsByClassName('imgQiniu3')[0];
      let img4 = document.getElementsByClassName('imgQiniu4')[0];

      if(img1==undefined||img2==undefined||img3==undefined||img4==undefined){
        this.$message("请上传证件");
      }else{
        let that = this;
      this.$axios({
        url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/knight/add_desc",
        method: "post",
        data: { 
          id: this.id,// 主键id

          address: this.form.adress,// 地址

          sex: this.form.city,//性别		

          card: this.form.num,//身份证		

          help_user: this.form.name,//紧急联系人		

          help_phone: this.form.phone,//紧急联系人电话		

          bank_name: this.form2.city,//银行名称		

          bank_coke: this.form2.num,//	银行卡号		

          bank_branck: this.form2.name,//所属支行		

          bank_address: this.form2.phone,//	开户地址		

          driving_code: this.form.runNum,//驾驶证号		

          driving_type: this.form.runLei,//驾驶证类型		

          driving_age: this.form.runOld,//驾龄		

          car_color: this.form1.city,//车辆颜色		

          car_code: this.form1.num,

          car_type: this.form1.name,//车辆类型		

          car_bulk: this.form1.phone,//车辆体积		

          insure: this.form1.adress,//车辆保险额度		

          card_front_img:	document.getElementsByClassName('imgQiniu')[0].getAttribute('src'),//身份证正面路径		

          card_reverse_img: document.getElementsByClassName('imgQiniu2')[0].getAttribute('src'),//身份证反面路径	

          driving_card: document.getElementsByClassName('imgQiniu3')[0].getAttribute('src'),//驾驶证图片		

          driving_license: document.getElementsByClassName('imgQiniu4')[0].getAttribute('src'),
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
        if(res.data.code == '0'){
          that.$router.push('/oldCharts');
          that.$message(res.data.message);
        }else if(res.data.code == '450'){
          that.$message("暂无权限");
        }else{
          that.$message(res.data.message);
        }
      });
      }
      }
    },
    editDefault(){
      // 修改  默认
      let that = this;
      this.$axios({
        url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/knight/update?id="+this.id+"&token="+window.sessionStorage.getItem("token"),
        method: "get",
        data: {  },
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
        if(res.data.code == '0'){
          that.form.adress = res.data.data.address;// 地址
          that.form.city = res.data.data.sex;//性别	
          that.form.num = res.data.data.card;//身份证		
          that.form.name = res.data.data.help_user;//紧急联系人		
          that.form.phone = res.data.data.help_phone;//紧急联系人电话		
          that.form2.city = res.data.data.bank_name;//银行名称		
          that.form2.num = res.data.data.bank_coke;//	银行卡号		
          that.form2.name = res.data.data.bank_branck;//所属支行		
          that.form2.phone = res.data.data.bank_address;//	开户地址		
          that.form.runNum = res.data.data.driving_code;//驾驶证号		
          that.form.runLei = res.data.data.driving_type;//驾驶证类型		
          that.form.runOld = res.data.data.driving_age;//驾龄	
          that.form1.num	= res.data.data.car_code;
          that.form1.city = res.data.data.car_color;//车辆颜色		
          that.form1.name = res.data.data.car_type;//车辆类型		
          that.form1.phone = res.data.data.car_bulk;//车辆体积		
          that.form1.adress = res.data.data.insure;//车辆保险额度
          let imgElement = document.createElement("img"); 
          imgElement.setAttribute("class",'imgQiniu4');
          imgElement.setAttribute("src",res.data.data.driving_license);
          document.getElementsByClassName('el-upload--text')[3].appendChild(imgElement);

          let imgElement1 = document.createElement("img"); 
          imgElement1.setAttribute("class",'imgQiniu3');
          imgElement1.setAttribute("src",res.data.data.driving_card);
          document.getElementsByClassName('el-upload--text')[2].appendChild(imgElement1);
          let imgElement2 = document.createElement("img"); 
          imgElement2.setAttribute("class",'imgQiniu2');
          imgElement2.setAttribute("src",res.data.data.card_reverse_img);
          document.getElementsByClassName('el-upload--text')[1].appendChild(imgElement2);
          let imgElement3 = document.createElement("img"); 
          imgElement3.setAttribute("class",'imgQiniu');
          imgElement3.setAttribute("src",res.data.data.card_front_img);
          document.getElementsByClassName('el-upload--text')[0].appendChild(imgElement3);


        }else if(res.data.code == '450'){
          that.$message("暂无权限");
        }
        
      });
    },
    editOrder(){
      let that = this;
      this.$axios({
        url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/knight/update",
        method: "post",
        data: { 
          id: this.id,// 主键id

          address: this.form.adress,// 地址

          sex: this.form.city,//性别		

          card: this.form.num,//身份证		

          help_user: this.form.name,//紧急联系人		

          help_phone: this.form.phone,//紧急联系人电话		

          bank_name: this.form2.city,//银行名称		

          bank_coke: this.form2.num,//	银行卡号		

          bank_branck: this.form2.name,//所属支行		

          bank_address: this.form2.phone,//	开户地址		

          driving_code: this.form.runNum,//驾驶证号		

          driving_type: this.form.runLei,//驾驶证类型		

          driving_age: this.form.runOld,//驾龄		

          car_color: this.form1.city,//车辆颜色		

          car_code: this.form1.num,

          car_type: this.form1.name,//车辆类型		

          car_bulk: this.form1.phone,//车辆体积		

          insure: this.form1.adress,//车辆保险额度		

          card_front_img:	document.getElementsByClassName('imgQiniu')[0].getAttribute('src'),//身份证正面路径		

          card_reverse_img: document.getElementsByClassName('imgQiniu2')[0].getAttribute('src'),//身份证反面路径	

          driving_card: document.getElementsByClassName('imgQiniu3')[0].getAttribute('src'),//驾驶证图片		

          driving_license: document.getElementsByClassName('imgQiniu4')[0].getAttribute('src'),
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
        if(res.data.code == '0'){
          // that.dialogFormVisible = true;
          that.$router.push('/oldCharts');
          that.$message(res.data.message);
          // that.options = res.data.data;
        }else if(res.data.code == '450'){
          that.$message("暂无权限");
        }else{
          that.$message(res.data.message);
        }
      });
    },
    see(){
      let that = this;
      this.$axios({
        url: "http://www.zjcoldcloud.com/bqs/backend/web/index.php/knight/update?id="+this.id+"&token="+window.sessionStorage.getItem("token"),
        method: "get",
        data: {  },
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
        if(res.data.code == '0'){
          that.form.adress = res.data.data.address;// 地址
          that.form.city = res.data.data.sex;//性别	
          that.form.num = res.data.data.card;//身份证		
          that.form.name = res.data.data.help_user;//紧急联系人		
          that.form.phone = res.data.data.help_phone;//紧急联系人电话		
          that.form2.city = res.data.data.bank_name;//银行名称		
          that.form2.num = res.data.data.bank_coke;//	银行卡号		
          that.form2.name = res.data.data.bank_branck;//所属支行		
          that.form2.phone = res.data.data.bank_address;//	开户地址		
          that.form.runNum = res.data.data.driving_code;//驾驶证号		
          that.form.runLei = res.data.data.driving_type;//驾驶证类型		
          that.form.runOld = res.data.data.driving_age;//驾龄	
          that.form1.num	= res.data.data.car_code;
          that.form1.city = res.data.data.car_color;//车辆颜色		
          that.form1.name = res.data.data.car_type;//车辆类型		
          that.form1.phone = res.data.data.car_bulk;//车辆体积		
          that.form1.adress = res.data.data.insure;//车辆保险额度
          let imgElement = document.createElement("img"); 
          imgElement.setAttribute("class",'imgQiniu4');
          imgElement.setAttribute("src",res.data.data.driving_license);
          document.getElementsByClassName('el-upload--text')[3].appendChild(imgElement);

          let imgElement1 = document.createElement("img"); 
          imgElement1.setAttribute("class",'imgQiniu3');
          imgElement1.setAttribute("src",res.data.data.driving_card);
          document.getElementsByClassName('el-upload--text')[2].appendChild(imgElement1);
          let imgElement2 = document.createElement("img"); 
          imgElement2.setAttribute("class",'imgQiniu2');
          imgElement2.setAttribute("src",res.data.data.card_reverse_img);
          document.getElementsByClassName('el-upload--text')[1].appendChild(imgElement2);
          let imgElement3 = document.createElement("img"); 
          imgElement3.setAttribute("class",'imgQiniu');
          imgElement3.setAttribute("src",res.data.data.card_front_img);
          document.getElementsByClassName('el-upload--text')[0].appendChild(imgElement3);

          that.inputSta = true;

        }else if(res.data.code == '450'){
          that.$message("暂无权限");
        }
        
      });
    },
    testSex(){
      // 验证 性别
      let reg=/^(男|女)$/;
      if(!reg.test(this.form.city)){
        this.$message('请输入正确的性别');
        this.form.city = '';
      }

    },
    testId(){
      // 验证 身份证
      let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
      if(!regIdNo.test(this.form.num)){
        this.$message('请输入正确的身份证号');
        this.form.num = '';
      }
    },
    textPhone(){
      // 验证  紧急联系电话
      let myreg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
      if (!myreg.test(this.form.phone)) {
        this.$message("请输入正确的联系方式");
        this.form.phone = "";
      }
    },
    testName() {
      // 验证  紧急联系人
      let reg = /^[\u4E00-\u9FA5]{2,4}$/;
      if (!reg.test(this.form.name)) {
        this.$message("请输入正确的联系人");
        this.form.name = "";
      }
    },
    textRunnum(){
      // 验证 车牌号
      let reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
      if(!reg.test(this.form1.num)){
        this.$message('请输入正确的车牌号');
        this.form1.num = '';
      }
    },
    testkahao(){
      // 验证  银行卡号
      let reg = /^([1-9]{1})(\d{8,})$/;
      if(!reg.test(this.form2.num)){
        this.$message("请输入正确的银行卡号");
        this.form2.num = '';
      }
    }
  }
};
</script>

<style scoped>
.divBut{
  margin:20px 0 0 0;
  display: flex;
  justify-content: center;
}
</style>