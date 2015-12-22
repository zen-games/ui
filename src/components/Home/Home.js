import React from 'react'
import { Center, Row } from '../Flex'

export default function Home ({
  joinRoom,
  rooms,
  username
}) {
  return (
    <div
      style = {{
        flexGrow: 1
      }}
    >
      <Row>
        { rooms.filter(x => !x.users.some(x => x === username)).map(room =>
        <Center
          key = { room.id }
          onClick = { () => joinRoom({ id: room.id, username }) }
          style = {{
            margin: `2rem`,
            width: `10rem`,
            height: `10rem`,
            border: `1px solid rgb(75, 199, 174)`,
            color: `rgb(75, 199, 174)`,
            cursor: `pointer`
          }}
        >
          { room.id }
        </Center>
        )}
      </Row>
    </div>
  )
}
