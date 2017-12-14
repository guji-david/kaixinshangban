import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import FourTofour from '../components/fourTofour.vue'//404
import Main from '../pages/main/main.vue'//主页面
import Factory from '../pages/factory/factory.vue'//主页面
import Job from '../pages/job/job.vue'//就业岗位
import AboutUs from '../pages/aboutUs/aboutUs.vue'//主页面

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/factory',
      name: 'Factory',
      component: Factory
    },
    {
      path: '/job',
      name: 'Job',
      component: Job
    },
    {
      path: '/aboutUs',
      name: 'AboutUs',
      component: AboutUs
    },
    {
      path: '*',
      name: 'FourTofour',
      component: FourTofour
    },


  ]
});
export default router
