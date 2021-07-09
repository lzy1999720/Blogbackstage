import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.replace

VueRouter.prototype.replace = function replace (location) {                //解决路由多次切换报错
  return originalPush.call(this, location).catch(err => err)
}

const ArticlesAdmin = () => import('views/articlesadmin/ArticlesAdmin.vue')
const Poweradmin = () => import('views/poweradmin/PowerAdmin.vue')
const CommentAdmin = () => import('views/commentadmin/commentAdmin.vue')
const UserAdmin = () => import('views/useradmin/UserAdmin.vue')
const Signin = () => import('views/login/signin.vue')
const Index = () => import('views/index/Index.vue')

Vue.use(VueRouter)


const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/signin'
    },
    {
      path: '/index',
      component: Index,
      redirect: '/articlesAdmin',
      children: [
        {
          path: '/articlesAdmin',
          component: ArticlesAdmin
        },
        {
          path: '/commentadmin',
          component: CommentAdmin
        },
        {
          path: '/useradmin',
          component: UserAdmin
        },
        {
          path: '/poweradmin',
          component: Poweradmin
        },
      ]
    },
    {
      path: '/signin',
      component: Signin
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.path == '/signin') {
    next()
  } else {
    const token = window.sessionStorage.getItem('token')
    if (!token) {
      next('/signin')
    } else {
      next()
    }
  }
})

export default router