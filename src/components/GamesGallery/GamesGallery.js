import React from 'react'
import games from 'games'
import { Center, Row } from 'components/Flex'

export default function GamesGallery ({
  room,
  setGame
}) {
  return (
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
  )
}
