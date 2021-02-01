import React, { Component } from 'react'
import Post from './Post'
import ShowSub from './ShowSub'

class Sidebar extends Component {

    showSubreddit = (event) => {
      this.props.showSubreddit(event.currentTarget.id)
    }

    render = () => {
        return (
        <div>

        <div class="sidebar" id="popular-subreddits">
            <div id="sidebar-title-1">
                <h4 id="popular-subreddits-title">Popular SubReddits</h4>
            </div>
            {this.props.appState.subreddits.slice(0, 5).map((subreddit) => {
            return (
            <div id={subreddit.sub_reddit_id} onClick={this.showSubreddit}>
                    <h5 id="subreddit-name">
                        <img src="https://icon2.cleanpng.com/20180215/xvq/kisspng-triangle-shape-clip-art-transparent-shapes-cliparts-5a85f21d4525a0.6684716115187277092832.jpg" id="unicorn" /> /{subreddit.name}
                    </h5>
            </div>
            )
        }).reverse()}
        </div>

        <div class="sidebar" id="ad-space">
            <img src="https://s0.2mdn.net/9188754/CF011AG_January-BMF-Display-Ads_300x250_-_1.26.21.gif" id="ad"/>
        </div>

        <div class="sidebar" id="trending-users">
            <div id="sidebar-title-2">
                <h4 id="popular-subreddits-title">Trending Contributors</h4>
            </div>
            {this.props.appState.subreddits.slice(0, 5).map((subreddit) => {
            return (
            <div id={subreddit.sub_reddit_id} onClick={this.showSubreddit}>
                <a href="#">
                    <h5 id="subreddit-created_by">
                        <img src="https://icon2.cleanpng.com/20180215/xvq/kisspng-triangle-shape-clip-art-transparent-shapes-cliparts-5a85f21d4525a0.6684716115187277092832.jpg" id="unicorn" /> /{subreddit.created_by}
                    </h5>
                </a>
            </div>
            )
        }).reverse()}
        </div>

        </div>


        )
    }
}

export default Sidebar
