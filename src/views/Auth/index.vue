<template>
    <div class="grid grid-cols-12 min-height-full">
        <div class="col-span-5 min-h-[100vh] bg-green-300 py-12 flex justify-end">        
        <!-- <div class="col-span-5 min-h-[100vh] bg-green-300 py-12 pl-12 xl:pl-52 2xl:pl-104">         -->
            <div class="block p-6 max-w-[500px] h-full flex-auto bg-green-300 ml-12 rounded-tl-lg rounded-bl-lg drop-shadow-[-25px_1px_35px_rgba(0,0,0,0.25)] dark:bg-gray-800 dark:border-gray-700">
                <div class="flex justify-center items-center h-full">
                    <div class="flex flex-col items-center justify-center">
                        <img src="@/assets/vite.svg" class="w-24" alt="">
                        <h3 class="mt-4">StudyCase Vite Vue + Typescript + Tailwinds</h3>
                        <!-- <h3 class="mt-12">Thanks</h3>
                        <img src="@/assets/logo-dummy-api.png" class="w-14 mt-4" alt="">
                        <a href="https://dummyapi.io/docs" class="mt-4 text-blue-300 hover:text-blue-500">dummyapi.io</a> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-7 min-h[100vh] py-12 flex justify-start">
        <!-- <div class="col-span-7 min-h[100vh] py-12 pr-12 xl:pr-52 2xl:pr-104"> -->
            <div class="block p-6 h-full max-w-[780px] mr-12 flex-auto bg-white rounded-tr-lg rounded-br-lg drop-shadow-[25px_1px_35px_rgba(0,0,0,0.25)] dark:bg-gray-800 dark:border-gray-700">
                <div class="flex items-center justify-center flex-col px-24 h-full">
                    <h1 class="font-bold text-2xl capitalize mb-4">{{ isLogin ? 'login' : 'register' }}</h1>
                    <a-form
                        :model="formState"
                        name="basic"
                        layout="vertical"
                        class="w-full flex-col space-y-4"
                        :label-col="{ span: 5 }"
                        :wrapper-col="{ span: 17 }"
                        autocomplete="off"
                        @finish="onSubmit"
                        @finishFailed="onFinishFailed">
                        <a-form-item
                            label="Name"
                            name="name"
                            v-if="!isLogin"
                            :rules="[{ required: true, message: 'Please input name', trigger: 'blur' }, ]"
                            >
                            <a-input 
                                v-model:value="formState.name"  
                                placeholder="Name" />
                        </a-form-item>
                        <a-form-item 
                            name="email" 
                            label="Email"
                            :rules="[{ required: true, message: 'Please input email', trigger: 'blur' }, ]">
                            <a-input 
                                v-model:value="formState.email" 
                                type="text"
                                placeholder="Email" />
                        </a-form-item>
                        <a-form-item
                            label="Phone"
                            name="phone"
                            v-if="!isLogin"
                            :rules="[
                                { required: true, message: 'Please input phone', trigger: 'blur' },
                                { len: 10, message: 'Please input 10 number', trigger: 'blur' },
                            ]"
                            >
                            <a-input 
                                v-model:value="formState.phone" 
                                placeholder="Phone" />
                        </a-form-item>
                        <a-form-item 
                            label="Password" 
                            name="password"
                            :rules="[{ required: true, message: 'Please input password', trigger: 'blur' }, ]"
                        >
                            <a-input 
                                v-model:value="formState.password" 
                                placeholder="Password" />
                        </a-form-item>
                        <a-form-item 
                            label="Password Confirmation" 
                            name="password_confirmation"
                            v-if="!isLogin" 
                            :rules="[{ required: true, message: 'Please input password confirmation', trigger: 'blur' }, ]">
                                <a-input 
                                    v-model:value="formState.password_confirmation" 
                                    placeholder="Password Confirmation" />
                        </a-form-item>
                        <!-- <div class="text-right"> -->
                            <a-button class="bg-green-300 w-full" :loading="isLoading" html-type="submit">Submit</a-button>
                        <!-- </div> -->
                    </a-form>
                    <div class="w-full text-right mt-4">
                        <h4>{{ isLogin ? "Don't have an account?" : 'Already have an account?' }} <span class="text-blue-400 cursor-pointer" @click="isLogin = !isLogin">{{ isLogin ? 'register' : 'login' }}</span></h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">  
import { reactive, ref } from 'vue'
import {RegisterService} from "@/services/Auth/RegisterService"
import {LoginService} from "@/services/Auth/LoginService"
import { notification } from "ant-design-vue"
import { useAuthStore } from "@/stores/auth";
// import { GetArticle } from "@/services/Article/GetList";

const isLogin = ref(true) 
const formState = reactive({
    name: 'adib',
    email: 'adib@gmail.com',
    phone: '08158282828',
    password: 'sarirejo',
    password_confirmation: 'sarirejo',
})
const registerService = new RegisterService()
const loginService = new LoginService()
// const getArticle = new GetArticle()
const authStore = useAuthStore()
const isLoading = ref(false)

const onSubmit = async(values: any) => {
    let res
    try 
    {
        //   console.log('asdf');
        // let a =  await getArticle.getList({})
        // console.log("a");
        // console.log(a);
        // console.log('asdf1');
        // return
        isLoading.value = true
        if ( isLogin.value )
        {
            res = await loginService.authenticate({
                email: values.email,
                password: values.password,
            })
        } else {
            res = await registerService.register({...values})
        }

        authStore.setToken(res, isLogin.value ? 'login' : 'register')
        notification.success({
            message: "Login success",
        })
        // isLoading.value = false
    } catch (error) {
        console.log("error");
        console.log(error);
        
        notification.error({
            message: "Registration failed",
        })
    }
    isLoading.value = false
}
</script>

<style>
.ant-col {
    max-width: 100%!important;
}
.ant-input {
    border-radius: 4px!important;
}
</style>