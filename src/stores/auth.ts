import { acceptHMRUpdate, defineStore } from "pinia";

export const useAuthStore= defineStore('auth',{
    state:() => ({
        isAuthenticate: false,
        
    })
})