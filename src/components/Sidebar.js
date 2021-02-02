import React, { Component } from 'react'

class Sidebar extends Component {

    state = {
        uniqueAuthors: []
    }

    componentDidMount = () => {
        setTimeout(()=>{this.getAuthors()}, 500)
    }

    getAuthors = () => {
        let authorsArray = []
<<<<<<< HEAD
        let postArray = this.props.appState.posts
        let i;
        for (i = 0; i < postArray.length; i++) {
            authorsArray.push(postArray[i].author)
        }
        let authors = Array.from(new Set(authorsArray))
=======
        console.log(this.props.appState);
        this.props.appState.posts.map((post) => {
          authorsArray.push(post.author)
        })
        console.log(authorsArray);
        const authors = Array.from(new Set(authorsArray))
>>>>>>> 560f4638113d6f86002298a821b5789d0e4cf849
        this.setState({
            uniqueAuthors: authors
        })
    }

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
            <img src="https://s0.2mdn.net/9188754/CF011AG_January-BMF-Display-Ads_300x250_-_1.26.21.gif" id="ad" alt="ad" />
        </div>

        <div className="sidebar" id="trending-users">
            <div id="sidebar-title-2">
                <h4 id="popular-subreddits-title">Trending Contributors</h4>
            </div>

            {this.state.uniqueAuthors.slice(0, 5).map((author) => {
                return (
                    <div id={author}>
                        <h5 id="subreddit-created_by">
                            <img src="https://icon2.cleanpng.com/20180215/xvq/kisspng-triangle-shape-clip-art-transparent-shapes-cliparts-5a85f21d4525a0.6684716115187277092832.jpg" id="unicorn" /> /{author}
                        </h5>
                    </div>
                    )})}

            </div>
            </div>


        )
    }
}

export default Sidebar
