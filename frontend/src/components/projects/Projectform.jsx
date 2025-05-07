import React, { useState } from 'react'
import useProjectStore from '../../stores/useProjectStore'
import {Button, Group, LoadingOverlay, Paper, TagsInput, Textarea, TextInput} from '@mantine/core'
const Projectform = ({onClose}) => {
    const {createProject}=useProjectStore()
    const [formdata,setformdata]=useState({name:"",description:"",tags:[]})
    const [Loading,setLoading]=useState(false)
    const handlechange=(e)=>{
        const {name,value}=e.target;
        setformdata((prev)=>({
            ...prev,
            [name]:value,
        }))
    }
    const handleTagsChange=(tags)=>{
        setformdata((prev)=>({
            ...prev,
            tags,
        }))
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        setLoading(true)
        try{
            await createProject(formdata)
            onClose()
        }catch(err){
            console.error(err)
        }finally{
            setLoading(false)
        }
    }
  return (
    <div>
      <Paper>
        <LoadingOverlay visible={Loading} overlayProps={{radius:'sm',blur:2}}></LoadingOverlay>
        <form onSubmit={handleSubmit}>
            <TextInput label="Project Name" name='name' value={formdata.name} onChange={handlechange} mb='sm' required></TextInput>
            <Textarea label="Description" name='description' value={formdata.description} onChange={handlechange} mb='sm' autosize minRows={2} maxRows={3} placeholder='Add tags and press Enter'></Textarea>
            <TagsInput label="Tags" value={formdata.tags} onChange={handleTagsChange} mb='md'></TagsInput>
            <Group pos="right">
                <Button variant='subtle' onClick={onClose}>Cancel</Button>
                <Button type='submit'>Create</Button>
            </Group>
        </form>
      </Paper>
    </div>
  )
}

export default Projectform
