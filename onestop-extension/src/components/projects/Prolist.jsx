import { Button, Container, Flex, Grid, Group, Loader, Title } from '@mantine/core'
import {React,useEffect} from 'react'
import Procard from './Procard'
import useProjectStore from '../../stores/useProjectStore'
const Prolist = () => {
    const {projects,fetchpro}=useProjectStore();
    useEffect(() => {
      fetchpro()
    }, [fetchpro])
    // useEffect(() => {
    //     axios.get("http://localhost:3000/api/projects")
    //     .then((data)=>setpro(data.data))
    // }, [])
    
  return (
    <Container p={0}>
      <Flex gap="xs" justify="center" align="center">
        <Title order={6}>My projects</Title>
        <Button variant='outline' size='xs'>Refresh Projects</Button>
        </Flex>
        {projects.length===0 ? (
          <Group justify='center'>
            <Loader type='oval' size={12}/>
          </Group>
        ):(
          <Grid gutter="xs" mt="sm">
            {projects.map((project)=>(
              <Grid.Col key={project._id}>
                <Procard project={project}/>
              </Grid.Col>
            ))}
          </Grid>
        )}
    </Container>
  )
}

export default Prolist
