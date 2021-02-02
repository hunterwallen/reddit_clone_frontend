import React, { Component } from 'react'
import Post from './Post'

class ShowSub extends Component {

  showSubreddit = (event) => {
   let subId = event.target.id
   this.props.showSubreddit(subId)
  }

  leaveSub = () => {
    let subInfo = {
      user_id: this.props.currentUser.user_id,
      sub_reddit_id: this.props.appState.viewingSub
    }
    this.props.leaveSub(subInfo)
  }

  joinSub = () => {
    let subInfo = {
      user_id: this.props.currentUser.user_id,
      sub_reddit_id: this.props.appState.viewingSub
    }
    this.props.joinSub(subInfo)
  }


  render = () => {
    return (
      <div className='showSubContainer'>
        {this.props.appState.subreddits.map((subreddit) => { return(
          this.props.appState.viewingSub === subreddit.sub_reddit_id ?
          <div>
            <div className="subredditInfo">
              <h4>{subreddit.name}</h4>
              <h5>{subreddit.description}</h5>
              {this.props.currentUser.username ?
                (subreddit.user_id === null ?
                  <div>
                    <button className="joinSub" onClick={this.joinSub}>Join</button>
                  </div> :
                  (subreddit.user_id.includes(this.props.currentUser.user_id) ?
                  <div>
                    <button className="leaveSub" onClick={this.leaveSub}>Leave</button>
                  </div>
                    :
                    <div>
                      <button className="joinSub" onClick={this.joinSub}>Join</button>
                    </div>
                  ))
              : null}
            </div>
            {subreddit.public === "t" ?
            <main id="postMain">
                      <Post posts={this.props.posts} deletePost={this.props.deletePost} handleSubmit={this.props.handleSubmit} handleEdit={this.props.handleEdit} currentUser={this.props.currentUser}
                      currentSubredditId={subreddit.sub_reddit_id} upVote={this.props.upVote} downVote={this.props.downVote} />
            </main>
            : (this.props.currentUser.username ?
                (subreddit.user_id === null ?
                  null :
                   (subreddit.user_id.includes(this.props.currentUser.user_id) ?
                     <main id="postMain">
                               <Post posts={this.props.posts} deletePost={this.props.deletePost} handleSubmit={this.props.handleSubmit} handleEdit={this.props.handleEdit} currentUser={this.props.currentUser}
                               currentSubredditId={subreddit.sub_reddit_id} upVote={this.props.upVote} downVote={this.props.downVote} />
                     </main> : null
                 )
             ) : null)
          }

          </div>
          : null
         )
        })}
      </div>
    )
  }

}

export default ShowSub
