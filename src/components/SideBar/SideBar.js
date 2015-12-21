import React from 'react'
import style from '../../style/colors.js'

export default ({
  createRoom,
  joinRoom,
  logout,
  rooms,
  username
}) =>
  <div
    style = {{
      background: style.grey,
      width: `16rem`,
      display: `flex`,
      flexDirection: `column`
    }}
  >
    <div
      style = {{
        fontSize: `1.3rem`,
        fontWeight: 100,
        padding: `1.5rem`,
        color: `white`,
        display: `flex`,
        alignItems: `center`
      }}
    >
      <i
        className = "material-icons"
        style = {{
          color: `rgb(164, 175, 184)`,
          paddingRight: `0.5em`
        }}
      >
        account_circle
      </i>

      <span>{ username }</span>
    </div>

    <div>
      <button
        onClick = { () => createRoom({ username }) }
      >
        Create Room
      </button>
    </div>

    <div>
    { rooms.map(room =>
      <div
        style = {{
          color: `rgb(194, 206, 231)`,
          fontWeight: 100,
          fontSize: `0.8em`,
          cursor: `pointer`,
          paddingLeft: `0.8rem`,
          display: `flex`,
          height: `3rem`,
          alignItems: `center`
        }}
        onClick = { () => joinRoom({ room, username }) }
      >
      { room.id }
      </div>
    )}
    </div>

    <div
      style = {{
        marginTop: `auto`
      }}
    >
      <button
        onClick = { logout }
      >
        Logout
      </button>
    </div>
  </div>
