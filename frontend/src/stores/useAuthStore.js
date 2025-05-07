import { create } from "zustand";
import axios from "axios";
const API_URL="http://localhost:5001"
axios.defaults.withCredentials=true
const useAuthStore=create((set)=>({
    user:JSON.parse(localStorage.getItem("user")),
    loading:false,
    error:null,
    checkAuthstatus:async()=>{
        set({loading:true})
        try{
            const resp=await axios.get(`${API_URL}/auth/status`)
            if(resp.data.isAuthenticated){
                localStorage.setItem("user",JSON.stringify(resp.data.user))
                set({user:resp.data.user,loading:false,error:null})
                return true
            }else{
                localStorage.removeItem("user")
                set({user:null,loading:false,error:null})
                return false
            }
        }catch(err){
            localStorage.removeItem("user")
            set({user:null,loading:false,error:err.message})
            return false
        }
    },
    logout:async()=>{
        try{
            await axios.get(`${API_URL}/auth/logout`)
            localStorage.removeItem("user")
            set({user:null})
        }catch(err){
            localStorage.removeItem("user")
            console.log(err)
            set({user:null})
        }
    }
}))
export default useAuthStore