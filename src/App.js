import React, { Component } from 'react'
import Post from './components/Post'
import axios from 'axios'




class App extends Component {
  state = {
    posts: []
  }

  componentDidMount = () => {
    this.getPosts()
  }

  getPosts = () => {
    axios.get('/posts').then((response) => {
        this.setState({posts: response.data})
    })
  }

  deletePost = (id) => {
    axios.delete('/posts/' + id).then((response) => {
      this.getPosts()
    })
  }

  handleSubmit = (info) => {
    axios.post('/posts', info).then((response) => {
      this.getPosts()
    })
  }

  handleEdit = (info, postId) => {
    axios.put('/posts/' + postId, info).then((response) => {
      this.getPosts()
    })
  }

  render = () => {
    return (
      <div>
        <h1>Working</h1>
        <Post posts={this.state.posts} deletePost={this.deletePost} handleSubmit={this.handleSubmit} handleEdit={this.handleEdit}/>
      </div>
    );
  }
}

export default App;
