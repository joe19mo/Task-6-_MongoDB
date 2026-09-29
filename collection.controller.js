import { db } from '../../DB/connection.js';

export const createBooksCollection = async (req, res) => {
    try {
        await db.createCollection('books', {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: ['title'],
                    properties: {
                        title: {
                            bsonType: 'string',
                            minLength: 1
                        }
                    }
                }
            }
        });
        res.json({ ok: 1 });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const createAuthorsImplicit = async (req, res) => {
    try {
        const result = await db.collection('authors').insertOne(req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const createLogsCapped = async (req, res) => {
    try {
        await db.createCollection('logs', {
            capped: true,
            size: 1048576
        });
        res.json({ ok: 1 });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const createBooksIndex = async (req, res) => {
    try {
        const result = await db.collection('books').createIndex({ title: 1 });
        res.send(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
