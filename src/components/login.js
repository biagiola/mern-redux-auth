import React, { Component } from 'react'

import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import { setUsername, setAuthToken, setUserImage } from '../actions'

import axios from 'axios'

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      registerMessage: ''
    }
  }

  changeEmail = e => {
    this.setState({
      email: e.target.value
    });
  }

  changePassword = e => {
    this.setState({
      password: e.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault()

    const newUser = {
      email: this.state.email,
      password: this.state.password
    }

    axios.post('http://localhost:5000/auth/login', newUser)
    .then(res => {
      this.props.setUsername(res.data.name)
      this.props.setAuthToken(res.data.token)
      this.props.setUserImage(res.data.productImage)
      console.log('res.data ',res.data)
      this.props.history.push('/dashboard')
    })
    .catch(error => {
      console.log(error);
      //alert(error.response.data)
    })
  }

  render() {
    return (
      <div className="wrapper container">
        <form onSubmit={this.onSubmit} className="form-group">
          <input
            id="femail"
            type="text"
            className="form-control"
            placeholder="enter your email..."
            value={this.state.email}
            onChange={this.changeEmail} />
          <br />
          <input
            id="fpwd"
            type="text"
            className="form-control"
            placeholder="enter your password..."
            value={this.state.password}
            onChange={this.changePassword} />
          <br />
          <button className="btn">Login</button>
        </form>
      </div>
    )
  }
}

SignUp.propTypes = {
  setUsername: PropTypes.func,
  setAuthToken: PropTypes.func,
  setUserImage: PropTypes.func
}

const mapStateToProps = state => ({
  showNavbar: state.main.switchNavbar,
})

const mapDispatchToProps = dispatch => {
  return {
    setUsername: name => dispatch(setUsername(name)),
    setAuthToken: token => dispatch(setAuthToken(token)),
    setUserImage: img => dispatch(setUserImage(img))
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)