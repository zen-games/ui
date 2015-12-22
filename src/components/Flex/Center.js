import React from 'react'

export default function Center ({
  children,
  style,
  ...props
}) {
  return (
    <div
      { ...props }
      style = {{
        display: `flex`,
        alignItems: `center`,
        justifyContent: `center`,
        ...style
      }}
    >
      { children }
    </div>
  )
}
