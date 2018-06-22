<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
export default {
  components: {
    vHead,
    vSidebar
  },
  beforeCreate() {
    let token = window.sessionStorage.getItem("token");
    if (token == "" || token == undefined) {
      this.$router.push("/");
    }
  }
};
</script>
