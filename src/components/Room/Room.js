import React from 'react'

export default ({
  leaveRoom,
  room: { id },
  username
}) =>
  <div>
    <div
      style = {{
        fontSize: `2rem`,
        fontWeight: 100,
        padding: `2rem`,
        color: `white`
      }}
    >
      Room ID: { id }
    </div>

    <button
      onClick = { () => leaveRoom({ username }) }
    >
      Leave
    </button>
  </div>
