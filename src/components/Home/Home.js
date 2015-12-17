import React from 'react'

export default ({
  createRoom,
  logout,
  rooms,
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
        onClick = { () => logout(username) }
      >
        Logout
      </button>
    </div>

    <div>
      { rooms.map(room =>
      <div>{ room.id }</div>
      )}
    </div>
  </div>
