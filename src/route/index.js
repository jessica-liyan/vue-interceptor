import VueRouter from 'vue-router'

const router = new VueRouter({
  linkActiveClass: 'active',
  routes: [
    { 
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      component: () => import('../components/home.vue')
    },
    {
      path: '/login',
      component: () => import('../components/login.vue')
    },
    {
      path: '/register',
      component: () => import('../components/register.vue')
    },
    {
      path: '/post',
      component: () => import('../components/post.vue')
    },
    {
      path: '/post/detail',
      component: () => import('../components/post-detail.vue'),
    },
    {
      path: '/user/:id',
      component: () => import('../components/user.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  // 前台的路由白名单(登录，注册，文章列表，文章详情)
  const whiteList = ['/login', '/register', '/post', '/post/detail']

  if (localStorage.getItem('token')) {
    // 有token
    if (to.name === 'login') {
      next('/home')
    } else {
      // 此处可增加权限判断
      next()
    }
  } else {
    // 无token 
    // 不在白名单，路由守卫
    if (whiteList.indexOf(to.path) === -1) { 
      next('/login')
    } else {
      next()
    }
  }
})

export default router