import { Card, Text,Group,Badge,Title, Anchor } from '@mantine/core'
import React from 'react'

const QAcard = ({QA}) => {
  return (
    <Card shadow='sm' padding="lg" radius="md" withBorder>
            <Group justify="space-between">
            <Title order={4}>{link.title}</Title>
            <Text size='xs' c="gray">{new Date(link.createdAt).toLocaleDateString()}</Text>
            </Group>
                {QA.answer && <Text size='sm' c="gray" >{QA.answer}</Text>}
                  {QA.url && (
                    <Anchor c="blue" target='_blank' underline='hover' href={QA.url}>{QA.url}</Anchor>
                  )}
                  {QA.tags && QA.tags.length>0 && (
                    <Group mt="md">
                      {QA.tags.map((tag,index)=>(
                        <Badge key={index} variant='gradient' gradient={{from:"orange",to:"red", deg:90}}>{tag}</Badge>
                      ))}
                    </Group>
                  )}
        </Card>
  )
}

export default QAcard
