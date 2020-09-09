import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import { setAuthToken } from '../actions'

class Sidebar extends Component {
    
    handleLogOut = () => {
      this.props.setAuthToken(null)
    }
 
    render() {
      const show = this.props.authToken === null ?
      <div className="sidebar">
        <div className="profile_info">
            <img src={ this.props.userImage } className="profile_image" alt="" />
            <h4>{ this.props.username }</h4>
        </div>
        <Link to={'/dashboard'}><i className="fas fa-desktop"></i><span>Dashboard</span></Link>
        <Link to={'/create'}><i className="fas fa-cogs"></i><span>Create</span></Link>
        <Link to={'/bitcoin'}><i className="fas fa-dollar-sign"></i><span>Bitcoin</span></Link>
        <Link to={'/weather'}><i className="fas fa-th"></i><span>Weather</span></Link>
        <Link to={'/lenguage'}><i className="fas fa-info-circle"></i><span>Lenguage</span></Link>
        <Link to={'/signup'}><i className="fas fa-sliders-h"></i><span>Sign Up</span></Link>
      </div>
      :
      ''

      return (
        <div>
          { show }
        </div>
      )
    }
}

Sidebar.propTypes = {
  changeShowNavbar: PropTypes.func,
  authToken: PropTypes.string,
  username: PropTypes.string,
  userImage: PropTypes.string,
}

const mapStateToProps = state => ({
  authToken: state.main.authToken,
  username: state.main.username,
  userImage: state.main.userImage
})

const mapDispatchToProps = dispatch => {
    return {
      setAuthToken: nullToken => dispatch(setAuthToken(nullToken))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)