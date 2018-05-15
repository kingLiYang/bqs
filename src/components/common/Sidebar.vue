<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.son">
                    <el-submenu :index="item.action">
                        <template slot="title"><i :class="item.icon"></i>{{ item.name }}</template>
                        <el-menu-item v-for="(subItem,i) in item.son" :key="i" :index="subItem.action">{{ subItem.name }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.action">
                        <i :class="item.icon"></i>{{ item.name }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
  data() {
    return {
      items:[]
      // items: [
      //   {
      //     icon: "el-icon-setting",
      //     index: "readme",
      //     title: "首页"
      //   },
      //   {
      //     icon: "el-icon-menu",
      //     index: "2",
      //     title: "系统设置",
      //     subs: [
      //       {
      //         index: "basetable",
      //         title: "用户管理"
      //       },
      //       {
      //         index: "vuetable",
      //         title: "角色管理"
      //       },
      //       {
      //         index: "power",
      //         title: "权限管理"
      //       },
      //       {
      //         index: "compony",
      //         title: "公司管理"
      //       }
      //     ]
      //   },
      //   {
      //     icon: "el-icon-date",
      //     index: "3",
      //     title: "转运中心",
      //     subs: [
      //       {
      //         index: "baseform",
      //         title: "站点任务管理"
      //       },
      //       {
      //         index: "vueeditor",
      //         title: "指派任务"
      //       }
      //     ]
      //   },
      //   {
      //     icon: "el-icon-star-on",
      //     index: "basecharts",
      //     title: "图表"
      //   },
      //   {
      //     icon: "el-icon-upload2",
      //     index: "drag",
      //     title: "拖拽"
      //   }
      // ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created(){
    this.items = this.$route.query.menu;
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 250px;
  left: 0;
  top: 70px;
  bottom: 0;
  background: #2e363f;
}
.sidebar > ul {
  height: 100%;
}
</style>
