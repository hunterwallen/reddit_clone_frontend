import React, { Component } from 'react'


class CreateSub extends Component {

  state = {
    name: "",
    description: "",
    public: false
  }


  checkQualified = (event) => {
    if(this.state.name === "" || this.state.description === "") {
      document.querySelector('#createSubButton').style = "display: flex; opacity: 0.5; pointer-events: none;"
    } else {
      document.querySelector('#createSubButton').style = "display: flex; opacity: 1.0; pointer-events: auto;"
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    })
    this.checkQualified(event)
  }

  createSub = (event) => {
    event.preventDefault()
    let newSub = {
      name: this.state.name,
      description: this.state.description,
      public: this.state.public
    }
    this.props.createSub(newSub)
    this.setState({
      name: "",
      description: "",
      public: false
    })
    event.target.reset()
  }

  render = () => {
    return (
      <div id="new-sub">
        <h5 id="create-a-sub">Create a new Subreddit 2.0</h5>
        <br/>
        <form onSubmit={this.createSub} className="createSubForm">

          <p>Subreddit 2.0 Name</p>
          <input type="text" id="name" onChange={this.handleChange} placeholder="Name..." />


          <p> Subreddit 2.0 Description</p>
          <textarea id="description" placeholder='Enter description...(limit 500 char)' onChange={this.handleChange}></textarea>

          <p>Who can view posts on this subreddit 2.0?</p>
          <select id="public" onChange={this.handleChange}>
            <option value={false}>Follower's Only</option>
            <option value={true}>Public</option>
          </select>

          <br/>
          <input type="submit" id="createSubButton" value="Create Subreddit 2.0" />
        </form>
      </div>
    )
  }

}


export default CreateSub
