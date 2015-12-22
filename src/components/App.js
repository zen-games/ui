// Dependencies

import React, { Component } from 'react'
import io from 'socket.io-client'

// Components

import Home from './Home'
import LoginForm from './LoginForm'
import Room from './Room'
import SideBar from './SideBar'
import { Row } from './Flex'

// Connect to server

let socket = io(`http://localhost:8000`)

export default class App extends Component {
  constructor () {
    super()

    this.state = {
      rooms: []
    }

    socket.on(`api:updateRooms`, ({ rooms }) => {
      console.log('Rooms updated!', rooms)
      this.setState({ rooms })
    })

    socket.on(`api:createRoom`, ({ id }) => {
      this.setState({ view: id })
    })
  }

  createUser = (event, { username }) => {
    event.preventDefault()
    socket.emit(`ui:createUser`, { username })
    this.setState({ username, view: `home` })
  }

  createRoom = ({ username }) => {
    socket.emit(`ui:createRoom`, { username })
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
    socket.emit(`ui:sendMessage`, { id, message, username })
  }

  logout = ({ username }) => {
    this.setState({ rooms: [], username: null })
    this.leaveRoom({ id: this.state.view, username })
    socket.emit(`ui:logout`, { username })
  }

  setGame = ({ game, id }) => {
    console.log(game, id)
    socket.emit(`ui:setGame`, { game, id })
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
        <Row
          style = {{
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
            leaveRoom = {
              this.leaveRoom.bind(null, { id: room.id, username })
            }
            room = { room }
            sendMessage = { this.sendMessage }
            setGame = { this.setGame }
            username = { username }
          />
          )}
        </Row>
        }
      </div>
    )
  }
}
