import React, { useState } from 'react'
import {Button, Group, LoadingOverlay, Paper, TagsInput, Textarea, TextInput} from '@mantine/core'
import useLinkStore from '../../../../onestop-extension/src/stores/useLinkStore'
import { useParams } from 'react-router'
const Linkform = ({onClose}) => {
    const {createLinks}= useLinkStore()
    const {proid}=useParams()
     const [formdata,setformdata]=useState({title:"",url:"",notes:"",tags:[],project:proid})
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
                await createLinks(formdata,proid)
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
                <TextInput label="Title" name='title' value={formdata.title} onChange={handlechange} mb='sm' required></TextInput>
                <TextInput label="Url" name='url' value={formdata.url} onChange={handlechange} mb='sm' required></TextInput>
                <Textarea label="Notes" name='notes' value={formdata.notes} onChange={handlechange} mb='sm' autosize minRows={2} maxRows={3} placeholder='Add note'></Textarea>
                <TagsInput label="Tags" value={formdata.tags} onChange={handleTagsChange} mb='md' placeholder='Add tags and press Enter'></TagsInput>
                <Group pos="right">
                    <Button variant='subtle' onClick={onClose}>Cancel</Button>
                    <Button type='submit'>Create</Button>
                </Group>
            </form>
          </Paper>
        </div>
  )
}

export default Linkform
