
import BookSingleCard from './BookSingleCard'

const BooksCard = ({books}) => {
  const storedBooks = [];

  for (let index = 0; index < books.length; index++) {
    storedBooks[index]= books[index];
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto ">
        {storedBooks.map((book)=>
          <BookSingleCard key={book.book_no} book={book} />)
        }
    </div>
    
  ) 

}

export default BooksCard
