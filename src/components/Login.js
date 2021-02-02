import React, { Component } from 'react'


class Login extends Component {

  state = {
    email: "",
    password: ""
  }

  checkQualified = (event) => {
    if(this.state.email === "" || this.state.password === "") {
      document.querySelector('#loginButton').style = "display: flex; opacity: 0.5; pointer-events: none;"
    } else {
      document.querySelector('#loginButton').style = "display: flex; opacity: 1.0; pointer-events: auto;"
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
    setTimeout(()=> {document.querySelector('#login_failed').style.display = "block"}, 2000)
  }

  render = () => {
    return (
      <div id="user-login">
        <div id="loginTitleAndForm">
          <h5 id="create-a-post">Login</h5>
          <br/>
          <div class="form">
            <form onSubmit={this.submitLogin} className="loginForm">
              <input type="text" id="email" onChange={this.handleChange} placeholder="Email"/>
              <input type="password" id="password" onChange={this.handleChange} placeholder="Password"/>

              <p id="login_failed" style={{display: "none"}}>Your username or password is invalid. Please try again.</p>

              <input type="submit" value="Login"
              // style={{opacity: 0.7}}
              id="loginButton"/>
            </form>
          </div>
        </div>

        <div id="switch_to_create_user">
          <button className='toggle_sign_in_create' id="need-to-create-acct" onClick={this.props.toggleAuthDivs}>Need to create an account?</button>
        </div>
      </div>
    )
  }

}


export default Login
