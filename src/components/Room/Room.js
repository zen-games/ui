import React from 'react'
import { Col } from 'components/Flex'
import RoomHeader from 'components/Room/RoomHeader'
import GamesGallery from 'components/GamesGallery'
import GameArea from 'components/GameArea'
import games from 'games'

export default function Room ({
  leaveRoom,
  makeMove,
  movePaddle,
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
        makeMove = { makeMove }
        movePaddle = { movePaddle }
        room = { room }
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
      <GamesGallery
        room = { room }
        setGame = { setGame }
      />
      }

      { !!room.game &&
      <GameArea
        room = { room }
        renderGame = { renderGame }
        sendMessage = { sendMessage }
        startGame = { startGame }
        username = { username }
      />
      }
    </Col>
  )
}
