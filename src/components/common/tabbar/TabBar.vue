<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="1">
          <tab-bar-item path="/articlesAdmin">
            <div slot="tabbaritem">
              <i class="el-icon-location"></i>
              <span>博文管理</span>
            </div>
          </tab-bar-item>
        </el-menu-item>
        <el-menu-item index="2">
          <tab-bar-item path="/commentadmin">
            <div slot="tabbaritem">
              <i class="el-icon-menu"></i>
              <span>评论管理</span>
            </div>
          </tab-bar-item>
        </el-menu-item>
        <el-menu-item index="3">
          <tab-bar-item path="/useradmin">
            <div slot="tabbaritem">
              <i class="el-icon-document"></i>
              <span>用户管理</span>
            </div>
          </tab-bar-item>
        </el-menu-item>
        <el-menu-item index="4">
          <tab-bar-item path="/poweradmin">
            <div slot="tabbaritem">
              <i class="el-icon-setting"></i>
              <span>权限管理</span>
            </div>
          </tab-bar-item>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import TabBarItem from "../tabaritem/TabBarItem.vue";
export default {
  name: "TabBar",
  data () {
    return {};
  },
  components: {
    TabBarItem,
  },
  methods: {},
};
</script>

<style>
.tac {
  width: 200px;
  background-color: #545c64 !important;
  height: calc(100vh - 49px);
}
</style>
