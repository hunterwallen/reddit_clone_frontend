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

  render = () => {
    return (
      <div>
        <h1>Working</h1>
        <Post post={this.state.posts}/>
      </div>
    );
  }
}

export default App;
