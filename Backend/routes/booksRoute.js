import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route for saving a new book
router.post('/', async (request, response) => {
    try {
        const { book_no, title, author, publishYear } = request.body;

        if (!book_no || !title || !author || !publishYear) {
            return response.status(400).send({
                message: 'Send all required fields: book_no, title, author, publishYear'
            });
        }

        const newBook = {
            book_no:request.body.book_no,
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear
        };

        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for getting all books
router.get("/", async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json(books);
    } catch (error) {
        console.log(error.message);
        response.status(500).json({ message: error.message });
    }
});

// Route for getting a book by book_no
router.get('/:book_no', async (request, response) => {
    try {
        const { book_no } = request.params;
        const book = await Book.findOne({book_no});

        if (!book) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).json({ message: error.message });
    }
});

// Route for updating a book by book_no
router.put('/:book_no', async (request, response) => {
    try {
        const { book_no } = request.params;
        const { title, author, publishYear } = request.body;

        if (!title || !author || !publishYear) {
            return response.status(400).json({
                message: 'Send all required fields: title, author, publishYear'
            });
        }

        const result = await Book.findOneAndUpdate(
           { book_no}, request.body ,{new:true}
        );

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).json({ message: 'Book updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).json({ message: error.message });
    }
});

// Route for deleting a book by book_no
router.delete('/:book_no', async (request, response) => {
    try {
        const { book_no } = request.params;
        const result = await Book.findOneAndDelete({book_no});

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).json({ message: error.message });
    }
});

module.exports = router;