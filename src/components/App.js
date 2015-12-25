// Dependencies

import React, { Component } from 'react'
import io from 'socket.io-client'

// Components

import Home from 'components/Home'
import LoginForm from 'components/LoginForm'
import Room from 'components/Room'
import SideBar from 'components/SideBar'
import { Row } from 'components/Flex'

// Connect to server

let socket = io(`http://localhost:8000`)

export default class App extends Component {
  constructor () {
    super()

    this.state = {
      view: `login`,
      rooms: [],
      error: null
    }

    socket.on(`api:updateRooms`, ({ rooms }) => {
      console.log('Rooms updated!', rooms)
      this.setState({ rooms })
    })

    socket.on(`api:createRoom`, ({ id }) => {
      this.setState({ view: id })
    })

    socket.on(`api:userExists`, () => {
      this.setState({ error: `User Exists` })
    })

    socket.on(`api:login`, () => {
      this.setState({ view: `home` })
    })
  }

  createUser = (event, { username }) => {
    event.preventDefault()
    this.setState({ username })
    socket.emit(`ui:createUser`, { username })
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
    this.setState({
      rooms: [],
      username: null,
      view: `login`
    })

    socket.emit(`ui:logout`, { username })
  }

  makeMove = ({ id, x, y }) => {
    socket.emit(`ui:makeMove`, { id, x, y })
  }

  setGame = ({ game, id }) => {
    socket.emit(`ui:setGame`, { game, id })
  }

  startGame = ({ id, username }) => {
    socket.emit(`ui:startGame`, { id, username })
  }

  movePaddle = ({ id, mouse, username }) => {
    socket.emit(`ui:movePaddle`, { id, mouse, username })
  }

  render () {
    let { username, rooms, view, error } = this.state

    return (
      <div>
        { view === `login` &&
          <LoginForm
            createUser = { this.createUser }
            error = { error }
          />
        }

        { view !== `login` &&
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
            makeMove = { this.makeMove }
            movePaddle = { this.movePaddle }
            room = { room }
            sendMessage = { this.sendMessage }
            setGame = { this.setGame }
            startGame = { this.startGame }
            username = { username }
          />
          )}
        </Row>
        }
      </div>
    )
  }
}
