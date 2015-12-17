import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route } from 'react-router'
import io from 'socket.io-client'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Room from './components/Room'

let socket = io(`http://localhost:8000`)

class App extends Component {
  constructor () {
    super()
    this.state = {
      username: null,
      rooms: []
    }

    socket.on('createUser', )
  }

  createUser = (event, { username }) => {
    event.preventDefault()
    this.setState({ username })
  }

  createRoom = ({ username }) => {
    let room = {
      id: +new Date(),
      users: [ username ],
      messages: []
    }

    this.setState({
      rooms: [
        ...this.state.rooms,
        room
      ]
    })
  }

  leaveRoom = ({ username }) => {
    let rooms = this.state.rooms.filter(x => !x.users.some(x => x === username))
    socket.emit(`leaveRoom`, username)
    this.setState({ rooms })
  }

  joinRoom = ({ username, room }) => {
    room.users = [
      ...room.users,
      username
    ]

    socket.emit(`joinRoom`, room)
    this.setState({ rooms: [ ...rooms, room ] })
  }

  whichRoom = (username) => {
    return this.state.rooms.filter(x => x.users.some(x => x === username))[0]
  }

  logout = () => {
    this.setState({ username: null })
  }

  render () {
    let { username, rooms } = this.state
    let { children } = this.props

    return (
      <div>
        { !!username ||
        <LoginForm
          createUser = { this.createUser }
        />
        }

        { !!username && !(this.whichRoom(username) || {}).id &&
        <Home
          { ...this.state }
          createRoom = { this.createRoom }
          joinRoom = { this.joinRoom }
          logout = { this.logout }
        />
        }

        { (this.whichRoom(username) || {}).id &&
        <Room
          leaveRoom = { this.leaveRoom }
          room = { this.whichRoom(username) }
          username = { username }
        />
        }
      </div>
    )
  }
}

let routes =
  <Router>
    <Route
      path = "/"
      component = { App }
    />
  </Router>

render(routes, document.getElementById(`app`))
