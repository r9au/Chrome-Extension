import React, { useState } from 'react'
import {Button, Group, LoadingOverlay, Paper, TagsInput, Textarea, TextInput} from '@mantine/core'
import { useParams } from 'react-router'
import useQAStore from '../../stores/useQAStore';

const QAform = ({onClose}) => {
  const {createQA}= useQAStore();
    const {proid}=useParams()
     const [formdata,setformdata]=useState({question:"",answer:"",url:"",tags:[],project:proid})
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
                await createQA(formdata,proid)
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
                <TextInput label="Question" name='question' value={formdata.question} onChange={handlechange} mb='sm' required></TextInput>
                <Textarea label="Answer" name='answer' value={formdata.answer} onChange={handlechange} mb='sm' autosize minRows={2} maxRows={3} placeholder='Add note'></Textarea>
                <TextInput label="Url" name='url' value={formdata.url} onChange={handlechange} mb='sm'></TextInput>
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

export default QAform
