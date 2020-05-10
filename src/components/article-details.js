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
      showSpans: false,
      counterSpaces: 0,
      id: '',
    }
        this.deleteArticle = this.deleteArticle.bind(this);
        this.fragmentedArticle = this.fragmentedArticle.bind(this);
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

    fragmentedArticle = () => {
        let length = this.state.description.length;
        
        let word = [];
        let fragmentedArticle = [];
        let counter = 0;
        let p1, p2 = 0;
    
        for (let x = 0; x <= length; x++) {
            word[x] = this.state.description[x];
            if( this.state.description[x] === ' ' || this.state.description[x] === "\n" ){
                p2 = x;
                fragmentedArticle[counter] = word.join('').substr(p1,p2);
                p1 = p2
                p2 = 0;
                counter++;   
            }
        } 
        this.setState({
            fragmented: fragmentedArticle,
            counterSpaces: counter,
            showSpans: !this.state.showSpans
        })
    }

    componentDidUpdate(prevProps) {
        if (this.state.showSpans !== prevProps.showSpans) {
            
            console.log('holi', this.paragraph.current.children[0]);
            let length = this.paragraph.current.children.length;

            for (let x = 0; x < length; x++) {

                setTimeout(() => {
                    console.log(x);
                    this.paragraph.current.children[x].style.color = "blue"
                }, 1000);
                
            }

        }
    }

    render(props) {
        const displaySpan = this.state.showSpans ? 'inline-block' : 'none';
        
        const tag = this.state.fragmented.map( item => {
            return (
                <span key={ Math.random() }>
                    {item}
                </span>
            )
        })

        return (
            <div>
                <h6>{ this.state.title }</h6>
                <p onClick={ this.fragmentedArticle }>Show</p>
                <p onClick={ this.printSpans }>Play</p>
                <div onClick={ this.printSpans } style={{ display:displaySpan }} ref={ this.paragraph }>
                    {tag}
                </div>

                <small>Written at: { this.state.date.toString().substr(0,10) }</small><br/>
                <Link to={ '/edit/' + this.props.match.params.id } className="btn btn-primary">edit</Link> 
                <Link to={"/deleted"} className="btn btn-primary" onClick={ () =>{ this.deleteArticle(this.props.match.params.id) } }>delete</Link> 
                <Link to={"/"} className="btn btn-primary">back</Link>
            </div>
        )
    }
}   