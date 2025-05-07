import React from 'react'
import useAuthStore from '../stores/useAuthStore'
import { useNavigate } from 'react-router'
import { Button, Flex, Text } from '@mantine/core'

const Header = () => {
    const {user,logout}=useAuthStore()
    const navigate=useNavigate()
    const handleLogout=async()=>{
        await logout();
        navigate("/auth")
    }
  return (
    <div>
      <Flex justify='space-between' align='center' mb='md'>
        <Text size='lg' fw={700}>
            One Stop
        </Text>
        {user && <Flex align='center' gap={12}>
            <Text size='sm'>Welcome, {user.username || user.displayName}</Text>
            <Button onClick={handleLogout} size='sm' variant='subtle'>Logout</Button>
            </Flex>}
      </Flex>
    </div>
  )
}

export default Header
