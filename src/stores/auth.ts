import { acceptHMRUpdate, defineStore } from "pinia";

export interface AuthState {
    isAuthenticate: boolean,
    token: string,
    user: User
}

export interface User {
    id: number | undefined,
    name: string | undefined,
    email: string | undefined,
    email_verified_at: string | undefined,
    phone: string | undefined,
    created_at: string | undefined,
    updated_at: string | undefined,
}

export const useAuthStore = defineStore('auth',{
    state: () :AuthState => ({
        isAuthenticate: false,
        token: '',
        user: undefined,
    }),
    actions: {
        setToken(data:any, type:string){
            // @ts-ignore
            this.$patch((state) => {
                state.isAuthenticate = true
                state.token = data.token
                if ( type == 'login' )
                {
                    state.user = data.result
                }
                localStorage.setItem('accessToken', state.token)
            })
        }
    },
})