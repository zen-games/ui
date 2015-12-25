import React, { Component } from 'react'

export default class Pong extends Component {
  componentDidMount() {
    let {
      movePaddle,
      room: { id },
      username
    } = this.props

    let gameWrapper = document.querySelector(`#game-wrapper`)
    let canvas = document.querySelector(`#pong`)
    let context = canvas.getContext(`2d`)

    let setCoordinates = () => {
      canvas.width = gameWrapper.clientWidth
      canvas.height = gameWrapper.clientHeight
    }

    setCoordinates()
    window.onresize = setCoordinates

    let mouse = { x: 0, y: 0 }

    window.onmousemove = (event) => {
      mouse = { x: event.clientX, y: event.clientY }
      movePaddle({ id, mouse, username })
    }

    canvas.onclick = () => {

    }

    let draw = () => {
      let {
        room: { users }
      } = this.props

      let player2 = users.filter(x => x.username !== username)[0]

      canvas.width = canvas.width

      let PADDLE_WIDTH = 80
      let PADDLE_HEIGHT = 10

      let x = mouse.x
      x -= canvas.offsetLeft
      x = Math.min(Math.max(0, x), canvas.width - PADDLE_WIDTH)

      if (player2.mouse) {
        let x2 = player2.mouse.x
        x2 -= canvas.offsetLeft
        x2 = Math.min(Math.max(0, x2), canvas.width - PADDLE_WIDTH)

        context.beginPath()
        context.fillStyle = `rgb(185, 223, 240)`
        context.rect(
          x2, 25,
          PADDLE_WIDTH, PADDLE_HEIGHT
        )
        context.fill()
      }

      context.beginPath()
      context.fillStyle = `rgb(185, 223, 240)`
      context.rect(
        x, canvas.height - 25,
        PADDLE_WIDTH, PADDLE_HEIGHT
      )
      context.fill()

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
          style = {{
            cursor: `none`
          }}
          id = "pong"
        />
      </div>
    )
  }
}
