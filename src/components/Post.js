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
        <h2>Posts</h2>
        <NewPost handleSubmit={this.handleSubmit} />
        <ul>
        {this.props.posts.map((post) => {
          return (<li>
            <h4>{post.title}</h4>
            <h6>{post.author}</h6>
            <h5>{post.body}</h5>
            <button id={post.id} onClick={this.deletePost}>Delete Post</button>
            <EditPost handleEdit={this.handleEdit} postId={post.id} author={post.author} title={post.title} body={post.body}/>
          </li>
        )
      }).reverse()}
        </ul>
      </div>
    )
  }

}

export default Post