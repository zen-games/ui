import React from 'react'
import Chat from 'components/Chat'
import { Center, Row } from 'components/Flex'

export default function GameArea ({
  room,
  sendMessage,
  renderGame,
  startGame,
  username
}) {
  return (
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
          <div>
            <div
              style = {{
                textAlign: `center`
              }}
            >
              Waiting for an opponent.
            </div>
            <button
              onClick = { () => startGame({ ai: true, id: room.id, username }) }
            >
              Play against the computer
            </button>
          </div>
          }

          { room.users.length === room.game.players &&
          <div>
            <div
              style = {{
                textAlign: `center`
              }}
            >
              A challenger has appeared!
            </div>

            { room.users.filter(x => !x.ready).some(x => x.username === username) &&
            <button
              onClick = { () => startGame({ id: room.id, username }) }
            >
              I'm Ready!
            </button>
            }
          </div>
          }
        </div>
        }

        { room.game.started && renderGame(room.game.name) }
      </Center>
    </Row>
  )
}
