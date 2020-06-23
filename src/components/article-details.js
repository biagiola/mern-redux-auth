import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class ArticleDetails extends Component {
    constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      duration: 0,
      date: new Date(),
      lenguages: [],
      articles: [],
      fragmented: [],
      id: '',
    }
        this.deleteArticle = this.deleteArticle.bind(this);
        this.paragraph = React.createRef();
    }

    componentDidMount() {

        this.setState({
            id: this.props.match.params.id 
        })

        // get individual exercise.
        axios.get('http://localhost:5000/articles/' + this.props.match.params.id)
        .then(response => {
            this.setState({
                title: response.data.title,
                description: response.data.description,
                duration: response.data.duration,
                date: new Date(response.data.date)
            }) 
        })
        .catch(function (error) {
            console.log(error);
        })

        // get all lenguages.
        axios.get('http://localhost:5000/lenguages/')
        .then(response => {
            if (response.data.length > 0) {
            this.setState({
                lenguages: response.data.map(lenguage => lenguage.lenguage),
            })
            }
        }).catch( error => console.log(error) )
    }

    deleteArticle( id ) {
        axios.delete( 'http://localhost:5000/articles/' + id )
            .catch( res => console.log( res.data ) );
        
        this.setState({
            articles: this.state.articles.filter( el => el._id !== id )  
        })
    }

    render(props) {

        return (
            <div>
                <h6 className="container mt-3">{ this.state.title }</h6>
                
                <div ref={ this.paragraph }>
                    {this.state.description}
                </div>

                <small>Written at: { this.state.date.toString().substr(0,10) }</small><br/>
                <Link to={ '/edit/' + this.props.match.params.id } className="btn btn-primary">edit</Link> 
                <Link to={"/deleted"} className="btn btn-primary" onClick={ () =>{ this.deleteArticle(this.props.match.params.id) } }>delete</Link> 
                <Link to={"/dashboard"} className="btn btn-primary">back</Link>
            </div>
        )
    }
}   