<template>
  <div class="page flex-v h">
    <div class="header flex-h just-between align-center">
      <div>
        <router-link to="/home">首页</router-link>
        <router-link to="/post">文章</router-link>
      </div>
      <div v-if="!user">
        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>
      </div>
      <div v-else>
        <el-popover
          placement="bottom"
          trigger="hover"
          v-if="user"
          >
          <div class="header-list">
            <router-link :to="`/user/${user._id}`">个人中心</router-link>
            <a href="javascript:;" @click="loginout">退出登录</a>
          </div>
          <el-button slot="reference" type="text" v-if="user">
            <span class="round middle" v-if="user.avatar"><img :src="`${base}/${user.avatar}`" alt=""></span>
            <span class="fs-16 c-f ml-10">{{user.name}}</span>
          </el-button>
        </el-popover>
      </div>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {base} from './api/index.js'

export default {
  name: 'app',
  data () {
    return {
      base: base
    }
  },
  created () {
    if(localStorage.getItem('token')){
      this.fetchSelf()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapMutations(['fetchSelf', 'logout']),
    loginout () {
      this.logout()
      this.$router.push('/login')
    }
  },
  watch: {
    $route (to, from) {
      if(localStorage.getItem('token')){
        this.fetchSelf()
      }
    }
  }
}
</script>

<style lang="sass">
@import './assets/css/app.scss';
</style>
