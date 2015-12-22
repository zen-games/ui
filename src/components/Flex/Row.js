import React from 'react'

export default function Row ({
  children,
  style,
  ...props
}) {
  return (
    <div
      { ...props }
      style = {{
        display: `flex`,
        ...style
      }}
    >
      { children }
    </div>
  )
}
