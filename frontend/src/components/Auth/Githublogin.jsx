import { React,useState,useEffect } from 'react'
import useAuthStore from '../../stores/useAuthStore'
import {useNavigate} from 'react-router'
import {Button} from '@mantine/core'

const Githublogin = () => {
  const {user,checkAuthstatus}=useAuthStore()
  const [checking, setchecking] = useState(true)
  const navigate=useNavigate()
  useEffect(() => {
    const checkAuth=async()=>{
      const isAuthenticated=await checkAuthstatus()
      if(isAuthenticated){
        navigate("/")
      }
      setchecking(false)
    }
    checkAuth()
  }, [checkAuthstatus,navigate])
  const handleLogin=()=>{
    const redirectURL=window.location.origin
    window.location.href=`http://localhost:5001/auth/github?redirect=${encodeURIComponent(redirectURL)}`
  }
  if(checking) return null;
  if(user) return null;
  return (
    <Button onClick={handleLogin}>Login with Github</Button>
  )
}

export default Githublogin
