import { ObjectId } from 'mongodb';
import { db } from '../../DB/connection.js';

export const createLog = async (req, res) => {
    try {
        const { book_id, action } = req.body;
        const result = await db.collection('logs').insertOne({
            book_id: ObjectId.isValid(book_id) ? new ObjectId(book_id) : book_id,
            action
        });
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
