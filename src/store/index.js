import Vue from 'vue'
import vuex from 'vuex'
import {getSelf, getArticleDetail, logout} from '../api/index.js'
Vue.use(vuex)

export default new vuex.Store({
  state:{
    article: null,
    user: null, // 登录用户的个人信息
  },
  getters: {
  },
  mutations: {
    fetchSelf (state) {
      getSelf().then(res => {
        state.user = res.data
      })
    },
    fetchArticleDetail (state, id) {
      getArticleDetail(id).then(res => {
        state.article = res.data
      })
    },
    logout (state) {
      logout().then(res => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        state.user = null
      })
    }
  }
})