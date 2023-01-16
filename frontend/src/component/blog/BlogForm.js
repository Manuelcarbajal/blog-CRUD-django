import React,{useState} from 'react'
import axios from 'axios'

import './BlogForm.scss'

function BlogForm({blogs,setBlogs}) {

  const [body,setBody] = useState('');

  const handleChange = (e) => {
    setBody(e.target.value)
  }

  const handelSumit = (e) => {
    e.preventDefault();
    if(!body){
      alert('pon algo')
    }

    axios.post('/post/', {
      body:body
    }).then((response) => {
      setBody('');

      const {data} = response;

      setBlogs([
        ...blogs,
        data
      ]).catch((error)=> {
        alert(error,'algo solio mal en el post')
      })
    })
    
  }

  return (
    <form className='form' onSubmit={handelSumit}>
      <div className='post'>
        <input type='text' placeholder='Texto' onChange={handleChange} value={body}/>
        <button type='submit' >POST</button>
      </div>
    </form>
  )
}

export default BlogForm


