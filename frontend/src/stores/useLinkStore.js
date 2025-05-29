import { create } from "zustand";
import axios from "axios";
const api='http://localhost:5001/api/Links'
axios.defaults.withCredentials=true
const useLinkStore= create((set)=>({
    links:[],
    fetchlinks:async(proid)=>{
        const resp=await axios.get(api,{
            params:proid?{proid}:{}
        })
        set({links:resp.data})
    },
    createLinks:async(Links)=>{
        const resp=await axios.post(api,Links)
        set((state)=>({links:[resp.data,...state.links]}))
    },
    updateLinks:async(id,updatedata)=>{
        const resp=await axios.put(`${api}/${id}`,updatedata)
        set((state)=>({links:state.links.map((link)=>link._id===id?resp.data:link)}))
    },
    deleteLinks:async(id)=>{
        const resp=await axios.delete(`${api}/${id}`)
        set((state)=>({links:state.links.filter((link)=>link._id!==id)}))
    }
}))
export default useLinkStore;