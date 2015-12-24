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
          <div>Waiting for an opponent.</div>
          }

          { room.users.length === room.game.players &&
          <div>
            <div>A challenger has appeared!</div>

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
