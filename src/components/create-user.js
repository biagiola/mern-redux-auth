import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router'

export default class newUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            location: '*',
            registerMessage: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    changeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    changeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    changePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:5000/auth/register', newUser)
            .then( res => {
                alert(res.data.name + " user has been added :)")
                this.props.history.push('/dashboard')})
            .catch( error => {
                console.log(error);
                alert(error.response.data )}
            )
    }

    render() {
        return (
            <div className="wrapper container"> 
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
                    <button className="btn btn-primary">Send</button>
                </form>
            </div>
        )
    }
}
