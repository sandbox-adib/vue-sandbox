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
      component: () => import ("@/views/Auth/Login.vue"),
      name: "basePath",
      redirect: { name: "auth/login" },
      meta: {
        requiresAuth: false,
      },
      children: []
    },
    // },
    // {
    //   path: '/auth/login',
    //   component: () => import("@/views/Auth/Login.vue"),
    //   name: 'auth/login',
    //   meta: {
    //     requiresAuth: false,
    //   }
    // }, 
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

const notify = (type: string, message: string) => {
  // @ts-ignore
  notification[type]({
      content: message,
      // meta: "notification-service",
      duration: 2500,
      keepAliveOnHover: true
    })
}

const roleuser = () =>{
  // @ts-ignore
  const rolenow = currentUser.$state.result?.role.main ;
  return rolenow ;
}

//@-ts-ignore
const testauth = async (authStore:any) => {
  // @ts-ignore
  const usernow = authStore.$state.result?.user.id;
  
  try {
     const res = await getbyid.getById(usernow)
    //  console.log(res)
    } catch (error) {
    console.log(error)
    window.location.href = '/auth/login';
    alert("Sesi telah berakhir, silahkan Login kembali!")
  }
  
}


/**
 * protecting auth / secured spa endpoint
 */
router.beforeEach((to, from, next) => {
  console.log('checking auth in router.....');
  const authStore       = useAuthStore();
  // @ts-ignore
  const rolenow = authStore.$state.result?.role.main ;
  // console.log(rolenow);
  
  const guestPath    = ['/auth/login', '/auth/register', '/chart', '/mapschart-pangkat', '/mapschart-golongan'];
  
  var currentUrl: string = window.location.pathname;
  
    if(!guestPath.includes(currentUrl)){
      if ((rolenow == '') || ( rolenow == null ))
      {
        // console.log('get out!!')
        window.location.href = '/auth/login';
      }
      else{
        testauth(authStore);
      }

    } 
    // else {
    //   if ((rolenow != null) )
    //   {
    //     window.location.href = '/dashboard/'+rolenow;
    //   }
      
    // }

 




  const requiredAuthorization = !guestPath.includes(to.path);
  const isAuthenticated       = authStore.isAuthenticated ? true : false;
  if(requiredAuthorization && !isAuthenticated){
    next('/auth/login')
  } else {
    next()
  }
});

router.afterEach((to, from) => {
  document.title = (to.meta.documentTitle as string);
  const authStore       = useAuthStore();

  // // @ts-ignore
  // if(authStore.$state.result?.role.main !== to.meta.role){
  //   console.log('TANGKAP!!!');
  //   // @ts-ignore
  //   console.log(authStore.$state.result?.role.main)

  //   console.log(to.meta.role)
  //   router.push({name: "AccessDenied"})
    
  // } else {
  //   return to.fullPath
  // }


  switch (to.meta.role) {
    case 'superadmin':
      // @ts-ignore
      if(authStore.$state.result?.role.main !== to.meta.role){
        console.log("Selamat Datang di SI Arsiparis:");
        console.log(authStore.$state.result);
        // @ts-ignore
        // console.log(authStore.$state.result?.role.main)
        router.push({name: "AccessDenied"})
      } else {
        return to.fullPath
      }
      break;
    case 'pegawai':
      // @ts-ignore
      if(authStore.$state.result?.role.main !== to.meta.role){
        // @ts-ignore
        // console.log(authStore.$state.result?.role.main)
        router.push({name: "AccessDenied"})
      } else {
        return to.fullPath
      }
      break;
  }
})



export default router
