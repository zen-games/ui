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
    let center, corner, mouseX, mouseY, pairs

    let SIZE = 275
    let SQUARE = SIZE / 3

    let resize = () => {
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

    resize()
    window.onresize = resize

    let mouse = { x: 0, y: 0 }

    window.onmousemove = event => {
      mouse = { x: event.clientX, y: event.clientY }
    }

    // canvas.onclick = (e) => {
    //   let x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
    //   let y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
    //   x -= canvas.offsetLeft + corner.x
    //   y -= canvas.offsetTop + corner.y
    //
    //   console.log(x, y)
    // }

    let draw = () => {
      canvas.width = canvas.width

      context.lineWidth = 5
      context.strokeStyle = `rgb(113, 137, 164)`

      pairs.forEach(p => {
        context.beginPath()
        context.moveTo(...p.from)
        context.lineTo(...p.to)
        context.stroke()
      })

      let x = mouse.x
      let y = mouse.y

      x -= canvas.offsetLeft + corner.x
      y -= canvas.offsetTop + corner.y

      x = Math.min(Math.max(0, x), SIZE - 1)
      y = Math.min(Math.max(0, y), SIZE - 1)

      x = Math.floor(x / SIZE * 3)
      y = Math.floor(y / SIZE * 3)

      // context.beginPath()

      context.font = `100px sans-serif`
      context.textBaseline = `hanging`
      context.fillStyle = `rgb(113, 137, 164)`

      context.fillText(
        `X`,
        (corner.x + (x * SQUARE)) + 12,
        (corner.y + (y * SQUARE)) + 9
      )

      window.requestAnimationFrame(draw)
    }

    draw()
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
