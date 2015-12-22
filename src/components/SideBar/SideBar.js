import React from 'react'
import Radium from 'radium'
import style from '../../style/colors.js'

function SideBar ({
  createRoom,
  joinRoom,
  logout,
  rooms,
  setRoom,
  username
}) {
  return (
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

      { !!rooms.length &&
      <div>
        <button
          onClick = { () => setRoom({ id: `home` }) }
        >
          Browse Rooms
        </button>
      </div>
      }

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
        { rooms.filter(x => x.users.some(x => x === username)).map(room =>
        <div
          key = { room.id }
          style = {{
            color: `rgb(194, 206, 231)`,
            fontWeight: 100,
            fontSize: `0.8em`,
            cursor: `pointer`,
            padding: `0 0.8rem`,
            display: `flex`,
            height: `2.5rem`,
            alignItems: `center`,
            ':hover': {
              backgroundColor: `rgb(22, 38, 62)`,
              color: `white`,
              transition: `all 0.2s ease`
            }
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
  )
}

export default Radium(SideBar)
