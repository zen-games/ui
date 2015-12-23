import React from 'react'
import { Center, Col } from '../Flex'

let input

export default function LoginForm ({
  createUser,
  error
}) {
  return (
    <Center
      style = {{
        height: `100%`,
        color: `white`,
        fontWeight: `100`,
        fontSize: `2em`
      }}
    >
      <Col>
        <form
          onSubmit = { event => createUser(event, { username: input.value }) }
        >
          <input
            ref = { node => input = node }
            placeholder = "enter your username.."
            style = {{
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
        <Center>
          { error }
        </Center>
      </Col>
    </Center>
  )
}
