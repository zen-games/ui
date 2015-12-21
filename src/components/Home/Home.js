import React from 'react'

export default ({
  rooms,
  username
}) =>
  <div>
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
