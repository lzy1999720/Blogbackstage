<template>
  <div class="header">
    <el-row class="demo-avatar demo-basic">
      <el-col :span="22">
        <el-header height="49px">博客后台管理</el-header>
      </el-col>
      <el-col :span="2">
        <div class="rightavatar">
          <el-tooltip class="item" effect="dark" :content="users" placement="left-start">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <el-avatar class="avatar" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar><i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="clearfix" @click.native="signout">
                  退出
                </el-dropdown-item>
                <!-- <el-dropdown-item class="clearfix">
                回复
                <el-badge class="mark" :value="3" />
              </el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </el-tooltip>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { mapState } from "vuex";
export default {
  name: 'headermenu',
  data () {
    return {
      users: '欢迎你 '
    }
  },
  computed: {
    ...mapState(['user']),
  },
  created () {
    this.users += this.user ? this.user : window.sessionStorage.getItem('tokeninfo')
  },
  methods: {
    signout () {                             //退出
      window.sessionStorage.clear();
      this.$router.replace('/signin');
    }
  }
}
</script>

<style>
.header {
  background-color: aquamarine;
}
.avatar {
  margin-top: 5px;
  line-height: 49px;
}

.el-header,
.rightavatar {
  padding: 0;
  height: 49px;
  line-height: 49px;
}
</style>
