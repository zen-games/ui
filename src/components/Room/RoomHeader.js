import React from 'react'
import { Row } from 'components/Flex'

export default function RoomHeader({
  leaveRoom,
  room
}) {
  return (
    <Row
      style = {{
        height: `5rem`
      }}
    >
      <div
        style = {{
          fontWeight: 100,
          padding: `2rem`,
          color: `white`
        }}
      >
        Room ID: { room.id }
      </div>

      <Row
        style = {{
          width: `14rem`,
          marginLeft: `auto`,
        }}
      >
        <div
          style = {{
            flexGrow: 1
          }}
        >
          <button
            onClick = { leaveRoom }
          >
            Leave
          </button>
        </div>
      </Row>
    </Row>
  )
}
