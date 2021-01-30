import React, { Component } from 'react'
import Post from './components/Post'
import NewUser from './components/NewUser'
import Login from './components/Login'
import CreateSub from './components/CreateSub'
import axios from 'axios'

class App extends Component {
  state = {
    posts: [],
    currentUser: {},
    subreddits: []
  }

  componentDidMount = () => {
    this.getPosts()
    this.getSubreddits()
  }

  getPosts = () => {
    axios.get('https://reddit-two-point-oh.herokuapp.com/posts').then((response) => {
        this.setState({
          posts: response.data,
          currentUser: this.state.currentUser,
          subreddits: this.state.subreddits
        })
    })
  }

  getSubreddits = () => {
    axios.get('https://reddit-two-point-oh.herokuapp.com/subreddits').then((response) => {
      this.setState({
        posts: this.state.posts,
        currentUser: this.state.currentUser,
        subreddits: response.data
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
        currentUser: response.data,
        subreddits: this.state.subreddits
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
        document.querySelector('#newSubDiv').style.display = "flex"
      } else {
        this.setState({
          posts: this.state.posts,
          currentUser: {},
          subreddits: this.state.subreddits
        })
      }
    })
  }

  createSub = (info) => {
    info.created_by = this.state.currentUser.user_id
    axios.post("https://reddit-two-point-oh.herokuapp.com/subreddits", info).then((response) => {
      this.getSubreddits()
    })
  }

  logout = () => {
    document.querySelector('#loginNavButton').style.display = "flex"
    document.querySelector('#createNavButton').style.display = "flex"
    document.querySelector('#logoutNavButton').style.display = "none"
    document.querySelector('#newPostLoggedIn').style.display = 'none'
    document.querySelector('#newSubDiv').style.display = "none"
    this.setState({
      posts: this.state.posts,
      currentUser: {},
      subreddits: this.state.subreddits
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

          <div id="logo">
            <img src="https://ps.w.org/wp-avatar/assets/icon-256x256.png?rev=1787902" id="reddit-icon"/>
            <h1>reddit 2.0</h1>
          </div>

          <div id="nav-commands">
            <div id="not-logged-in">
              <h3 onClick={this.showLogin} id="loginNavButton">Login</h3>
              <h3 onClick={this.showCreate} id="createNavButton">Create Account</h3>
            </div>
            <h3 onClick={this.logout} id="logoutNavButton" 
            style={{display:"none"}}>
              Log Out</h3>
            </div>

        </div>
        <div id="loginDiv" style={{display:"none"}}>
          <Login submitLogin={this.submitLogin} currentUser={this.state.currentUser} toggleAuthDivs={this.toggleAuthDivs} />
        </div>
        <div id="newUserDiv" style={{display:"none"}}>
          <NewUser createUser={this.createUser} toggleAuthDivs={this.toggleAuthDivs} />
        </div>
         <div id="newSubDiv" style={{display:"none"}}>
          <CreateSub createSub={this.createSub} />
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
