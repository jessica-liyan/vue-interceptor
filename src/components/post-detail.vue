<template>
  <div class="article">
    <div v-if="article">
      <h2 class="article-tit">{{article.title}}</h2>
      <div class="article-tips">
        <a :href="`#/info/user/${article.author._id}`" target="_blank"><i class="round" v-if="article.author.avatar"><img :src="`${base}/${article.author.avatar}`" alt=""></i></a>
        <div class="ib v-m">
          <p class="fs-16 c-3 mb-5">
            {{article.author.name}}
          </p>
          <p class="fs-12 c-9">
            <i>{{article.created_at | getDateTime()}}</i>
            <i>阅读 {{article.viewsCount}}</i>
            <i>评论 {{article.commentsCount}}</i>
            <i>喜欢 {{article.collectionCount}}</i>
            <router-link :to="{'path': `/editor/${article._id}`}" class="c-blue mr-10" v-if="isMyArticle">编辑</router-link>
            <a href="javasricpt:;" v-on:click="del" v-if="isMyArticle" class="fs-12 c-blue">删除</a>
          </p>
        </div>
      </div>
      <div class="t-c">
        <img v-if="article.cover" :src="`${base}/${article.cover}`" style="max-width:100%;">
      </div>
      <mavon-editor v-model="article.content"
        :boxShadow="false"
        :editable="false"
        :toolbarsFlag="false"
        :subfield="false"
        defaultOpen="preview"
        class="blank"
      />
    </div>
    <div v-else class="null">
      <img src="../assets/img/blank.png" alt="">
      <p>文章不存在！</p>
    </div>
  </div>
</template>

<script>
import {base, deleteArticle, fetchSelf} from '../api/index.js'
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'post-detail',
  data () {
    return {
      isMyArticle: false,
      base,
    }
  },
  created () {
    this.fetchArticleDetail(this.$route.query.id)

    if(this.article){
      this.judge()
    }    
  },
  computed:{
    ...mapState(['article']),
  },
  methods: {
    ...mapMutations(['fetchArticleDetail']),
    judge () {
      // 判断是否作者本人
      if(this.article.author._id === localStorage.getItem('userId')){
        this.isMyArticle = true
      } else {
        this.isMyArticle = false
      }
    },
    del () {
      if(confirm('删除文章后不可恢复，确定删除吗？')){
        deleteArticle(this.$route.query.id).then(res => {
          console.log(res)
          if (res.status === 0) {
            this.$message({
              message: res.msg,
              type: 'error',
              showClose: true
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'success',
              showClose: true
            })
            this.$router.go(-1)
          }
        })
      }
    }
  },
  watch: {
    article () {
      this.judge()
    }
  }
}
</script>

<style lang="scss">
.article{
  width:70%;
  margin:0 auto;
  text-align:left;
  .article-tit{
    font-size:20px;
    color:#333;
    font-weight:bold;
    margin:0;
    padding-top:30px;
  }
  .article-tips{
    border-bottom:1px solid #ddd;
    padding:20px 0 15px 0;
    margin-bottom:20px;
    i{
      margin-right:10px;
    }
  }
  .blank{
    .v-note-panel{
      border:0!important;
    }
    .v-show-content{
      background:#fff!important;
    }
  }
}
</style>