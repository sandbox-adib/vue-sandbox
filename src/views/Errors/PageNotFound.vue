<template>
    <div class="max-w-screen h-screen flex flex-row items-center justify-center">
        <div class="w-1/2 h-auto flex flex-col space-y-4">
            <div class="grid grid-cols-3 divide-x-2 divide-gray-700">
                <div class="col-start-1">
                    <div class="container px-5 flex justify-end">
                        <h1 class="font-extrabold text-6xl text-ellipsis">404</h1>
                    </div>
                </div>
                <div class="col-span-2 space-y-2">
                    <div class="container px-5 flex justify-start">
                        <h1 class="font-extrabold text-6xl text-ellipsis">Page Not Found</h1>
                    </div>
                    <div class="container px-5 flex justify-start">
                        <h2 class="font-semibold text-normal text-ellipsis text-gray-700">Please check the URL in the address bar and try again.</h2>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-3 divide-x-2 divide-gray-700">
                <div class="col-start-2 col-span-2">
                    <!-- <div class="container px-5 flex justify-start">
                        <router-link :to="`${redirectUrl}`" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">back</router-link>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    // import { ref, computed } from "vue";
    // import { useAuthStore, type AuthState } from '@/stores/auth';

    // const authData = useAuthStore();
    // const role = authData.result.role.main;
    // console.log(role)

    // const redirectUrl: string = computed(() => {
    //     return role === undefined ? '/' : '/dashboard' + role;
    // });
</script>