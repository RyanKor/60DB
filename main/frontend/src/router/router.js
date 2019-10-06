import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";
import Home from "../views/Home.vue";
import store from "../store/store.js";

import {requireAuth, checkProfile} from './functions.js';
Vue.use(Router);

const router =  new Router({
  hashbang: false,
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/card",
      name: "card",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/Card.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue")
    },
    {
      path: "/survey",
      beforeEnter: ((to, from, next) => {
        if(requireAuth() === 'login')
        {
          store.dispatch('getProfileInfo')
          .then(data => {

            let check = checkProfile();

            if(!check)
            {
              alert('프로필을 다 입력해주세요.');
              next('/profileupdate');
            }
            else{
              next();
            }
          })
        }
        else{
          next('/');
        }
      }) ,
      redirect: "/sec1",
      name: "survey",
      component: () => import("../views/Survey.vue"),
      children: [
        {
          path: "/sec1",
          name: "sec1",
          meta: {
            page: 1
          },
          component: () => import("../components/surveyPage/Sec1.vue")
        },
        {
          path: "/sec2",
          name: "sec2",
          meta: {
            page: 2
          },
          component: () => import("../components/surveyPage/Sec2.vue")
        },
        {
          path: "/sec3",
          name: "sec3",
          meta: {
            page: 3
          },
          component: () => import("../components/surveyPage/Sec3.vue")
        },
        {
          path: "/sec4",
          name: "sec4",
          meta: {
            page: 4
          },
          component: () => import("../components/surveyPage/Sec4.vue")
        },
        {
          path: "/sec5",
          name: "sec5",
          meta: {
            page: 5
          },
          component: () => import("../components/surveyPage/Sec5.vue")
        },
        {
          path: "/sec6",
          name: "sec6",
          meta: {
            page: 6
          },
          component: () => import("../components/surveyPage/Sec6.vue")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue")
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/Signup.vue")
    },
    {
      path: "/profileupdate",
      name: "profileupdate",
      // beforeEnter: requireAuth(),
      beforeEnter: async (to, from, next) => {
        if(requireAuth() === 'login')
        {
          store.commit('SET_LOADING', true);
          // bus.$emit('on:progress');
          await store.dispatch("getProfileInfo")
          next();
        }
        else{
          next('/');
        }
      },
      component: () => import("../views/ProfileUpdate.vue")
    },
    {
      path: "/profiles",
      name: "profiles",
      beforeEnter: (to, from, next) => {
        // console.log('등장');
        if(requireAuth() === 'login'){
          store.commit('SET_LOADING', true);
          // bus.$emit('on:progress');
          store.dispatch("getProfileInfo")
          .then(next());
        }
        else{
          next('/');
        }
      },
      component: () => import("../views/Profiles.vue")
    },
    {
      path: "/stomach/:id",
      name: "stomach-retrieve",
      beforeEnter: async (to, from, next) => {
        
        if(requireAuth() === 'login'){
          store.commit('SET_LOADING', true);
          //a bus.$emit('on:progress');
          await store.dispatch("getProfileInfo")
          await store.dispatch("getStomachInfo", to.params.id)
          next();
        }
        else{
          next('/');
        }
      },
      component: () => import("../views/Result.vue"),
    },
    {
      path: "/surveys",
      name: "survey-history",
      beforeEnter: (to, from, next) => {
        if(requireAuth() === 'login')
        {
          store.commit('SET_LOADING', true);
          // bus.$emit('on:progress');
          store.dispatch('getSurveyHistory')
          .then(next())
        }
        else{
          next('/');
        }
      },
      component: () => import("../views/SurveyList.vue")
    },
    {
      path : '*',
      beforeEnter : (to, from, next) => {
        alert("요청하시는 주소는 없는 주소입니다.");
        next('/');
      }
    },
  ]
});

router.beforeEach(async (to, from, next) => {
  store.commit('SET_LOADING', true);
  store.dispatch('getMemberInfo')
  // .then(() => {
  //   store.commit('SET_LOADING', false);
  //   next();
  // })
  setTimeout(function(){
    store.commit('SET_LOADING', false);
    next();
  }, 500)
});

export default router;


