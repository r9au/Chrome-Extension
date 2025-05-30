import { Badge, Button, Card, Group, Text, Title } from '@mantine/core'
import React from 'react'

const Procard = ({project}) => {
  return (
    <Card shadow='xl' padding="lg" radius="md" withBorder>
      <Title order={4}>{project.name}</Title>
      <Text size='sm' >{project.description || "No description provided"}</Text>
      {project.tags && project.tags.length>0 && (
        <Group mt="md">
          {project.tags.map((tag,index)=>(
            <Badge key={index} variant='gradient' gradient={{from:"orange",to:"red", deg:90}}>{tag}</Badge>
          ))}
        </Group>
      )}
      <Group justify='flex-end'>
        <Button variant='light' component='a' href={`/${project._id}/info`}>View details</Button>
      </Group>
    </Card>
  )
}

export default Procard
