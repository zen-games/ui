import React from 'react'

export default function ChatMessage ({
  message,
  time,
  username
}) {
  return (
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
  )
}
