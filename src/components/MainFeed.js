import React, { Component } from 'react'
import UpAndDownVote from './UpAndDownVote'

class MainFeed extends Component {

  render = () => {
    return (
      <div id='mainFeed'>
        <h2>Recent Posts</h2>
        {!this.props.currentUser.username  ?
          this.props.appState.posts.slice(this.props.appState.posts.length - 21, this.props.appState.posts.length - 1).map((post) => {
          return (
            <div id="post-id">
              <h6>Posted by /{post.author}</h6>
              <h4>{post.title}</h4>
              <h5>{post.body}</h5>
              <UpAndDownVote upVote={this.props.upVote} downVote={this.props.downVote} currentUser={this.props.appState.currentUser} post_id={post.id} votes={post.votes} />
            </div>
          )
          }).reverse()
        : (this.props.currentUser.sub_reddit_id !== null ?
            this.props.appState.posts.slice(this.props.appState.posts.length - 21, this.props.appState.posts.length - 1).map((post) =>{
              return(
                (this.props.currentUser.sub_reddit_id.includes(post.subreddit_id) ?
                  <div id="post-id" style={{order: "1"}}>
                    <h6>Posted by /{post.author}</h6>
                    <h4>{post.title}</h4>
                    <h5>{post.body}</h5>
                    <UpAndDownVote upVote={this.props.upVote} downVote={this.props.downVote} currentUser={this.props.appState.currentUser} post_id={post.id} votes={post.votes} />
                  </div>
                  : (!this.props.currentUser.sub_reddit_id.includes(post.subreddit_id) ?
                  <div id="post-id" style={{order: "3"}}>
                    <h6>Posted by /{post.author}</h6>
                    <h4>{post.title}</h4>
                    <h5>{post.body}</h5>
                    <UpAndDownVote upVote={this.props.upVote} downVote={this.props.downVote} currentUser={this.props.appState.currentUser} post_id={post.id} votes={post.votes} />
                  </div> : null
                      )
                    )
                  )
                }).reverse()

            : this.props.appState.posts.slice(this.props.appState.posts.length - 21, this.props.appState.posts.length - 1).map((post) => {
            return (
              <div id="post-id">
                <h6>Posted by /{post.author}</h6>
                <h4>{post.title}</h4>
                <h5>{post.body}</h5>
                <UpAndDownVote upVote={this.props.upVote} downVote={this.props.downVote} currentUser={this.props.appState.currentUser} post_id={post.id} votes={post.votes} />
              </div>
            )
            }).reverse()
            )}



      </div>
    )
  }

}

export default MainFeed
