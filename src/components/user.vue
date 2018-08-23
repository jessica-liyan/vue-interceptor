<template>
  <div class="user">
    <div class="user-header">
      <div><span class="round middle" v-if="user.avatar"><img :src="`${base}/${user.avatar}`" alt=""></span></div>
      <div class="flex-1 ml-10">
        <h2>{{user.name}}</h2>
        <p class="fs-14 c-9">
          <img src="../assets/img/job.png" alt="">
          <span class="v-m ml-10 mr-20" v-if="user.job">{{user.job}}</span>
          <span class="v-m ml-10 mr-20" v-else>暂无职位</span>
          <img src="../assets/img/desc.png" alt="">
          <span class="v-m ml-10" v-if="user.selfDesc">{{user.selfDesc}}</span>
          <span class="v-m ml-10" v-else>暂无简介</span>
        </p>
      </div>
      <dl class="t-c" style="margin:0 30px;cursor:pointer" >
        <dt class="fs-18 c-3">{{user.followeesCount}}</dt>
        <dd class="fs-14 c-9">关注</dd>
      </dl>
      <dl class="t-c" style="margin:0 30px;cursor:pointer" >
        <dt class="fs-18 c-3">{{user.followersCount}}</dt>
        <dd class="fs-14 c-9">粉丝</dd>
      </dl>
      <el-button type="primary" plain v-if="isMine">编辑个人资料</el-button>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {getUser, base} from '../api/index.js'

export default {
  name: 'user',
  data () {
    return {
      user: {},
      base,
      isMine: false
    }
  },
  created () { 
    this.fetch(this.$route.params.id)
    if(this.$route.params.id === localStorage.getItem('userId')){
      this.isMine = true
    } else {
      this.isMine = false
    }
  },
  methods: {
    fetch (id) {
      getUser(id).then(res => {
        this.user = res.data
      })
    }
  },
  watch: {
    $route (to, from) {
      this.fetch(to.params.id)
    }
  }
}
</script>

<style lang="scss">
.user-header{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding:20px 0;
  .round{
    display:inline-block;
    vertical-align:middle;
    width:100px;
    height:100px;
    border-radius: 50%;
    overflow: hidden;
    border:1px solid #dcdcdc;
    text-align:center;
    img{
      width:100%;
    }
  }
  h2{
    display:inline-block;
    vertical-align:middle;
    font-size: 20px;
    font-weight: normal;
    color: #333;
  }
}

</style>
