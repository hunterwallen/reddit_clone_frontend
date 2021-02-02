import React, { Component } from 'react'

class Sidebar extends Component {

    state = {
        uniqueAuthors: []
    }

    componentDidMount = () => {
        setTimeout(()=>{this.getAuthors()}, 1000)
    }

    getAuthors = () => {
        let authorsArray = []
        console.log(this.props.appState);
        this.props.appState.posts.map((post) => {
          authorsArray.push(post.author)
        })
        console.log(authorsArray);
        const authors = Array.from(new Set(authorsArray))
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



            <div class="sidebar" id="ad-space">
                <img src="https://external-preview.redd.it/rwpCB5xxSfklIDhmbs9vO6UL16JwwXs6LPwupL6m2h4.jpg?auto=webp&s=a5c1f4dc8f1b1f39a7a16b263783c995e4f2d1b4" id="ad" alt="ad" />
            </div>

            </div>


        )
    }
}

export default Sidebar
