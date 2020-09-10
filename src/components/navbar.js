import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import { setAuthToken, moveContent } from '../actions'

//import source from '../../backendLocal/upload/holix'

class Navbar extends Component {
    
  handleLogOut = () => {
    this.props.setAuthToken(null)
  }
  
  hangleMarginLeft = () => {
    this.props.moveContent()
  }

  render() {
    const { authToken, username } = this.props
    
    const show = authToken !== null ?
    <header>
      <label htmlFor="check">
        <i 
            id="sidebar_btn"
            className="fas fa-bars" 
            onClick={ this.hangleMarginLeft }
        ></i>
      </label>
      
      <div className="right_area">
        <Link 
            to={'/'}
            className="logout_btn"
            onClick={ this.handleLogOut }
        >Logout</Link>
      </div>
    </header>
    : ''

    const sidebar = authToken !== null ?
    <div className="sidebar">
      <div className="profile_info">
        <img src='./1.png' className="profile_image" alt="" />
        <h4>{ username }</h4>
      </div>
      <Link to={'/dashboard'}><i className="fas fa-home"></i><span>Dashboard</span></Link>
      <Link to={'/create'}><i className="fas fa-pencil-alt"></i><span>Create</span></Link>
      <Link to={'/bitcoin'}><i className="fas fa-dollar-sign"></i><span>Bitcoin</span></Link>
      <Link to={'/weather'}><i className="fas fa-sun"></i><span>Weather</span></Link>
      <Link to={'/lenguage'}><i className="fas fa-info-circle"></i><span>Lenguage</span></Link>
      <Link to={'/signup'}><i className="fas fa-sliders-h"></i><span>Sign Up</span></Link>
    </div>  
    : ''       

    return (
      <div>
        <input type="checkbox" id="check"/>    
        { show }
        { sidebar }                        
      </div>
    );
  }
}

Navbar.propTypes = {
  changeShowNavbar: PropTypes.func,
  moveContent: PropTypes.func,
  username: PropTypes.string,
  
}

const mapStateToProps = state => ({
  authToken: state.main.authToken,
  username: state.main.username,
  userImage: state.main.userImage,
})

const mapDispatchToProps = dispatch => {
  return {
    setAuthToken: nullToken => dispatch(setAuthToken(nullToken)),
    moveContent: () => dispatch(moveContent())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)