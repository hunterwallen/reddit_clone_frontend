import React, { Component } from 'react'


class Login extends Component {

  state = {
    email: "",
    password: ""
  }

  checkQualified = (event) => {
    if(this.state.email === "" || this.state.password === "") {
      document.querySelector('#loginButton').style.display = "none"
    } else {
      document.querySelector('#loginButton').style.display = "block"
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    })
    this.checkQualified(event)
  }

  submitLogin = (event) => {
    event.preventDefault()
    let creds = {
      "email": this.state.email,
      "password": this.state.password
    }
    this.props.submitLogin(creds)
    this.setState({
      email: "",
      password: ""
    })
    event.target.reset()
    setTimeout(()=> {document.querySelector('#login_failed').style.display = "block"}, 1000)
  }

  render = () => {
    return (
      <div id="user-login">
        <h5 id="create-a-post">Login</h5>
        <br/>
        <form onSubmit={this.submitLogin}>
          <input type="text" id="email" onChange={this.handleChange} placeholder="Email"/>
          <input type="password" id="password" onChange={this.handleChange} placeholder="Password"/>
          <p id="login_failed" style={{display: "none"}}>Your username or password is invalid. Please try again"</p>
          <input type="submit" value="Login" style={{display:"none"}} id="loginButton"/>
        </form>
        <div id="switch_to_create_user">
          <button class='toggle_sign_in_create' id="need-to-create-acct" onClick={this.props.toggleAuthDivs}>Need to create an account?</button>
        </div>
      </div>
    )
  }

}


export default Login
