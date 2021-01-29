import React, { Component } from 'react'

class NewPost extends Component {

  state = {
    author: "",
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
      author: "",
      title: "",
      body: ""
    })
  }

  render = () => {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>Title</p>
          <input type="text" id="title" onChange={this.handleChange} />
          <p>Author</p>
          <input type="text" id="author" onChange={this.handleChange} />
          <p>Body</p>
          <textarea id="body" placeholder="Enter your post..." onChange={this.handleChange}></textarea>
          <input type="submit" value="Create Post" />
        </form>
      </div>
    )
  }

}

export default NewPost