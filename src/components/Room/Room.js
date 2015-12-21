import React, { Component } from 'react'

let input, messageList

export default class extends Component {
  componentDidMount = () => {
    messageList.scrollTop = messageList.scrollHeight
  }

  componentDidUpdate = () => {
    messageList.scrollTop = messageList.scrollHeight
  }

  render() {
    let {
      leaveRoom,
      room: { id, messages },
      sendMessage,
      username
    } = this.props

    return (
      <div
        style = {{
          flex: 1,
          display: `flex`,
          flexDirection: `column`
        }}
      >
        <div
          style = {{
            display: `flex`,
            height: `5rem`
          }}
        >
          <div
            style = {{
              fontWeight: 100,
              padding: `2rem`,
              color: `white`
            }}
          >
            Room ID: { id }
          </div>

          <div
            style = {{
              width: `14rem`,
              marginLeft: `auto`
            }}
          >
            <button
              onClick = { leaveRoom }
            >
              Leave
            </button>
          </div>
        </div>

        <div
          style = {{
            display: `flex`,
            flexDirection: `column`,
            background: `white`,
            height: `calc(100% - 5rem)`
          }}
        >
          <div
            ref = { node => messageList = node }
            style = {{
              height: `calc(100% - 3rem)`,
              overflow: `auto`,
              display: `flex`,
              flexDirection: `column`
            }}
          >
            <div
              style = {{
                marginTop: `auto`
              }}
            >
              { messages.map(({ username, message, time }) =>
              <div
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
                sendMessage(event, { id, username, message: input.value })
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
        </div>
      </div>
    )
  }
}
