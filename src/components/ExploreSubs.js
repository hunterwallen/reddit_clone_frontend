import React, { Component } from 'react'


class ExploreSubs extends Component {

  showSubreddit = (event) => {
   let subId = event.currentTarget.id
   this.props.showSubreddit(subId)
  }

  render = () => {
    return (
      <div id="explore-subreddits">
        <h3>Subreddits</h3>
        {this.props.appState.subreddits.map((subreddit) => {
          return (
          <div class="subreddit-list" id={subreddit.sub_reddit_id} onClick={this.showSubreddit}>
            <h4 id="subreddit-name">{subreddit.name}</h4>
            <h5 id="subreddit-description">{subreddit.description}</h5>
          </div>
        )
      }).reverse()}
      </div>
    )
  }

}

export default ExploreSubs
