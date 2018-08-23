<template>
  <div>
    <el-tabs v-model="type" @tab-click="handleTypeChange">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="前端" name="frontend"></el-tab-pane>
      <el-tab-pane label="android" name="android"></el-tab-pane>
      <el-tab-pane label="ios" name="ios"></el-tab-pane>
      <el-tab-pane label="后端" name="backend"></el-tab-pane>
    </el-tabs>
    <ul class="list" v-if="list.length">
      <li v-for="(item, index) of list" style="padding:10px 0;">
        <div class="wrap flex-h">
          <div class="square" v-if="item.cover"><img :src="`${base}/${item.cover}`" alt="" class="w"></div>
          <div>
            <router-link :to="{'path': `/post/detail?id=${item._id}`}" class="link">{{item.title}}</router-link>
            <p class="fs-12 c-9 mt-10">
              <span class="round small"><img :src="`${base}/${item.author.avatar}`" alt=""></span>
              <span class="mr-10">{{item.author.name}}</span>
              <span class="mr-10">{{item.created_at | getDateTime()}}</span>
              <span class="mr-10">阅读 {{item.viewsCount}}</span>
              <span class="mr-10">评论 {{item.commentsCount}}</span>
              <span>喜欢 {{item.collectionCount}}</span>
            </p>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="null">
      <img src="../assets/img/blank.png" alt="">
      <p>暂无文章哦</p>
    </div>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import {base, getArticle, getSubArticle} from '../api/index.js'

export default {
  name: 'post',
  data () {
    return {
      list: [],
      type: 'all',
      total: 0,
      size: 8,
      base,
      currentPage: 1
    }
  },
  created () {
    this.type = this.$route.query.type || 'all'
    this.fetch()
  },
  methods: {
    fetch () {
      if(this.type === 'all') {
        getArticle(this.currentPage, this.size).then(res => {
          this.list = res.data
          this.total = res.total
        })
      } else {
        getSubArticle(this.type, this.currentPage, this.size).then(res => {
          this.list = res.data
          this.total = res.total
        })
      }
    },
    handleCurrentChange (val) {
      this.fetch()
    },
    handleTypeChange (tab, event) {
      this.$router.push(`/post?type=${this.type}`)
      this.fetch()
    }
  }
}
</script>

<style>
.square{
  width:120px;
  height:80px;
  overflow: hidden;
  margin-right:20px;
}
</style>
