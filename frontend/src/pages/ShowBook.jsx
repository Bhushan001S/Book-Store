import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { book_no } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8000/books/${book_no}`)
      .then((res) => {
          setBook(res.data);
          setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching book:', error);
        setLoading(false);
      });
  }, [book_no]);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-center'>Show Book</h1>
      {loading ? (<Spinner />) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className="text-xl mr-4 text-grey-500">book_no</span>
            <span>{book.book_no}</span>
          </div>
          <div className='my-4'>
            <span className="text-xl mr-4 text-grey-500">Title</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className="text-xl mr-4 text-grey-500">Author</span>
            <span>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className="text-xl mr-4 text-grey-500">Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className='my-4'>
            <span className="text-xl mr-4 text-grey-500">Create Time</span>
            <span>{new Date(book.createdAt).toLocaleString()}</span>
          </div>
          <div className='my-4'>
            <span className="text-xl mr-4 text-grey-500">Last Update Time</span>
            <span>{new Date(book.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
