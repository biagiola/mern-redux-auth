import React, { useState, useEffect  } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import axios from 'axios'

function ArticleDetails(props) {
  const authToken = useSelector(store => store.main.authToken)
  const [title, setTitle] = useState('')
  const [ description, setDescription ] = useState('')
  const [ date, setDate ] = useState()
  const [ lenguage, setLenguage ] = useState()

  useEffect( () => {
    axios.get('http://localhost:5000/articles/' + props.match.params.id)
    .then(response => {
      console.log('useEffect response', response)
      setTitle(response.data.title)
      setDescription(response.data.description)
      setDate(new Date(response.data.date))
      setLenguage(response.data.lenguage) 
    })
    .catch((error) => console.log(error))

    return () => {}

  }, [authToken] )

  const deleteArticle = id => {
    axios.delete( 'http://localhost:5000/articles/' + id )
      .catch( res => console.log( res.data ) )
    
    this.setState({
      articles: this.state.articles.filter( el => el._id !== id )  
    })
  }
  
  const main = authToken !== null ?
  <div>
    <h3 className="text-center">{ title }</h3>

    <div className="container" style={{ 'padding': '0px 0px 0px', 'background' : '#d6d8db'}}>
      { description }
      <div>{ lenguage }</div>
      <small style={{ 'padding': '50px 0px 0px' }}>Written at: { date.toString().substr(0,10) }</small>
    </div>

    <div style={{ 'marginTop': '2rem'}}>
      <Link to={ '/edit/' + props.match.params.id } className="btn">edit</Link> 
      <Link to={"/deleted"} className="btn" onClick={ () =>{ deleteArticle(props.match.params.id) } }>delete</Link> 
      <Link to={"/dashboard"} className="btn">back</Link>
    </div>
      
  </div>
  :
  <div>
    <Redirect to="/" />
  </div>

  const moveContentValue = useSelector(store => store.main.moveContentValue)
  const margin = moveContentValue ?
  "60px" :  "250px"

  return (
    <div className="wrapper content" style={{ marginLeft: margin }}>
      { main }
    </div>
  )
}
  
export default withRouter(ArticleDetails)