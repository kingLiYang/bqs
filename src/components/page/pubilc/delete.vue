
<!-----------------------------删除   弹框  组件------------------------>

<template>
  <div>
      <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%">
            <h3 style="text-align:center;">确定删除吗？</h3>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="delOrder()">确 定</el-button>
            </span>
            </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'deleteDia',
    props: {
      dialogVisible: {
        type: Boolean,
        required: true
      },
    //   speciallist:{
    //     type: Array,
    //     required: true
    //   },
      categoryid:{
        type: String,
        required: true
      }
    },
    components:{

    },
    // inject: ['reload'],
    data () {
      return {
      }
    },

    methods:{
       delOrder() {
      // 删除  提交
      let that = this;
      this.$axios({
        url:
          "http://www.zjcoldcloud.com/bqs/backend/web/index.php/knight/delete",
        method: "post",
        data: JSON.parse(this.categoryid),
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
        if (res.data.code == 0) {
          that.$message("删除成功");
          that.$emit('changeCart');/*向父组件派发事件，同时传递参数event.target,后面的参数的个数不限*/
        } else if (res.data.code == "450") {
          that.$message("暂无权限");
        }
      });
    },
    }
  }
</script>
<style scoped>

</style>
