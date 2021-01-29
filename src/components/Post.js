import React, { Component } from 'react'


class Post extends Component {

  state = {
    testing: "testing2"
  }

  changeState = () => {
    this.props.changeState(this.state.testing)
  }


  render = () => {
    return (
      <div>
        <h2> post working </h2>
        <button onClick={this.changeState} value="ChangeState" />
      </div>
    )
  }

}


export default Post
