import React, { Component } from 'react'
import Post from './components/Post'
import NewUser from './components/NewUser'
import Login from './components/Login'
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
    axios.delete('https://reddit-two-point-oh.herokuapp.com/posts/' + id).then((response) => {
      this.getPosts()
    })
  }

  handleSubmit = (info) => {
    info.author = this.state.currentUser.username
    info.user_id = Number(this.state.currentUser.user_id)
    console.log(info);
    axios.post('https://reddit-two-point-oh.herokuapp.com/posts', info).then((response) => {
      this.getPosts()
    })
  }

  handleEdit = (info, postId) => {
    axios.put('https://reddit-two-point-oh.herokuapp.com/posts/' + postId, info).then((response) => {
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

  submitLogin = (creds) => {
    console.log(creds);
    axios.post('https://reddit-two-point-oh.herokuapp.com/accounts/login', creds).then((response) => {
      console.log(response);
      if(response.data.username) {
        this.setState({
          posts: this.state.posts,
          currentUser: response.data
        })
        document.querySelector('#loginNavButton').style.display = "none"
        document.querySelector('#createNavButton').style.display = "none"
        document.querySelector('#logoutNavButton').style.display = "flex"
        document.querySelector('#loginDiv').style.display = "none"
        setTimeout(()=> {document.querySelector('#login_failed').style.display = "none"}, 1002)
        document.querySelector('#newPostLoggedIn').style.display = 'flex'
      } else {
        this.setState({
          posts: this.state.posts,
          currentUser: {}
        })
      }
    })
  }

  logout = () => {
    document.querySelector('#loginNavButton').style.display = "flex"
    document.querySelector('#createNavButton').style.display = "flex"
    document.querySelector('#logoutNavButton').style.display = "none"
    document.querySelector('#newPostLoggedIn').style.display = 'none'
    this.setState({
      posts: this.state.posts,
      currentUser: {}
    })
  }

  toggleAuthDivs = () => {
    if(document.querySelector('#loginDiv').style.display === "none") {
      document.querySelector('#loginDiv').style.display = "flex"
      document.querySelector('#newUserDiv').style.display = "none"
    } else {
      document.querySelector('#loginDiv').style.display = "none"
      document.querySelector('#newUserDiv').style.display = "flex"
    }
  }

  showLogin = () => {
    let loginDiv = document.querySelector('#loginDiv').style.display
    if(loginDiv === "none") {
      document.querySelector('#loginDiv').style.display = "flex"
      document.querySelector('#newUserDiv').style.display = "none"
    } else {
      document.querySelector('#loginDiv').style.display = "none"
      document.querySelector('#newUserDiv').style.display = "none"
    }
  }

  showCreate = () => {
    let createDiv = document.querySelector('#newUserDiv').style.display
    if( createDiv === "none"){
      document.querySelector('#loginDiv').style.display = "none"
      document.querySelector('#newUserDiv').style.display = "flex"
    } else {
      document.querySelector('#loginDiv').style.display = "none"
      document.querySelector('#newUserDiv').style.display = "none"
    }
  }

  render = () => {
    return (
      <div>
        <div id="nav">
          <img src="https://ps.w.org/wp-avatar/assets/icon-256x256.png?rev=1787902" id="reddit-icon"/>
          <h1>reddit 2.0</h1>
          <h3 onClick={this.showLogin} id="loginNavButton">Login</h3>
          <h3 onClick={this.showCreate} id="createNavButton">Create Account</h3>
          <h3 onClick={this.logout} id="logoutNavButton" style={{display:"none"}}>Log Out</h3>
        </div>
        <div id="loginDiv" style={{display:"none"}}>
          <Login submitLogin={this.submitLogin} currentUser={this.state.currentUser} toggleAuthDivs={this.toggleAuthDivs} />
        </div>
        <div id="newUserDiv" style={{display:"none"}}>
          <NewUser createUser={this.createUser} toggleAuthDivs={this.toggleAuthDivs} />
        </div>

        <div id="flex-container"></div>
          <main>
                    <Post posts={this.state.posts} deletePost={this.deletePost} handleSubmit={this.handleSubmit} handleEdit={this.handleEdit} currentUser={this.state.currentUser}/>
          </main>

          <div id="sidebar">
          </div>

        </div>

    );
  }
}
export default App;
