import React from 'react'

export default ({
  rooms,
  username
}) =>
  <div
    style = {{
      flexGrow: 1
    }}
  >
    <div
      style = {{
        display: `flex`
      }}
    >
      { rooms.filter(x => !x.users.some(x => x === username)).map(room =>
      <div
        key = { room.id }
        onClick = { () => joinRoom({ room, username }) }
        style = {{
          margin: `2rem`,
          width: `10rem`,
          height: `10rem`,
          border: `1px solid rgb(75, 199, 174)`,
          color: `rgb(75, 199, 174)`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
          cursor: `pointer`
        }}
      >
        { room.id }
      </div>
      )}
    </div>
  </div>
