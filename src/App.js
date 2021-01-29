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
    axios.get('https://reddit-two-point-oh.herokuapp.com/posts').then((response) => {
        this.setState({posts: response.data})
    })
  }

  deletePost = (id) => {
    axios.delete('https://reddit-two-point-oh.herokuapp.com/posts/' + id).then((response) => {
      this.getPosts()
    })
  }

  handleSubmit = (info) => {
    axios.post('https://reddit-two-point-oh.herokuapp.com/posts', info).then((response) => {
      this.getPosts()
    })
  }

  handleEdit = (info, postId) => {
    axios.put('https://reddit-two-point-oh.herokuapp.com/posts/' + postId, info).then((response) => {
      this.getPosts()
    })
  }

  render = () => {
    return (
      <div>
        <div id="nav">
          <img src="https://ps.w.org/wp-avatar/assets/icon-256x256.png?rev=1787902" id="reddit-icon"/>
          <h1>reddit 2.0</h1>
        </div>
        <Post posts={this.state.posts} deletePost={this.deletePost} handleSubmit={this.handleSubmit} handleEdit={this.handleEdit}/>
      </div>
    );
  }
}
export default App;