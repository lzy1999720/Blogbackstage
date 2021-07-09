<template>
  <div class="login-box">
    <h2>blog</h2>
    <form>
      <div class="user-box">
        <input ref="user" type="text" name="user" autocomplete="off">
        <label>用户名</label>
      </div>
      <div class="user-box">
        <input ref="password" type="password" name="password" autocomplete="off">
        <label>密码</label>
      </div>
      <a @click="signin">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        登 录
      </a>
    </form>
  </div>
</template>
  
<script>

import { signin } from 'network/login.js'
import { analysis } from 'common/utils.js'


export default {
  name: 'signin',
  data () {
    return {
    }
  },
  methods: {
    signin () {
      let user = this.$refs.user.value
      let password = this.$refs.password.value
      if (this.$refs.user.value == '' || this.$refs.password.value == '') {
        this.$message.error('账号或密码不能为空！');
        return;
      }
      signin(user, password).then(res => {
        if (res.state) {
          sessionStorage.setItem('token', res.token);
          sessionStorage.setItem('tokeninfo', analysis(res.token).user);
          this.$store.commit("updateduser", analysis(res.token).user)
          this.$router.replace('/index');
          this.$message.success(res.msg);
          return
        }

        this.$message.error(res.msg);
        return
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
@import url('~assets/css/signin.css');
</style>