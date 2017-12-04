import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
      children: [
        {
          path: 'audio-list',
          name: 'audio-list',
          component: require('@/components/LandingPage/AudioList').default
        },
        {
          path: 'listened',
          name: 'listened',
          component: require('@/components/LandingPage/Listened').default
        }
      ]
    },
    {
      path: '*',
      redirect: 'audio-list'
    }
  ]
})
