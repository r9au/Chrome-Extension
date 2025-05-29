import { Card, Text,Group,Badge,Title, Anchor } from '@mantine/core'
import React from 'react'

const Linkcard = ({link}) => {
  return (
    <Card shadow='sm' padding="lg" radius="md" withBorder>
        <Group justify="space-between">
        <Title order={4}>{link.title}</Title>
        <Text size='xs' c="gray">{new Date(link.createAt).toLocaleDateString()}</Text>
        </Group>
            {link.notes && <Text size='sm' c="gray" >{link.notes}</Text>}
              {link.url && (
                <Anchor c="blue" target='_blank' underline='hover' href={link.url}>{link.url}</Anchor>
              )}
              {link.tags && link.tags.length>0 && (
                <Group mt="md">
                  {link.tags.map((tag,index)=>(
                    <Badge key={index} variant='gradient' gradient={{from:"orange",to:"red", deg:90}}>{tag}</Badge>
                  ))}
                </Group>
              )}
    </Card>
  )
}

export default Linkcard
