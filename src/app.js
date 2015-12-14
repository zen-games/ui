import React, { Component } from 'react'
import { render } from 'react-dom'
import io from 'socket.io-client'

let socket = io(`http://localhost:8000`)

class App extends Component {
  constructor () {
    super()
    this.state = {
      messages: []
    }

    socket.on(`yo`,
      () => this.setState({
        messages: [ ...this.state.messages, `yo` ]
      })
    )
  }

  sendYo = () => {
    socket.emit(`yoo`)
  }

  render () {
    let { messages } = this.state

    return (
      <div>
        <button onClick={ this.sendYo }>Yo</button>
      { messages.map(m => (
        <div>{ m }</div>
      ))}
      </div>
    )
  }
}

render(<App />, document.getElementById(`app`))
