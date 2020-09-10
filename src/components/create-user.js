import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import axios from 'axios'

class newUser extends Component {
  constructor(props){
      super(props)
      this.state = {
          name: '',
          email: '',
          password: '',
          location: '*',
          registerMessage: '',
          image: null
      }
  }

  changeName = e => {
    this.setState({
      name: e.target.value
    });
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

  changeImage = e => {
    this.setState({ 
      image: e.target.files[0] 
    })
  }

  onSubmit = e => {
    e.preventDefault();

    /*const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }*/
    let formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    formData.append('productImage', this.state.image,this.state.image.name);

    axios.post('http://localhost:5000/auth/register', formData)
    .then( res => {
      alert(res.data.name + " user has been added :)")
      this.props.history.push('/dashboard')})
    .catch( error => {
      console.log(error);
      alert(error.response.data )}
    )
  }

  render() {
    const { moveContentValue } = this.props
    const value = moveContentValue ?
    "60px" :  "250px"

    const main = this.props.authToken !== null ?
    <div>
      <h3 className="text-dark mt-2">Add a new user</h3>
      <form onSubmit={ this.onSubmit } className="form-group">
        <input
          id="fname" 
          type="text"
          className="form-control"
          placeholder="enter your name..."
          value={ this.state.name } 
          onChange={ this.changeName } 
          />
          <br/>
        <input 
          id="femail"
          type="text"
          className="form-control"
          placeholder="enter your email..."
          value={ this.state.email } 
          onChange={ this.changeEmail } />
          <br/>
        <input 
          id="fpwd"
          type="text" 
          className="form-control"
          placeholder="enter your password..."
          value={ this.state.password }
          onChange={ this.changePassword } />
          <br/>
        <input 
          type="file" 
          onChange={ this.changeImage } />
          <br/>
        <button className="btn btn-primary">Send</button>
      </form>
    </div>
    :
    <div>
      <Redirect to="/" />
    </div>

    return (
      <div className="wrapper container" style={{ marginLeft: value }}> 
        { main }
      </div>
    )
  }
}

newUser.propTypes = {
  authToken: PropTypes.string
}

const mapStateToProps = state => ({
  authToken: state.main.authToken,  
  moveContentValue: state.main.moveContentValue
})

export default connect(mapStateToProps, null)(newUser)