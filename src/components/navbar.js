import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { changeShowNavbar } from '../actions'


class Navbar extends Component {
    constructor(props) {
        super(props)
        this.handleLogOut = this.handleLogOut.bind(this)
    }

    handleLogOut() {
        console.log('handleout navbar')
        this.props.changeShowNavbar()
    }
 
    render() {
        return (
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
        );
    }
}

Navbar.propTypes = {
    changeShowNavbar: PropTypes.func
}

const mapDispatchToProps = dispatch => {
    return {
        changeShowNavbar: () => dispatch(changeShowNavbar())
    }
}

export default connect(null, mapDispatchToProps)(Navbar)
