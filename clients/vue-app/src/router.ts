import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Thread from './views/Thread.vue';

Vue.use(Router);

const router: Router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        guest: true,
      },
    },
    {
      path: '/:descriptor',
      name: 'thread-detail',
      component: Thread,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const credential = localStorage.getItem('credential');

    if (!credential) {
      return next({
        path: '/login',
      });
    }
  }

  next();
});

export default router;
