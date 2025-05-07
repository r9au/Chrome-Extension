import { Container, Title } from '@mantine/core'
import React from 'react'
import Githublogin from './Githublogin'

const Authpage = () => {
  return (
    <div>
      <Container>
        <Title order={3} mb='md'>Please Login</Title>
        <Githublogin/>
      </Container>
    </div>
  )
}

export default Authpage
