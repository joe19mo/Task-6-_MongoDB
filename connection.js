import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://127.0.0.1:27017');

export let db;

export const connectDB = async () => {
    try {
        await client.connect();
        db = client.db('assignment7');
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Database error:', error);
    }
};
