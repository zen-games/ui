import React, { Component } from 'react'

export default class TicTacToe extends Component {
  constructor (props) {
    super(props)

    this.state = {
      gameover: false
    }
  }

  componentDidMount() {
    let canvas = document.querySelector(`#tic-tac-toe`)

    let context = canvas.getContext(`2d`)

    context.beginPath()
    context.rect(0, 0, 100, 100)
    context.strokeStyle = `red`
    context.stroke()
  }

  render() {
    let {
      room,
      username
    } = this.props

    return (
      <canvas id="tic-tac-toe" />
    )
  }
}
