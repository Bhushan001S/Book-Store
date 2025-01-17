import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateBooks from './pages/CreateBooks'
import ShowBook from './pages/ShowBook'
import EditBook from './pages/EditBook'
import DeleteBook from './pages/DeleteBook'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/books/create' element={<CreateBooks/>} />
      <Route path='/books/details/:book_no' element={<ShowBook/>} />
      <Route path='/books/edit/:book_no' element={<EditBook/>} />
      <Route path='/books/delete/:book_no' element={<DeleteBook/>} />
    </Routes>
  )
}

export default App
