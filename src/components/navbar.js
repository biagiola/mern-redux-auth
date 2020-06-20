import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
                <Link to="/" className="navbar-brand">Home</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/dashboard" className="nav-link">List</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Article</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/lenguage" className="nav-link">Lenguages</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/register" className="nav-link">Add User</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
