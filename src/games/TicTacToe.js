import React, { Component } from 'react'

export default class TicTacToe extends Component {
  constructor (props) {
    super(props)

    this.state = {
      gameover: false
    }
  }

  componentDidMount() {
    let gameWrapper = document.querySelector(`#game-wrapper`)
    let canvas = document.querySelector(`#tic-tac-toe`)
    let context = canvas.getContext(`2d`)
    let center, corner

    let SIZE = 275
    let SQUARE = SIZE / 3

    function resize () {
      canvas.width = gameWrapper.clientWidth
      canvas.height = gameWrapper.clientHeight

      center = [
        (canvas.width / 2) - (SIZE / 2),
        (canvas.height / 2) - (SIZE / 2)
      ]

      corner = {
        x: (canvas.width / 2) - (SIZE / 2),
        y: (canvas.height / 2) - (SIZE / 2),
      }

      draw()
    }

    resize()
    window.onresize = resize

    function draw () {

      // outer

      context.beginPath()
      context.rect(
        ...center,
        SIZE, SIZE
      )
      context.lineWidth = 5
      context.strokeStyle = `rgb(113, 137, 164)`
      context.stroke()

      // lines

      let pairs = [
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

      pairs.forEach(p => {
        context.beginPath()
        context.moveTo(...p.from)
        context.lineTo(...p.to)
        context.stroke()
      })
    }
  }

  render() {
    let {
      room,
      username
    } = this.props

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
