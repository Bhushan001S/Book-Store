import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [book_no, setBookNo] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { book_no: bookno } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8000/books/${bookno}`)
      .then((response) => {
        const book = response.data;
        setBookNo(book.book_no);
        setAuthor(book.author);
        setTitle(book.title);
        setPublishYear(book.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console.');
        console.error(error);
      });
  }, [bookno, enqueueSnackbar]);

  const handleEditBook = () => {
    setLoading(true);
    const data = {
      book_no,
      title,
      author,
      publishYear
    };
    axios.put(`http://localhost:8000/books/${bookno}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Updated Successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        console.error('An error occurred:', error);
        alert('An error happened. Please check console.');
        enqueueSnackbar('Book Update Failed', { variant: 'error' });
      });
  };

  return (
    <div className='p-4 '>
      <BackButton />
      <h1 className='text-xl text-center m-4'>Edit Book</h1>
      {loading ? (<Spinner />) : ('')}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4 mx-auto bg-sky-400'>
        <div className='my-4'>
          <label className="text-xl mr-4 text-grey-500">Book No</label>
          <input type='text' value={book_no} className='border-2 border-gray-400 rounded-md p-2 mx-auto' onChange={(e) => setBookNo(e.target.value)} />
        </div>
        <div className='my-4'>
          <label className="text-xl mr-4 text-grey-500">Title</label>
          <input type='text' value={title} className='border-2 border-gray-400 rounded-md p-2 mx-auto' onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className='my-4'>
          <label className="text-xl mr-4 text-grey-500 mx-auto">Author</label>
          <input type='text' value={author} className='border-2 border-gray-400 rounded-md p-2' onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div className='my-4'>
          <label className="text-xl mr-4 text-grey-500 mx-auto">Publish Year</label>
          <input type='number' value={publishYear} className='border-2 border-gray-400 rounded-md p-2 ' onChange={(e) => setPublishYear(e.target.value)} />
        </div>
        <div className='my-4 mx-auto'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleEditBook}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
