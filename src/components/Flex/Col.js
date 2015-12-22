import React from 'react'

export default function Col ({
  children,
  style,
  ...props
}) {
  return (
    <div
      { ...props }
      style = {{
        display: `flex`,
        flexDirection: `column`,
        ...style
      }}
    >
      { children }
    </div>
  )
}
