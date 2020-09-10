import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

class NewUser extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  changeName = e => {
    this.setState({
      name: e.target.value
    })
  }
  changeEmail = e => {
    this.setState({
      email: e.target.value
    })
  }
  changePassword = e => {
    this.setState({
      password: e.target.value
    })
  }
  onSubmit = e => {
    e.preventDefault()

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }
    axios.post('http://localhost:5000/auth/register', newUser)
    .then( res => console.log( res.data ))

    window.location = '/'
  }

  render() {
    const { moveContentValue } = this.props
    const margin = moveContentValue ?
    "60px" :  "250px"

    return (
      <div className="content" style={{ marginLeft: margin }}>
        <form onSubmit={ this.onSubmit }>
          <input 
            placeholder="Enter your name"
            type="text"
            value={ this.state.name } 
            onChange={ this.changeName } />
            <br/>
          <input 
            placeholder="Enter your email"
            type="text"
            value={ this.state.email } 
            onChange={ this.changeEmail } />
            <br/>
          <input
            placeholder="Enter your password" 
            type="text" 
            value={ this.state.password }
            onChange={ this.changePassword } />
            <br/>
          <button>Send</button>
        </form>
      </div>
    )
  }
}

NewUser.propTypes = {
  moveContentValue: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  moveContentValue: state.main.moveContentValue
})

export default connect(mapStateToProps, null)(NewUser)