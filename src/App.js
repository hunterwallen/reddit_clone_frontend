import React, { Component } from 'react'
import Post from './components/Post'
import NewUser from './components/NewUser'
import Login from './components/Login'
import CreateSub from './components/CreateSub'
import ExploreSubs from './components/ExploreSubs'
import ShowSub from './components/ShowSub'
import Sidebar from './components/Sidebar'
import MainFeed from './components/MainFeed'
import axios from 'axios'

class App extends Component {
  state = {
    posts: [],
    currentUser: {},
    subreddits: [],
    viewingSub: ""
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
          subreddits: this.state.subreddits,
          viewingSub: this.state.viewingSub
        })
    })
  }

  getSubreddits = () => {
    axios.get('https://reddit-two-point-oh.herokuapp.com/subreddits').then((response) => {
      this.setState({
        posts: this.state.posts,
        currentUser: this.state.currentUser,
        subreddits: response.data.reverse(),
        viewingSub: ""
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
    info.subreddit_id = Number(this.state.viewingSub)
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
        subreddits: this.state.subreddits,
        viewingSub: ""
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
          currentUser: response.data,
          subreddits: this.state.subreddits,
          viewingSub: ""
        })
        document.querySelector('#loginNavButton').style.display = "none"
        document.querySelector('#createNavButton').style.display = "none"
        document.querySelector('#logged-in').style.display = "flex"
        document.querySelector('#loginDiv').style.display = "none"
        setTimeout(()=> {document.querySelector('#login_failed').style.display = "none"}, 1002)

      } else {
        this.setState({
          posts: this.state.posts,
          currentUser: {},
          subreddits: this.state.subreddits,
          viewingSub: ""
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


  joinSub = (subInfo) => {
    axios.put("https://reddit-two-point-oh.herokuapp.com/followsub", subInfo).then((response) => {
    })
    axios.put("https://reddit-two-point-oh.herokuapp.com/addsub", subInfo).then((response) => {
      this.getSubreddits()
    })
  }

  leaveSub = (subInfo) => {
    axios.put("https://reddit-two-point-oh.herokuapp.com/unfollowsub", subInfo).then((response) => {
    })
    axios.put("https://reddit-two-point-oh.herokuapp.com/leavesub", subInfo).then((response) => {
      this.getSubreddits()
    })
  }


  upvote = (post_id) => {
    let postId = {
      post_id: post_id
    }
    axios.put("https://reddit-two-point-oh.herokuapp.com/upvote", postId).then((response) => {
    })
    let info = {
      user_id: this.state.currentUser.user_id,
      post_id: post_id
    }
    axios.put("https://reddit-two-point-oh.herokuapp.com/react", info).then((response) => {
      this.getPosts()
      this.setState({
        posts: this.state.posts,
        currentUser: response.data,
        subreddits: this.state.subreddits,
        viewingSub: this.state.viewingSub
      })
    })
  }

  downvote = (post_id) => {
    let postId = {
      post_id: post_id
    }
    axios.put("https://reddit-two-point-oh.herokuapp.com/downvote", postId).then((response) => {
    })
    let info = {
      user_id: this.state.currentUser.user_id,
      post_id: post_id
    }
    axios.put("https://reddit-two-point-oh.herokuapp.com/react", info).then((response) => {
      this.getPosts()
      this.setState({
        posts: this.state.posts,
        currentUser: response.data,
        subreddits: this.state.subreddits,
        viewingSub: this.state.viewingSub
      })
    })
  }



  showSubreddit = (id) => {
    let subId = id
    console.log(subId);
      this.setState({
        posts: this.state.posts,
        currentUser: this.state.currentUser,
        subreddits: this.state.subreddits,
        viewingSub: subId
      })
      document.querySelector('#showSub').style.display = "flex"
      document.querySelector('#exploreSubs').style.display = "none"
  }

  logout = () => {
    document.querySelector('#loginNavButton').style.display = "flex"
    document.querySelector('#createNavButton').style.display = "flex"
    document.querySelector('#logged-in').style.display = "none"
    document.querySelector('#newSubDiv').style.display = "none"
    this.setState({
      posts: this.state.posts,
      currentUser: {},
      subreddits: this.state.subreddits,
      viewingSub: ""
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

  toggleNewSub = () => {
    let newSubDiv = document.querySelector('#newSubDiv')
    if(newSubDiv.style.display === "none") {
      document.querySelector('#newSubDiv').style.display = "flex"
    } else {
      document.querySelector('#newSubDiv').style.display = "none"
    }
  }

  exploreSubs = () => {
    let exploreSubs = document.querySelector('#exploreSubs')
    if(exploreSubs.style.display === "none") {
        document.querySelector('#newSubDiv').style.display = 'none'
        document.querySelector('#showSub').style.display = 'none'
        document.querySelector('#post-scroll').style.display = 'none'
        document.querySelector('#exploreSubs').style.display = 'flex'

      } else {
          document.querySelector('#post-scroll').style.display = 'flex'
        document.querySelector('#exploreSubs').style.display = 'none'
      }
  }

  goHome = () => {

      document.querySelector('#newSubDiv').style.display = 'none'
      document.querySelector('#loginDiv').style.display = "none"
      document.querySelector('#newUserDiv').style.display = "none"
      document.querySelector('#exploreSubs').style.display = 'none'
      document.querySelector('#showSub').style.display = "none"
      this.setState({
        posts: this.state.posts,
        currentUser: this.state.currentUser,
        subreddits: this.state.subreddits,
        viewingSub: ""
      })
  }

  render = () => {
    return (
      <div>
        <div id="nav">

          <div id="logo" onClick={this.goHome}>
            <img src="https://ps.w.org/wp-avatar/assets/icon-256x256.png?rev=1787902" id="reddit-icon"/>
              <h1>reddit 2.0</h1>
          </div>

          <div id="nav-commands">

              {/* NOT LOGGED IN */}
              <div id="not-logged-in">
                <h3 onClick={this.showLogin} id="loginNavButton">Login</h3>
                <h3 onClick={this.showCreate} id="createNavButton">Create Account</h3>
                <h3 onClick={this.exploreSubs} id="exploreSubRedditsButton">Explore SubReddits</h3>
              </div>

              {/* LOGGED IN */}
              <div id="logged-in" style={{display:"none"}}>
                <h3 onClick={this.toggleNewSub} id="newSubNavButton">Create New SubReddit 2.0</h3>

                <h3 onClick={this.logout} id="logoutNavButton">
                  Log Out</h3>
              </div>

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

        <div id="flex-container">
          <div id="exploreSubs" style={{display:"none"}}>
            <ExploreSubs appState={this.state} showSubreddit={this.showSubreddit}/>
          </div>
          <div id="showSub" style={{display:"none"}}>
            <ShowSub posts={this.state.posts} deletePost={this.deletePost} handleSubmit={this.handleSubmit} handleEdit={this.handleEdit} currentUser={this.state.currentUser}
            appState={this.state} joinSub={this.joinSub} leaveSub={this.leaveSub} upVote={this.upvote} downVote={this.downvote} />

          </div>

          <div id="post-scroll">
            <MainFeed appState={this.state} currentUser={this.state.currentUser} upVote={this.upvote} downVote={this.downvote} />
          </div>

          <div id="sidebar">
            <Sidebar
              appState={this.state}
              showSubreddit={this.showSubreddit}
            />
          </div>

        </div>

        </div>
    );
  }
}
export default App;
