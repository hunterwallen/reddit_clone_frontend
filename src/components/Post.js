import React, { Component } from 'react'
import NewPost from './NewPost.js'
import EditPost from './EditPost.js'


class Post extends Component {

  deletePost = (event) => {
    this.props.deletePost(event.target.id)
  }

  handleSubmit = (info) => {
    this.props.handleSubmit(info)
  }

  handleEdit = (info, postId) => {
    this.props.handleEdit(info, postId)
  }

  render = () => {
    return (
      <div>
        {this.props.currentUser.username ?
          <div id='newPostLoggedIn'>
            <NewPost currentUser={this.props.currentUser} currentSub={this.props.currentSubredditId} handleSubmit={this.handleSubmit} />
          </div>
        :
      null}
        {this.props.posts.map((post) => {
          return (
            post.subreddit_id === this.props.currentSubredditId ?

            <div id="post-id">
            <h6>Posted by /{post.author}</h6>
            <h4>{post.title}</h4>
            <h5>{post.body}</h5>
            {Number(post.user_id) === this.props.currentUser.user_id ?
              <div id="myPostsOptions">
                <button id={post.id} onClick={this.deletePost}>Delete Post</button>
                <EditPost handleEdit={this.handleEdit} postId={post.id} author={post.author} title={post.title} body={post.body} user_id={post.user_id}/>
              </div>
            : null }
          </div>

            : null)}).reverse()}

      </div>
    )
  }

}

export default Post
