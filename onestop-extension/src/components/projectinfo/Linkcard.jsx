import { Card, Text,Group,Badge,Title, Anchor } from '@mantine/core'
import React from 'react'

const Linkcard = ({link}) => {
  return (
    <Card shadow='sm' padding={4} radius="md" withBorder maw={400}>
        <Group justify="space-between">
        <Title order={6}>{link.title}</Title>
        <Text size='xs' c="gray">{new Date(link.createdAt).toLocaleDateString()}</Text>
        </Group>
            {link.notes && <Text size='xs' c="gray" >{link.notes}</Text>}
              {link.url && (
                <Anchor c="blue" target='_blank' underline='hover' href={link.url} size='xs' my={1}>Source-Link</Anchor>
              )}
              {link.tags && link.tags.length>0 && (
                <Group mt={2}>
                  {link.tags.map((tag,index)=>(
                    <Badge key={index} variant='gradient' gradient={{from:"orange",to:"red", deg:90}}>{tag}</Badge>
                  ))}
                </Group>
              )}
    </Card>
  )
}

export default Linkcard
