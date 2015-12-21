import React from 'react'
import style from '../../style/colors.js'

export default ({
  createRoom,
  joinRoom,
  logout,
  rooms,
  setRoom,
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
        onClick = { () => setRoom({ id: `home` }) }
      >
        Browse Rooms
      </button>
    </div>

    { rooms.some(x => x.owner === username) ||
    <div>
      <button
        onClick = { () => createRoom({ username }) }
      >
        Create Room
      </button>
    </div>
    }

    <div>
      { rooms.map(room =>
      <div
        key = { room.id }
        style = {{
          color: `rgb(194, 206, 231)`,
          fontWeight: 100,
          fontSize: `0.8em`,
          cursor: `pointer`,
          padding: `0 0.8rem`,
          display: `flex`,
          height: `3rem`,
          alignItems: `center`
        }}
        onClick = { () => setRoom({ id: room.id }) }
      >
        <span>{ room.id }</span>
        <span
          style = {{
            marginLeft: `auto`
          }}
        >
          # users: { room.users.length }
        </span>
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
