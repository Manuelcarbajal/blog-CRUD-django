import  {useState,useEffect} from 'react'
import axios  from 'axios';

import NavBar  from './component/navbar/NavBar';
import BlogForm from './component/blog/BlogForm';
import Blogs from './component/blog/Blogs';

function App() {

  const [blogs,setBlogs] = useState([]);

  useEffect(() =>{
    axios.get('/get/')
    .then((response) => {
      setBlogs(response.data)
    }).catch(() => {
      alert('Algo salio mal')
    })
  },[]);

  return (
    <div className="App">
      <div className='navbar'>
        <NavBar/>
      </div>
      <div className='component'>
        <BlogForm blogs={blogs} setBlogs={setBlogs}/>
        <Blogs blogs={blogs} setBlogs={setBlogs}/>
      </div>
    </div>
  );
}

export default App;
