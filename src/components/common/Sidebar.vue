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
      //     icon: "el-icon-edit",
      //     action: "readme",
      //     name: "首页",
      //     son:[{
      //       action:"baseCharts",
      //       name:"李洋"
      //     }]
      //   },
      //   {
      //     icon: "el-icon-document",
      //     action: "2",
      //     name: "系统设置",
      //     son: [
      //       {
      //         action: "basetable",
      //         name: "用户管理"
      //       },
      //       {
      //         action: "vuetable",
      //         name: "角色管理"
      //       },
      //       {
      //         action: "power",
      //         name: "权限管理"
      //       },
      //       {
      //         action: "compony",
      //         name: "公司管理"
      //       }
      //     ]
      //   },
      //   {
      //     icon: "el-icon-menu",
      //     action: "3",
      //     name: "冰骑士",
      //     son: [
      //       {
      //         action: "oldCharts",
      //         name: "冰骑士管理"
      //       }
      //     ]
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
     this.items = JSON.parse(window.sessionStorage.getItem("items"));

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
