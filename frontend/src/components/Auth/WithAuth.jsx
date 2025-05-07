import {React, useEffect,useState} from 'react'
import { useNavigate } from 'react-router'
import useAuthStore from '../../stores/useAuthStore'
import { Center, Loader } from '@mantine/core'
const WithAuth = (WrappedComponent) => {
  return (props)=>{
    const navigate=useNavigate()
    const {user,loading,checkAuthstatus}=useAuthStore()
    const [checking, setchecking] = useState(true)

    useEffect(() => {
      const verifyAuth=async()=>{
        const isAuthenticated=await checkAuthstatus()
        if(!isAuthenticated){
            navigate("/auth")
        }
        setchecking(false)
      }
      verifyAuth();
    }, [navigate,checkAuthstatus]) 

    if(checking || loading){
        return(
            <Center h={300}>
            <Loader size='md'/>
            </Center>
        )
    }
    if(!user){
        return null;
    } 
    return <WrappedComponent {...props}/> 
}
}

export default WithAuth
