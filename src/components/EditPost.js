import React, { Component } from 'react'




class EditPost extends Component {

  state = {
    author: "",
    title: "",
    body: ""
  }

  componentDidMount = () => {
    this.changeState()
  }

  changeState = () => {
    this.setState({
      author: this.props.author,
      title: this.props.title,
      body: this.props.body
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  handleEdit = (event) => {
    event.preventDefault()
    this.props.handleEdit(this.state, this.props.postId)
    event.target.style.display = 'none'
    event.target.previousSibling.innerHTML = "Edit Post"
  }

  showEdit = (event) => {
    if(event.target.nextSibling.style.display === 'none') {
      event.target.nextSibling.style.display = 'flex'
      event.target.innerHTML = "Cancel Edit"
    } else {
      event.target.nextSibling.style.display = 'none'
      event.target.innerHTML = "Edit Post"
      this.changeState()
    }
  }

  render = () => {
    return (
      <div>
        <button onClick={this.showEdit}>Edit Post</button>
        <form onSubmit={this.handleEdit} style={{display: "none"}}>
          <p>Title</p>
          <input type="text" id="title" onChange={this.handleChange}  defaultValue={this.state.title}/>
          <p>Author</p>
          <input type="text" id="author" onChange={this.handleChange}  defaultValue={this.state.author}/>
          <p>Body</p>
          <textarea id="body" onChange={this.handleChange} defaultValue={this.state.body}></textarea>
          <input type="submit" value="Edit Post" />
        </form>
      </div>
    )
  }

}


export default EditPost
