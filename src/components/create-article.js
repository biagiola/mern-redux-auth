import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default class CreateArticle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lenguage: '',
            title: '',
            description: '',
            date: new Date(),
            lenguages: []
        }
    }
    
    componentDidMount() {
        axios.get('http://localhost:5000/lenguages/')
            .then( response => {
                if ( response.data.length > 0 ) {
                    this.setState({
                        lenguages: response.data.map( lenguages => lenguages.lenguage ),
                        lenguage: response.data[0].lenguage
                    })
                }
            }
        ).catch( error => console.log(error) )
    }

    onChangeLenguage = (e) => {
        this.setState({
            lenguage: e.target.value
        })
    }

    onChangeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    onChangeDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDate = (date) => {
        this.setState({
          date: date
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const article = {
            lenguage: this.state.lenguage,
            title: this.state.title,
            description: this.state.description,
            date: this.state.date
        }

        console.log(article);

        axios.post('http://localhost:5000/articles/add', article)
        .then( res => console.log( 'respuesta ',res.data ) )
        .catch( err => console.log( err ));

        this.props.history.push('/dashboard');
    }

    render() {
        return (
            <div className="wrapper text-dark">
                <h3 className="text-dark container mt-2">Create New Article</h3>
                <form onSubmit={ this.onSubmit } className="container">
                    <div className='form-group'>
                        <label>Lenguage: </label>
                        <select
                            ref="userInput"
                            required
                            className="form-control"                        
                            value={ this.state.lenguage }
                            onChange={ this.onChangeLenguage }
                        >{
                            this.state.lenguages.map( function(lenguage) {
                                return (<option
                                        key={ lenguage }
                                        value={ lenguage }
                                    >
                                    { lenguage }
                                </option>);
                            })
                        }
                        </select>
                    </div>
                    <div className="form-group text-dark">
                        <label>Title:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={ this.state.title }
                            onChange={ this.onChangeTitle }
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            type="text"
                            required
                            className="form-control"
                            rows="8"
                            value={ this.state.description }
                            onChange={ this.onChangeDescription }
                        />
                    </div>
                    <div className="form-group">
                        <label>Date:</label>
                        <div>
                            <DatePicker
                                selected={ this.state.date }
                                onChange={ this.onChangeDate }
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input 
                            type="submit" 
                            className="btn btn-primary"
                            value="Create" />
                    </div>
                </form>
            </div>
        )
    }
}