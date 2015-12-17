import React from 'react'

export default ({
  leaveRoom,
  room: { id },
  username
}) =>
  <div>
    <div
      style = {{
        fontSize: `1.5rem`,
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
