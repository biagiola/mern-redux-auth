import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { setAuthToken } from '../actions';

class Navbar extends Component {
    
    handleLogOut = () => {
        this.props.setAuthToken(null)
    }
 
    render() {

        const show = this.props.authToken !== null ?
            <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/dashboard" className="nav-link">Blog</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/lenguage" className="nav-link">Lenguages</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/signup" className="nav-link">Add Credentials</Link>
                        </li>
                        
                    </ul>
                    { !this.props.showNavbar  && <ul className="navbar-nav left">
                        <li>
                            <Link to="/" className="nav-link" onClick={ this.handleLogOut }>Log out</Link>
                        </li>
                    </ul> }
                </div>
            </nav>
        :
            ''

        return (
            <div>
                { show }
            </div>
        );
    }
}

Navbar.propTypes = {
  changeShowNavbar: PropTypes.func
}

const mapStateToProps = state => ({
  authToken: state.casa.authToken
})

const mapDispatchToProps = dispatch => {
    return {
        setAuthToken: (nullToken) => dispatch(setAuthToken(nullToken))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
