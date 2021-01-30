import React, { Component } from 'react'

class NewPost extends Component {

  state = {
    title: "",
    body: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.handleSubmit(this.state)
    this.setState({
      title: "",
      body: ""
    })
  }

  render = () => {
    return (
      <div id="new-post">
        <h5 id="create-a-post">Create a post</h5>
        <br/>
        <form onSubmit={this.handleSubmit}>
          <input type="text" id="title" placeholder="Title" onChange={this.handleChange} />
          <br/>
          <textarea id="body" placeholder="Text" onChange={this.handleChange}></textarea>
          <br/>
          <input type="submit" id="create-post-button" value="Post" />
        </form>
      </div>
    )
  }

}

export default NewPost
