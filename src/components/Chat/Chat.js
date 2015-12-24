import React, { Component } from 'react'
import { Col } from 'components/Flex'

let messageList = {}
let input

export default class Chat extends Component {
  componentDidMount = () => {
    messageList.scrollTop = messageList.scrollHeight
  }

  componentDidUpdate = () => {
    messageList.scrollTop = messageList.scrollHeight
  }

  render() {
    let {
      room,
      sendMessage,
      style,
      username,
    } = this.props

    return (
      <Col
        style = {{
          background: `white`,
          height: `calc(100% - 5rem)`,
          ...style
        }}
      >
        <div
          ref = { node => messageList = node }
          style = {{
            display: `flex`,
            flexDirection: `column`,
            height: `calc(100% - 3rem)`,
            overflow: `auto`
          }}
        >
          <div
            style = {{
              marginTop: `auto`
            }}
          >
            { room.messages.map(({ username, message, time }) =>
            <div
              key = { time }
              style = {{
                padding: `0.5rem`,
              }}
            >
              <div>
                <div
                  style = {{
                    marginBottom: `0.4rem`
                  }}
                >
                  <span
                    style = {{
                      fontWeight: `bold`
                    }}
                  >
                    { username }
                  </span>
                  <span
                    style = {{
                      fontSize: `0.7em`,
                      color: `rgb(105, 121, 128)`,
                      marginLeft: `0.7rem`
                    }}
                  >
                    { time }
                  </span>
                </div>
                <div
                  style = {{
                    fontWeight: 100
                  }}
                >
                  { message }
                </div>
              </div>
            </div>
            )}
          </div>
        </div>

        <form
          style = {{
            marginTop: `auto`,
            marginBottom: 0
          }}
          onSubmit = {
            event => {
              sendMessage(event, { id: room.id, username, message: input.value })
              input.value = ``
            }
          }
        >
          <input
            ref = { node => input = node }
            style = {{
              width: `100%`,
              fontSize: `1em`,
              borderTop: `1px solid rgb(168, 179, 178)`,
              outline: `none`,
              padding: `0 1rem`,
              height: `3rem`
            }}
            placeholder = "Type your message.."
          />
        </form>
      </Col>
    )
  }
}
