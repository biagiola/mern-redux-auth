import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    
    render() {
        return (
            <nav className="navbar navbar-light bg-light navbar-expand-sm">
                <Link to="/" className="navbar-brand">Schneller</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Exercises</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Article</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Create Lenguage</Link>
                        </li>
                    </ul>
                </div><br/>
                <h4 className="navbar-item text-light"></h4>
            </nav>
        );
    }
}
