import { Int32 } from 'mongodb';
import { db } from '../../DB/connection.js';

export const addBook = async (req, res) => {
    try {
        const data = req.body;
        if (data.year) {
            data.year = new Int32(data.year);
        }
        const result = await db.collection('books').insertOne(data);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const addBooksBatch = async (req, res) => {
    try {
        const books = req.body.map(book => {
            if (book.year) {
                book.year = new Int32(book.year);
            }
            return book;
        });
        const result = await db.collection('books').insertMany(books);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateBookYear = async (req, res) => {
    try {
        const { title } = req.params;
        const result = await db.collection('books').updateOne(
            { title: title },
            { $set: { year: 2022 } }
        );
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getBookByTitle = async (req, res) => {
    try {
        const { title } = req.query;
        const book = await db.collection('books').findOne({ title: title });
        res.json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getBooksByYearRange = async (req, res) => {
    try {
        const from = Number(req.query.from);
        const to = Number(req.query.to);
        const books = await db.collection('books').find({
            year: { $gte: from, $lte: to }
        }).toArray();
        res.json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getBooksByGenre = async (req, res) => {
    try {
        const { genre } = req.query;
        const books = await db.collection('books').find({
            genres: genre
        }).toArray();
        res.json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getBooksSkipLimit = async (req, res) => {
    try {
        const books = await db.collection('books').find()
            .sort({ year: -1 })
            .skip(2)
            .limit(3)
            .toArray();
        res.json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getBooksYearInteger = async (req, res) => {
    try {
        const books = await db.collection('books').find({
            year: { $type: ['int', 'number'] }
        }).toArray();
        res.json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getBooksExcludeGenres = async (req, res) => {
    try {
        const books = await db.collection('books').find({
            genres: { $nin: ['Horror', 'Science Fiction'] }
        }).toArray();
        res.json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteBooksBeforeYear = async (req, res) => {
    try {
        const year = Number(req.query.year) || 2000;
        const result = await db.collection('books').deleteMany({
            year: { $lt: year }
        });
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const aggregate1 = async (req, res) => {
    try {
        const books = await db.collection('books').aggregate([
            { $match: { year: { $gt: 2000 } } },
            { $sort: { year: -1 } }
        ]).toArray();
        res.json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const aggregate2 = async (req, res) => {
    try {
        const books = await db.collection('books').aggregate([
            { $match: { year: { $gt: 2000 } } },
            { $project: { _id: 0, title: 1, author: 1, year: 1 } }
        ]).toArray();
        res.json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const aggregate3 = async (req, res) => {
    try {
        const books = await db.collection('books').aggregate([
            { $unwind: '$genres' },
            { $project: { _id: 0, title: 1, genres: 1 } }
        ]).toArray();
        res.json(books);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const aggregate4 = async (req, res) => {
    try {
        const result = await db.collection('logs').aggregate([
            {
                $lookup: {
                    from: 'books',
                    localField: 'book_id',
                    foreignField: '_id',
                    as: 'book_details'
                }
            },
            {
                $project: {
                    _id: 0,
                    action: 1,
                    'book_details.title': 1,
                    'book_details.author': 1,
                    'book_details.year': 1
                }
            }
        ]).toArray();
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
