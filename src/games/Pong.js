import React, { Component } from 'react'

export default class Pong extends Component {
  componentDidMount() {
    let {
      makeMove,
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
    }

    canvas.onclick = () => {

    }

    let draw = () => {
      canvas.width = canvas.width

      let x = mouse.x
      x -= canvas.offsetLeft

      x = Math.min(Math.max(0, x), canvas.width - 80)

      context.beginPath()
      context.fillStyle = `rgb(185, 223, 240)`
      context.rect(x, canvas.height - 25, 80, 10)
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
