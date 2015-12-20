import React from 'react'

export default ({
  createRoom,
  joinRoom,
  logout,
  rooms,
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
      Hello { username }
    </div>

    <div>
      <button
        onClick = { () => createRoom({ username }) }
      >
        Create Room
      </button>
    </div>

    <div>
      <button
        onClick = { logout }
      >
        Logout
      </button>
    </div>

    <div>
      { rooms.map(room =>
      <div
        onClick = { () => joinRoom({ room, username }) }
      >
        { room.id }
      </div>
      )}
    </div>
  </div>
