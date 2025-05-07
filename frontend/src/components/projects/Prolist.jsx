import { Button, Container, Grid, Group, Loader, Modal, Title ,Text} from '@mantine/core'
import {React,useEffect, useState} from 'react'
import Procard from './Procard'
import useProjectStore from '../../stores/useProjectStore'
import Projectform from './Projectform'
const Prolist = () => {
    const {projects,fetchpro,loading}=useProjectStore();
    const [formopen,setformopen]=useState(false)
    useEffect(() => {
      fetchpro()
    }, [fetchpro])
    // useEffect(() => {
    //     axios.get("http://localhost:3000/api/projects")
    //     .then((data)=>setpro(data.data))
    // }, [])
    
  return (
    <Container>
        <Title align="center" mb='md'>My projects</Title>
        <Group mb='md'>
        <Button variant='outline' fullWidth onClick={fetchpro}>Refresh Projects</Button>
        <Button onClick={()=>setformopen(true)}>create project</Button>
        </Group>
        <Modal opened={formopen}>
          <Projectform onClose={()=>setformopen(false)}/>
        </Modal>
        {loading?(<Group justify='center'>
          <Loader/>
          </Group>):projects.length===0?(
            <Text align='center' c='gray'>
              No projects found create a new project
            </Text>
          ):(<Grid>
            {projects.map((project)=>(
            <Grid.Col key={project._id}>
              <Procard project={project}/>
            </Grid.Col>
          ))}
          </Grid>)}
        {/* {projects.length===0 ? (
          <Group justify='center'>
            <Loader type='oval'/>
          </Group>
        ):(
          <Grid gutter="md" mt="md">
            {projects.map((project)=>(
              <Grid.Col key={project._id}>
                <Procard project={project}/>
              </Grid.Col>
            ))}
          </Grid>
        )} */}
    </Container>
  )
}

export default Prolist
//high order component- a function wrapping another function