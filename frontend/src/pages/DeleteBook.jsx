import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const DeleteBooks = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { book_no } = useParams(); // Assume book_no is the identifier
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios.delete(`http://localhost:8000/books/${book_no}`)
      .then(() => {
        setLoading(false);
        navigate('/');
        enqueueSnackbar('Book Deleted Successfully', { variant: 'success' });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        enqueueSnackbar('Book Deletion Failed', { variant: 'error' });
      });
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-center'>Delete Book</h1>
      {loading && <Spinner />}  {/* Improved conditional rendering */}
      {!loading && (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
          <h3 className="text-2xl">Are You Sure You Want to Delete This Book?</h3>
          <button 
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
            onClick={handleDeleteBook}
          >
            Yes, Delete It
          </button>
        </div>
      )}
    </div>
    
  )

}

export default DeleteBooks
