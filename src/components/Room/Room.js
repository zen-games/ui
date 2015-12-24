import React from 'react'
import { Center, Col, Row } from 'components/Flex'
import Chat from 'components/Chat'
import RoomHeader from 'components/Room/RoomHeader'
import games from 'games'

export default function Room ({
  leaveRoom,
  room,
  sendMessage,
  setGame,
  startGame,
  username
}) {
  let renderGame = (name) => {
    let Game = games[name].component
    return (
      <Game
        room = { room }
        startGame = { startGame }
        username = { username }
      />
    )
  }

  return (
    <Col
      style = {{
        flex: 1,
      }}
    >
      <RoomHeader
        leaveRoom = { leaveRoom }
        room = { room }
      />

      { !!room.game ||
      <Row>
        { Object.keys(games).map(game =>
        <Center
          key = { game }
          onClick = { () => setGame({ game, id: room.id }) }
          style = {{
            margin: `2rem`,
            width: `10rem`,
            height: `10rem`,
            border: `1px solid rgb(75, 199, 174)`,
            color: `rgb(75, 199, 174)`,
            cursor: `pointer`
          }}
        >
          { game }
        </Center>
        )}
      </Row>
      }

      { !!room.game &&
      <Row>
        <Chat
          room = { room }
          sendMessage = { sendMessage }
          username = { username }
          style = {{
            width: `28rem`
          }}
        />

        <Center
          style = {{
            flexGrow: 2
          }}
        >
          { room.game.started ||
          <div
            style = {{
              color: `white`
            }}
          >
            Ready for some Tic Tac Toe??
            <button
              onClick = { () => startGame({ id: room.id, username }) }
            >
              start
            </button>
          </div>
          }

          { room.game.started && renderGame(room.game.name) }
        </Center>
      </Row>
      }
    </Col>
  )
}
