<template>
  <div class="bg-black header">
    <h1 class="logo">CMS后台管理系统</h1>
    <div class="login-box">
      <p class="logined">已登录</p>
      <p class="btn" @click="loginout">退出</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    loginout () {
      this.$service.login.logout()
      .then(res => {
        window.location = 'http://cms.biyao.com/index.html'
      })
      // this.$utils.clearCookie('aut')
      // if (Vue.config.productionTip) {
      //   this.$router.push('http://cms.biyao.com/index.html')
      // }else {
      //   this.$router.push('http://cms.biyao.com/index.html')
      // }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header { position: fixed; left: 0; top: 0;z-index:1001;font-size: 18px;  width: 100%; height: 60px; line-height: 60px; color: #fff }
.logo { float: left; margin-left: 120px;font-size: 18px; font-size: 20px;}
.login-box { display: flex; float: right; padding-right: 90px;}
.logined { background: url('http://cms.biyao.com/images/loginIcon.png') center left no-repeat; background-size: 30px;}
.login-box p { padding-left: 40px;}
.login-box .btn { cursor: pointer;}

</style>
