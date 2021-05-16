import React from 'react'

export default function Container({width, height, maxWidth, margin, bg, children}) {
  let styles = {
    width: width ? width : "100%",
    height: height ? height : "100vh",
    maxWidth: maxWidth ? maxWidth : '800px',
    display: 'flex',
    flexDirection: 'column',
    margin: margin ? margin : "0 auto",
    backgroundColor: bg ? bg : '#E2E2E2',
  }
  return (
    <div style={styles}>
      {children} 
    </div>
  )
}
