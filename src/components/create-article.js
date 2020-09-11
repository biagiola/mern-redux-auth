import React, { useState, useEffect, useRef } from 'react'
import { withRouter } from 'react-router'
import { useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

function CreateArticle(props) {
  const lenguageRef = useRef('')
  const authToken = useSelector( store => store.main.authToken )
  const [lenguages, setLenguages] = useState([])
  const [lenguage, setLenguage] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date())
  
  useEffect( () => {
      const abortController = new AbortController()
      const signal = abortController.signal
    
      axios.get('http://localhost:5000/lenguages/', {signal: signal})
      .then( response => {
          if ( response.data.length > 0 ) {
            setLenguages(response.data.map( lenguages => lenguages.lenguage ))
            setLenguage(response.data[0])
          }
        }
      ).catch( error => console.log(error))
      
      return function cleanup(){
        abortController.abort()
      }
    }, 
    [authToken]
  )
  
  const onSubmit = e => {
    e.preventDefault()

    const article = {
      lenguage: lenguage,
      title: title,
      description: description,
      date: date
    }

    console.log(article)

    axios.post('http://localhost:5000/articles/add', article)
    .then( res => console.log( 'respuesta ',res.data ) )
    .catch( err => console.log( err ))

    props.history.push('/dashboard')
  }

  const moveContentValue = useSelector(store => store.main.moveContentValue)
  const margin = moveContentValue ?
  "60px" :  "250px"

  return (
    <div className="wrapper content" style={{ marginLeft: margin }}>
      <h3>Create New Article</h3>
      <form onSubmit={ onSubmit } className="">
        <div className="form-group">
          <input
            placeholder='Title'
            type='text'
            required
            value={ title }
            onChange={ e => setTitle(e.target.value) }
            />
        </div>

        <div className="form-group">
          <textarea
            placeholder='Write your article...'
            type='text'
            required
            rows="5"
            value={ description }
            onChange={ e => setDescription(e.target.value) }
          />
        </div>

        <div className='form-group'>
          <select
            ref={lenguageRef}
            required
            value={ lenguage }
            onChange={ e => setLenguage(e.target.value) }>
            {
              lenguages.map( lenguage => <option key={ lenguage } value={ lenguage }>{ lenguage }</option> )
            }
          </select>
        </div>

        <div className="form-group">
          <div>
            <DatePicker
              selected={ date }
              onChange={ e => setDate(e) }
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

export default withRouter(CreateArticle)