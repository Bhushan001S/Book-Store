import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { AiOutlineEdit } from 'react-icons/ai';
import {BiShow,BiUserCircle} from 'react-icons/bi';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import BookModel from './BookModel';

const BookSingleCard = ({ book }) => {
  const [showModel, setShowModel] = useState(false);

  return (
    <div key={book.book_no} className="border-2 border-sky-400  rounded-md p-4 m-4 mx-auto">
      
      <h4 className="my-2 text-gray-500">{book.book_no}</h4>
      <div className="flex justify-start items-center gap-x-2">
        <PiBookOpenTextLight className='text-red-300 text-2xl' />
        <h2 className="my-1">{book.book_no}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <PiBookOpenTextLight className='text-red-300 text-2xl' />
        <h2 className="my-1">{book.title}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        {/* Replaced BiUserCircle with MdOutlineDelete */}
        <BiUserCircle className="text-red-300 text-2xl" />
        <h2 className="my-1">{book.author}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <h2 className=" right-2 px-4 py-1 bg-red-300 rounded-lg">
          {book.publishYear}
      </h2>
      </div>
      <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
        <Link to={`/books/details/${book.book_no}`}>
          <BsInfoCircle className='text-2xl text-green-800 hover:text-black' />
        </Link>
        <Link to={`/books/edit/${book.book_no}`}>
          <AiOutlineEdit className='text-2xl text-green-800 hover:text-black' />
        </Link>
        <Link to={`/books/delete/${book.book_no}`}>
          <MdOutlineDelete className='text-2xl text-green-800 hover:text-black' />
        </Link>
      </div>

      <BiShow className='text-3xl text-blue-800 hover:text-black cursor-pointer'
        onClick={()=> setShowModel(true)}
      />
      {showModel && (
        <BookModel book={book} onClose={() => setShowModel(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;


