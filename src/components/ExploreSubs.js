import React, { Component } from 'react'


class ExploreSubs extends Component {

  showSubreddit = (event) => {
   let subId = event.currentTarget.id
   this.props.showSubreddit(subId)
  }

  render = () => {
    return (
      <div>
        <h1>Subreddits</h1>
        {this.props.appState.subreddits.map((subreddit) => {
          return (
          <div id={subreddit.sub_reddit_id} onClick={this.showSubreddit}>
            <h4>{subreddit.name}</h4>
            <h5>{subreddit.description}</h5>
          </div>
        )
      }).reverse()}
      </div>
    )
  }

}

export default ExploreSubs
