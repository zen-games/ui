import React, { Component } from 'react'
import io from 'socket.io-client'
import LoginForm from './LoginForm'
import Home from './Home'
import Room from './Room'

let socket = io(`http://localhost:8000`)

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      username: null,
      rooms: []
    }
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
    socket.emit(`leaveRoom`, { username })
    this.setState({ rooms })
  }

  joinRoom = ({ username, room }) => {
    room.users = [
      ...room.users,
      username
    ]

    socket.emit(`joinRoom`, { room })
    this.setState({ rooms: [ ...rooms, room ] })
  }

  whichRoom = ({ username }) => {
    return this.state.rooms.filter(x => x.users.some(x => x === username))[0]
  }

  sendMessage = ({ message }) => {
    socket.emit(`sendMessage`, { message })
  }

  logout = () => {
    this.setState({ username: null })
  }

  render () {
    let { username, rooms } = this.state
    let { children } = this.props

    console.log(`render`, username)

    return (
      <div>
        { !!username ||
        <LoginForm
          createUser = { this.createUser }
        />
        }

        { !!username && !(this.whichRoom({ username }) || {}).id &&
        <Home
          { ...this.state }
          createRoom = { this.createRoom }
          joinRoom = { this.joinRoom }
          logout = { this.logout }
        />
        }

        { (this.whichRoom({ username }) || {}).id &&
        <Room
          leaveRoom = { this.leaveRoom }
          room = { this.whichRoom({ username }) }
          username = { username }
        />
        }
      </div>
    )
  }
}
