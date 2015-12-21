import React from 'react'

export default ({
  leaveRoom,
  room: { id },
  username
}) =>
  <div
    style = {{
      flex: 1
    }}
  >
    <div
      style = {{
        display: `flex`,
      }}
    >
      <div
        style = {{
          fontWeight: 100,
          padding: `2rem`,
          color: `white`
        }}
      >
        Room ID: { id }
      </div>

      <div
        style = {{
          width: `14rem`,
          marginLeft: `auto`
        }}
      >
        <button
          onClick = { leaveRoom }
        >
          Leave
        </button>
      </div>
    </div>
  </div>
