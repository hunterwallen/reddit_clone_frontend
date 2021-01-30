import React, { Component } from 'react'
import Post from './components/Post'
import NewUser from './components/NewUser'
import axios from 'axios'

class App extends Component {
  state = {
    posts: [],
    currentUser: {}
  }

  componentDidMount = () => {
    this.getPosts()
  }

  getPosts = () => {
    axios.get('https://reddit-two-point-oh.herokuapp.com/posts').then((response) => {
        this.setState({
          posts: response.data,
          currentUser: this.state.currentUser
        })
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


  createUser = (info) => {
    axios.post('https://reddit-two-point-oh.herokuapp.com/accounts', info).then((response) => {
      this.setState({
        posts: this.state.posts,
        currentUser: response.data
      })
    })
  }


  render = () => {
    return (
      <div>
        <div id="nav">
          <img src="https://ps.w.org/wp-avatar/assets/icon-256x256.png?rev=1787902" id="reddit-icon"/>
          <h1>reddit 2.0</h1>
        </div>
        <main>
        <NewUser createUser={this.createUser} />
        <Post posts={this.state.posts} deletePost={this.deletePost} handleSubmit={this.handleSubmit} handleEdit={this.handleEdit}/>
        </main>
      </div>
    );
  }
}
export default App;