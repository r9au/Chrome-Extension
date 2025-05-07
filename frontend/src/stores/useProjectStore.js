import {create} from 'zustand'
import axios from 'axios'
// import {useNavigate} from 'react-router'
const url="http://localhost:5001/api/projects"
axios.defaults.withCredentials=true
// const navigate=useNavigate()
const useProjectStore=create((set)=>({
    projects:[],
    loading:false,
    error:null,
    fetchpro:async()=>{
        set({loading:true,error:null})
        try{
            const res=await axios.get(url)
        set({projects:res.data,loading:false})
        }catch(err){
            console.log(err)
            set({error:res?.status===401?"Aunthentication Required":"Failed to fetch project",loading:false})
            if(error.res?.status===401){
                window.location.href="/auth"
            }
        }
    },
    createProject:async(project)=>{
        set({loading:true,error:null})
        try{
        const resp=await axios.post(url,project)
        set((state)=>({projects:[resp.data, ...state.projects],loading:false}))
        return resp.data;
        }catch(err){
            console.error("Error creating project:",error)
            set({error:res?.status===401?"Aunthentication Required":"Failed to create project",loading:false})
            return null;
        }
    },
    updateProject:async(id,updatedata)=>{
        set({loading:true,error:null})
        try{
            const resp=await axios.put(`${url}/${id}`,updatedata)
        set((state)=>({projects:state.projects.map((pro)=>pro._id===id?resp.data:pro),loading:false}))
        return resp.data
        }catch(err){
            console.error("Error updating project:",error)
            set({error:res?.status===401?"Aunthentication Required":"Failed to update project",loading:false})
            return null;
        }
    },
    deleteProject:async(id)=>{
        set({loading:true,error:null})
        try{
            await axios.delete(`${url}/${id}`)
        set((state)=>({
            projects:state.projects.filter((pro)=>pro._id!==id)
        ,loading:false}))
        return true
        }catch(err){
            console.error("Error deleting project:",error)
            set({error:res?.status===401?"Aunthentication Required":"Failed to delete project",loading:false})
            return false;
        }
    }
}))
export default useProjectStore