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
    let Game = games.filter(x => x.name === name)[0].component

    return (
      <Game
        room = { room }
        startGame = { startGame }
        username = { username }
      />
    )
  }

  console.log('test', room)

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
        { games.map(game =>
        <Center
          key = { game.name }
          onClick = {
            () => {
              setGame({
                game,
                id: room.id
              })
            }
          }
          style = {{
            margin: `2rem`,
            width: `10rem`,
            height: `10rem`,
            border: `1px solid rgb(75, 199, 174)`,
            color: `rgb(75, 199, 174)`,
            cursor: `pointer`
          }}
        >
          { game.name }
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
            { room.users.length === room.game.players ||
            <div>Waiting for an opponent.</div>
            }

            { room.users.length === room.game.players &&
            <div>
              <div>A challenger has appeared!</div>

              <button
                onClick = { () => startGame({ id: room.id, username }) }
              >
                I'm Ready!
              </button>
            </div>
            }
          </div>
          }

          { room.game.started && renderGame(room.game.name) }
        </Center>
      </Row>
      }
    </Col>
  )
}
