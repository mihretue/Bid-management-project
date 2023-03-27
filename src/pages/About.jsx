import React, { Component } from 'react'

export default class About extends Component {
  render() {
    return (
      <div className='container ' style={{justifyContent:"center",alignItems:"center"}}>
        <h1>About Us Page</h1>
        <p>Some text about who we are and what we do.</p>
        <p>Resize the browser window to see that this page is responsive by the way.</p>
      </div>
    )
  }
}
