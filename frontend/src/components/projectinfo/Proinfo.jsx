import { Button, Container, Divider, Grid, Group, Loader, Modal, Text, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import useLinkStore from '../../stores/useLinkStore'
import useQAStore from '../../stores/useQAStore'
import Linkcard from './Linkcard'
import QAcard from './QAcard'
import Linkform from './Linkform'
import QAform from './QAform'
const Proinfo = () => {
    const [linkopen,setlinkopen]=useState(false)
    const [qaopen,setqaopen]=useState(false)
    const {proid}=useParams()
    const navigate=useNavigate()
    const {links,fetchlinks}=useLinkStore();
    const {QA,fetchQA}=useQAStore();
    useEffect(() => {
      fetchlinks(proid)
      fetchQA(proid)
    }, [proid,fetchlinks,fetchQA])
    
  return (
    <div>
      <Container>
        <Group align='top'>
            <Title order={4} mb="md">Project resources</Title>
            <Button size="compact-sm" onClick={()=>navigate("/")}>Back</Button>
        </Group>
        <Group mt="md">
            <Button size="compact-sm" onClick={()=>setlinkopen(true)}>Insert Links</Button>
        </Group>
        <Modal opened={linkopen}>
            <Linkform onClose={()=>setlinkopen(false)}/>
        </Modal>
        <Divider label="Links" labelPosition='center' my="md"/>
        {links && links.length===0?(
            <Text size='xs' align='center' my={0}>No links yet</Text>
        ):links?(
            <Grid gutter="md">
                {links.map((link)=>(
                    <Grid.Col key={link._id}>
                        <Linkcard link={link}/>
                    </Grid.Col>
                ))}
            </Grid>
        ):(
            <Loader type='dots'/>
        )}
        <Group mt="lg">
            <Button size="compact-sm" onClick={()=>setqaopen(true)}>Insert Q/A</Button>
        </Group>
        <Modal opened={qaopen}>
            <QAform onClose={()=>setqaopen(false)}/>
        </Modal>
        <Divider label="Q/A" labelPosition='center' my="md"/>
        {QA && QA.length===0?(
            <Text size='xs' align='center' my={0}>No QA yet</Text>
        ):QA?(
            <Grid gutter="md">
                {QA.map((qa)=>(
                    <Grid.Col key={qa._id}>
                        <QAcard QA={qa}/>
                    </Grid.Col>
                ))}
            </Grid>
        ):(
            <Loader type='dots'/>
        )}
      </Container>
    </div>
  )
}

export default Proinfo
