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
        <div id='newPostLoggedIn' style={{display:"none"}}>
          <NewPost currentUser ={this.props.currentUser} handleSubmit={this.handleSubmit} />
        </div>
        {this.props.posts.map((post) => {
          return (<div id="post-id">
            <h6>Posted by /{post.author}</h6>
            <h4>{post.title}</h4>
            <h5>{post.body}</h5>
            <button id={post.id} onClick={this.deletePost}>Delete Post</button>
            <EditPost handleEdit={this.handleEdit} postId={post.id} author={post.author} title={post.title} body={post.body}/>
          </div>
        )
      }).reverse()}
      </div>
    )
  }

}

export default Post
