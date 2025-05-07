import { react} from 'react'
import '@mantine/core/styles.css'
import {Badge, Container, MantineProvider} from '@mantine/core'
import Prolist from './components/projects/Prolist'
import Proinfo from './components/projectinfo/Proinfo'
import { Route, Routes } from 'react-router'
import Header from './components/Header'
import Authpage from './components/Auth/Authpage'
import WithAuth from './components/Auth/WithAuth'
function App() {

  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS defaultColorScheme='dark'>
        <Container py="md">
          <Header/>
          <Routes>
            <Route path='/auth' element={<Authpage/>}/>
            <Route path='/' element={WithAuth(Prolist)()}/>
            <Route path='/:proid/info' element={WithAuth(Proinfo)()}/>
            <Route path='*' element={<div>Not found</div>}/>
          </Routes>
        </Container>
      </MantineProvider>
    </>
  )
}

export default App
