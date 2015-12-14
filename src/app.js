import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route } from 'react-router'
import io from 'socket.io-client'

let socket = io(`http://localhost:8000`)

class App extends Component {
  constructor () {
    super()
    this.state = {
      username: null,
      messages: []
    }
  }

  createUser = (event, username) => {
    event.preventDefault()
    console.log(username)
    socket.emit(`createUser`, username)
    this.setState({ username })
  }

  render () {
    let { username, messages } = this.state
    let { children } = this.props
    let input;

    return (
      <div>
        { !!username ||
        <div
          style={{
            height: `100%`,
            display: `flex`,
            alignItems: `center`,
            justifyContent: `center`,
            color: `white`,
            fontWeight: `100`,
            fontSize: `2em`
          }}
        >
          <form
            onSubmit={ event => this.createUser(event, input.value) }
          >
            <input
              ref={ node => input = node }
              placeholder="enter your username.."
              style={{
                backgroundColor: `transparent`,
                border: `none`,
                borderBottom: `1px solid white`,
                outline: `none`,
                fontSize: `1em`,
                color: `white`,
                padding: `0.5rem`,
                fontWeight: `100`,
              }}
            />
          </form>
        </div>
        }

        { username &&
        <div>
          <div
            style={{
              fontSize: `1.5rem`,
              padding: `2rem`,
              color: `white`
            }}
          >
            Hello { username }
          </div>
        </div>
        }

        { children }
      </div>
    )
  }
}

let routes =
  <Router>
    <Route path="/" component={ App } />
  </Router>

render(routes, document.getElementById(`app`))
