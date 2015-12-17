import React from 'react'

let input

export default ({
  createUser
}) =>
  <div
    style = {{
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
  </div>
