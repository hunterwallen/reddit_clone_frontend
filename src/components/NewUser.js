import React, { Component } from 'react'


class NewUser extends Component {

  state = {
    username: "",
    email: "",
    password: "",
    verified_password: ""
  }

  checkQualified = (event) => {
    if(this.state.username === "" || this.state.email === "" || this.state.password === "") {
      document.querySelector('#createButton').style.display = "none"
    } else if (this.state.password !== event.target.value){
      document.querySelector('#createButton').style.display = "none"
    } else {
      document.querySelector('#createButton').style.display = "block"
    }
  }

  checkMatch = (event) => {
    if (this.state.password !== event.target.value){
      document.querySelector('#matchingWarning').style.display = "block"
    } else {
        document.querySelector('#matchingWarning').style.display = "none"
    }
    this.checkQualified(event)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    })
    if (event.target.id === 'verified_password') {
      this.checkMatch(event)
    } else {
    this.checkQualified(event)
    }
  }

  createUser = (event) => {
    event.preventDefault()
    let newUser = {
      user_name: this.state.username,
      password: this.state.password,
      email: this.state.email
    }
    this.props.createUser(newUser)
    this.setState({
      username: "",
      email: "",
      password: "",
      verified_password: ""
    })
    event.target.reset()
  }

  render = () => {
    return (
      <div id="new-user">
        <h5 id="create-a-post">Create a new user account</h5>
        <br/>
        <form onSubmit={this.createUser}>
          
          <input type="text" id="email" onChange={this.handleChange} placeholder="Email" />
         
          <input type="text" id="username" onChange={this.handleChange} placeholder="Username" />
          
          <input type="password" id="password" onChange={this.handleChange} placeholder="Password" />
          
          <input type="password" id="verified_password" onChange={this.handleChange} placeholder="Verify Password" />
          <p id="matchingWarning" style={{display:"none"}}> Your passwords do not match</p>

          
          <input type="submit" id="createButton" value="Create Account" 
          style={{display:"none"}} 
          />
        </form>
      </div>
    )
  }

}


export default NewUser
