// import { ImportMeta } from './../vite-env.d';
import { createRouter, createWebHistory } from 'vue-router';
// import { useAuthStore } from '@/stores/auth';
// import { SuperAdminRouter } from '@/router/superadmin';
// import { AdminRouter } from '@/router/admin';
// import { AccessorRouter } from '@/router/accessor';
// import { VerificatorRouter } from '@/router/verificator';
// import { EmployeeRouter } from '@/router/employee';
// import { notification } from 'ant-design-vue';
// import { GetProfile } from "@/services/profile/GetSpecifiedProfile";

import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';


const url = import.meta.env.VITE_SERVICE_ENDPOINT

declare module 'vue-router' {
  interface RouteMeta {
      requiresAuth: boolean,
      isSuperAdmin?: boolean,
      isMember?: boolean,
      documentTitle?: string,
      role?: string,
  }
}

// const getbyid = new GetProfile();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // component: () => import ("@/views/Auth/index.vue"),
      name: "basePath",
      redirect: { name: "auth/login" },
      meta: {
        requiresAuth: false,
      },
      children: []
    },
    // },
    {
      path: '/auth',
      component: () => import("@/views/Auth/index.vue"),
      name: 'auth',
      meta: {
        requiresAuth: false,
      }
    }, 
    // {
    //   path: '/auth/register',
    //   component: () => import("@/views/Auth/Register.vue"),
    //   meta: {
    //     requiresAuth: false,
    //   }
    // },
    // {
    //   path: '/403',
    //   name: 'AccessDenied',
    //   component: () => import('@/views/Errors/AccessDenied.vue'),
    //   meta: {
    //     requiresAuth: false,
    //     breadCrumbs: []
    //   }
    // },
    // {
    //   path: '/2xx',
    //   name: 'UnderConstruction',
    //   component: () => import('@/views/Errors/UnderConstruction.vue'),
    //   meta: {
    //     requiresAuth: false,
    //     breadCrumbs: []
    //   }
    // },
    // {
    //   path: '/:catchAll(.*)',
    //   name: 'PageNotFound',
    //   component: () => import('@/views/Errors/PageNotFound.vue'),
    //   meta: {
    //     requiresAuth: false,
    //     breadCrumbs: []
    //   }
    // },
    // ...SuperAdminRouter, 
    // ...AdminRouter, 
    // ...AccessorRouter, 
    // ...VerificatorRouter, 
    // ...EmployeeRouter
  ]
})

export default router
