// Dependencies

import React, { Component } from 'react'
import io from 'socket.io-client'

// Components

import Home from './Home'
import LoginForm from './LoginForm'
import Room from './Room'
import SideBar from './SideBar'

// Connect to server

let socket = io(`http://localhost:8000`)

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      username: null,
      view: `home`,
      rooms: []
    }

    socket.on(`api:createRoom`, ({ room }) => {
      this.setState({
        rooms: [
          ...this.state.rooms,
          room
        ]
      })
    })

    socket.on(`api:updateRooms`, ({ rooms }) => {
      console.log('Rooms updated!', rooms)
      this.setState({ rooms })
    })
  }

  createUser = (event, { username }) => {
    event.preventDefault()
    socket.emit(`ui:createUser`, { username })
    this.setState({ username })
  }

  createRoom = ({ username }) => {
    let room = {
      id: +new Date(),
      owner: username,
      users: [ username ],
      messages: []
    }

    socket.emit(`ui:createRoom`, { room })

    this.setState({
      rooms: [
        ...this.state.rooms,
        room
      ],
      view: room.id
    })
  }

  leaveRoom = ({ id, username }) => {
    socket.emit(`ui:leaveRoom`, { id, username })
    this.setState({ view: `home` })
  }

  joinRoom = ({ id, username }) => {
    socket.emit(`ui:joinRoom`, { id, username })
    this.setState({ view: id })
  }

  setRoom = ({ id }) => {
    this.setState({ view: id })
  }

  sendMessage = (event, { id, message, username }) => {
    event.preventDefault()
    let room = this.state.rooms.filter(x => x.id === id)[0]

    room.messages = [
      ...room.messages,
      { username, message, time: +new Date() }
    ]

    socket.emit(`ui:sendMessage`, { room })
  }

  logout = ({ username }) => {
    this.setState({ rooms: [], username: null })
    this.leaveRoom({ id: this.state.view, username })
    socket.emit(`ui:logout`, { username })
  }

  render () {
    let { username, rooms, view } = this.state

    return (
      <div>
        { !!username ||
        <LoginForm
          createUser = { this.createUser }
        />
        }

        { !!username &&
        <div
          style = {{
            display: `flex`,
            height: `100%`
          }}
        >
          <SideBar
            { ...this.state }
            createRoom = { this.createRoom }
            logout = { this.logout.bind(null, { username }) }
            setRoom = { this.setRoom }
          />

          { view === `home` &&
          <Home
            { ...this.state }
            joinRoom = { this.joinRoom }
          />
          }

          { rooms.filter(x => x.id === view).map(room =>
          <Room
            key = { room.id }
            leaveRoom = { this.leaveRoom.bind(null, { id: room.id, username }) }
            room = { room }
            sendMessage = { this.sendMessage }
            username = { username }
          />
          )}
        </div>
        }
      </div>
    )
  }
}
