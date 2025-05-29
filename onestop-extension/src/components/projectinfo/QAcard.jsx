import { Card, Text,Group,Badge,Title, Anchor } from '@mantine/core'
import React from 'react'

const QAcard = ({QA}) => {
  return (
    <Card shadow='sm' padding={4} radius="md" withBorder maw={400}>
            <Group justify="space-between">
            <Title order={6}>{QA.title}</Title>
            <Text size='xs' c="gray">{new Date(QA.createAt).toLocaleDateString()}</Text>
            </Group>
                {QA.answer && <Text size='xs' c="gray" >{QA.answer}</Text>}
                  {QA.url && (
                    <Anchor c="blue" target='_blank' underline='hover' href={QA.url} size='xs' my={1}>Q&A-Link</Anchor>
                  )}
                  {QA.tags && QA.tags.length>0 && (
                    <Group mt={3}>
                      {QA.tags.map((tag,index)=>(
                        <Badge key={index} variant='gradient' gradient={{from:"orange",to:"red", deg:90}}>{tag}</Badge>
                      ))}
                    </Group>
                  )}
        </Card>
  )
}

export default QAcard
