import React, { Component } from 'react'
import Post from './Post'

class ShowSub extends Component {

  showSubreddit = (event) => {
   let subId = event.target.id
   this.props.showSubreddit(subId)
  }

  render = () => {
    return (
      <div>
        {this.props.appState.subreddits.map((subreddit) => { return(
          this.props.appState.viewingSub === subreddit.sub_reddit_id ?
          <div>
            <h4>{subreddit.name}</h4>
            <h5>{subreddit.description}</h5>
            <main id="postMain">
                      <Post posts={this.props.posts} deletePost={this.props.deletePost} handleSubmit={this.props.handleSubmit} handleEdit={this.props.handleEdit} currentUser={this.props.currentUser}
                      currentSubredditId={subreddit.sub_reddit_id}/>
            </main>
          </div>
          : null
         )
        })}
      </div>
    )
  }

}

export default ShowSub
