import {create} from 'zustand'
import axios from 'axios'
const url="http://localhost:5001/api/projects"
axios.defaults.withCredentials=true
const useProjectStore=create((set)=>({
    projects:[],
    fetchpro:async()=>{
        try{
            const res=await axios.get(url)
        console.log(res)
        set({projects:res.data})
        }catch(err){
            console.log(err)
        }
    },
    createProject:async(project)=>{
        const resp=await axios.post(url,project)
        set((state)=>({projects:[resp.data, ...state.projects]}))
    },
    updateProject:async(id,updatedata)=>{
        const resp=await axios.put(`${url}/${id}`,updatedata)
        set((state)=>({projects:state.projects.map((pro)=>pro._id===id?resp.data:pro)}))
    },
    deleteProject:async(id)=>{
        await axios.delete(`${url}/${id}`)
        set((state)=>({
            projects:state.projects.filter((pro)=>pro._id!==id)
        }))
    }
}))
export default useProjectStore