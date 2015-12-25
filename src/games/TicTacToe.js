import React, { Component } from 'react'

export default class TicTacToe extends Component {
  constructor (props) {
    super(props)

    this.state = {
      gameover: false
    }
  }

  componentDidMount() {
    let {
      makeMove,
      room: { id },
      username
    } = this.props

    let gameWrapper = document.querySelector(`#game-wrapper`)
    let canvas = document.querySelector(`#tic-tac-toe`)
    let context = canvas.getContext(`2d`)
    let corner, pairs

    let SIZE = 275
    let SQUARE = SIZE / 3

    let setCoordinates = () => {
      canvas.width = gameWrapper.clientWidth
      canvas.height = gameWrapper.clientHeight

      corner = {
        x: (canvas.width / 2) - (SIZE / 2),
        y: (canvas.height / 2) - (SIZE / 2),
      }

      pairs = [
        {
          from: [ corner.x + (SQUARE), corner.y ],
          to: [ corner.x + (SQUARE), corner.y + SIZE ]
        },
        {
          from: [ corner.x + (SQUARE * 2), corner.y ],
          to: [ corner.x + (SQUARE * 2), corner.y + SIZE ]
        },
        {
          from: [ corner.x, corner.y + (SQUARE) ],
          to: [ corner.x + SIZE, corner.y + (SQUARE) ]
        },
        {
          from: [ corner.x, corner.y + (SQUARE * 2) ],
          to: [ corner.x + SIZE, corner.y + (SQUARE * 2) ]
        }
      ]
    }

    setCoordinates()
    window.onresize = setCoordinates

    let mouse = { x: 0, y: 0 }

    window.onmousemove = (event) => {
      mouse = { x: event.clientX, y: event.clientY }
    }

    let getCell = () => {
      let x = mouse.x
      let y = mouse.y

      x -= canvas.offsetLeft + corner.x
      y -= canvas.offsetTop + corner.y

      x = Math.min(Math.max(0, x), SIZE - 1)
      y = Math.min(Math.max(0, y), SIZE - 1)

      x = Math.floor(x / SIZE * 3)
      y = Math.floor(y / SIZE * 3)

      return { x, y }
    }

    canvas.onclick = () => {
      if (this.props.room.game.turn === username) {
        let { x, y } = getCell()
        makeMove({ id, x, y })
      }
    }

    let draw = () => {
      let {
        room: { game }
      } = this.props

      // reset frame

      canvas.width = canvas.width

      // draw lines

      context.lineWidth = 5
      context.strokeStyle = `rgb(113, 137, 164)`

      pairs.forEach(p => {
        context.beginPath()
        context.moveTo(...p.from)
        context.lineTo(...p.to)
        context.stroke()
      })

      // X & O style

      context.font = `100px sans-serif`
      context.textBaseline = `hanging`

      // draw X or O on hover

      if (game.turn === username) {
        let { x, y } = getCell()

        let cell =
          game.state[game.state.length - 1][x][y]

        if (!cell) {
          context.fillStyle = `rgb(137, 164, 113)`
          context.fillText(
            game.state.length % 2 === 0 ? `O` : `X`,
            (corner.x + (x * SQUARE)) + 12,
            (corner.y + (y * SQUARE)) + 9
          )
        }
      }

      // draw last game state

      context.fillStyle = `rgb(113, 137, 164)`
      game.state[game.state.length -1].forEach((row, x) => {
        row.forEach((cell, y) => {
          context.fillText(
            cell === 1 ? `O` : cell === -1 ? `X` : ``,
            (corner.x + (x * SQUARE)) + 12,
            (corner.y + (y * SQUARE)) + 9
          )
        })
      })

      window.requestAnimationFrame(draw)
    }

    draw()
  }

  render() {
    return (
      <div
        id = "game-wrapper"
        style = {{
          width: `100%`,
          height: `calc(100% - 5rem)`
        }}
      >
        <canvas
          id = "tic-tac-toe"
        />
      </div>
    )
  }
}
