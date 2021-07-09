<template>
  <div class="main">
    <header-menu />
    <el-container class="conmain">
      <tab-bar />
      <el-container>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HeaderMenu from "./Subcomponents/header.vue";
import ArticlesAdmin from "views/articlesadmin/ArticlesAdmin.vue";
import PowerAdmin from "views/poweradmin/PowerAdmin.vue";
import TabBar from "components/common/tabbar/TabBar.vue";
export default {
  name: "index",
  components: {
    HeaderMenu,
    ArticlesAdmin,
    PowerAdmin,
    TabBar,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
.el-main {
  background-color: white;
}
.el-menu {
  border: none;
}
.conmain {
  height: calc(100vh - 49px);
}
</style>