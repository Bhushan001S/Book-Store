import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BooksCard from '../components/home/BooksCard'
import BooksTable from '../components/home/BooksTable'
import { Link } from 'react-router-dom'
import { MdOutlineAddBox } from 'react-icons/md'
import Spinner from '../components/Spinner'

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/books')
      .then(res => {
        console.log(res.data);
        setBooks(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [])
  return (
    <div className='p-4'>
      <div className="flex justify-end items-center gap-x-4">
        <button className={`text-xl ${showType === 'table' ? 'text-sky-800 bg-sky-300 px-4 py-1  rounded-lg' : 'text-gray-500'}`} onClick={() => setShowType('table')}>
         Table
        </button>
        <button className={`text-xl ${showType === 'card' ? 'text-sky-800 bg-sky-300 px-4 py-1  rounded-lg' : 'text-gray-500 '}`} onClick={() => setShowType('card')}>
        Card
        </button>
      </div>


      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl ">
          Books List
        </h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>


      {loading ? (
        <Spinner />
      ) : (showType === 'table' ? (
        <BooksTable books={books} />
      ) : (<BooksCard books={books} />))
      }
    </div>
  )
}

export default Home
