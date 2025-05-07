import { Badge, Button, Card, Group, Text, Title } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router'

const Procard = ({ project }) => {
  return (
    <Card shadow='sm' padding="xs" radius="md" withBorder>
      <Group justify='space-between'>
      <Title order={6}>{project.name}</Title>
      <Link to={`/${project._id}/info`}>
          <Button variant='subtle' size='compact-xs'>View details</Button>
        </Link>
      </Group>
      {/* <Text size='sm' >{project.description || "No description provided"}</Text> */}
      {project.description && (
        <Text size='xs' c="gray">{project.description}</Text>
      )}
      {project.tags && project.tags.length > 0 && (
        <Group mt={2}>
          {project.tags.map((tag, index) => (
            <Badge key={index} variant='gradient' gradient={{ from: "orange", to: "red", deg: 90 }} size='xs' mx={-2}>{tag}</Badge>
          ))}
        </Group>
      )}
      {/* <Group justify='flex-end'>
        <Link to={`/${project._id}/info`}>
          <Button variant='light'>View details</Button>
        </Link>
      </Group> */}
    </Card>
  )
}

export default Procard
