import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const CreateBooks = () => {
  const [title,setTile] = useState('');
  const [author,setAuthor] = useState('');
  const [publishYear,setPublishYear] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const handleSaveBook = () =>{
    setLoading(true);
    axios.post('http://localhost:27017/books',{
      title,
      author,
      publishYear
    }).then(()=>{
      setLoading(false);
      enqueueSnackbar('Book Created Successfully',{variant:'success'});
      navigate('/');
    })
    .catch((error) =>{
      console.log(error);
      setLoading(false);
      enqueueSnackbar('Book Creation Failed',{variant:'error'});
      // alert('An error happend.Please Check console');
    })
  }
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-center'>Create Book</h1>
      {loading ? (<Spinner/>) : ('')}
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <label className="text-xl mr-4 text-grey-500">Title</label>
            <input type='text' value={title} className='border-2 border-gray-400 rounded-md p-2' onChange={(e) => setTile(e.target.value)}/>
          </div>
          <div className='my-4'>
              <label className="text-xl mr-4 text-grey-500">Author</label>
              <input type='text' value={author} className='border-2 border-gray-400 rounded-md p-2' onChange={(e) => setAuthor(e.target.value)}/>
          </div>
          <div className='my-4'>
              <label className="text-xl mr-4 text-grey-500">Publish Year</label>
              <input type='text' value={publishYear} className='border-2 border-gray-400 rounded-md p-2' onChange={(e) => setPublishYear(e.target.value)}/>
          </div>
          <div className='my-4'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleSaveBook}>Save</button>
          </div>
        </div>
    </div>
    
  )
}

export default CreateBooks
