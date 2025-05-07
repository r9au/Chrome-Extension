import { create } from "zustand";
import axios from "axios";
const url='http://localhost:5001/api/QA'
axios.defaults.withCredentials=true
const useQAStore=create((set)=>({
    QA:[],
    fetchQA:async(proid)=>{
        const res=await axios.get(url,{
            params:proid?{proid}:{},
        })
        set({QA:res.data})
    },
    createQA:async(ques)=>{
        const resp=await axios.post(url,ques)
        set((state)=>({QA:[resp.data, ...state.QA]}))
    },
    updateQA:async(id,updatedata)=>{
        const resp=await axios.put(`${url}/${id}`,updatedata)
        set((state)=>({QA:state.QA.map((qs)=>qs._id===id?resp.data:qs)}))
    },
    deleteQA:async(id)=>{
        await axios.delete(`${url}/${id}`)
        set((state)=>({QA:state.QA.filter((qa)=>qa._id!==id)}))
    }
}))
export default useQAStore