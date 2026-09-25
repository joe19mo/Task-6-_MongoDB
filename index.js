import express from 'express';
import { connectDB } from './src/DB/connection.js';
import collectionRouter from './src/modules/collection/collection.router.js';
import bookRouter from './src/modules/book/book.router.js';
import logRouter from './src/modules/log/log.router.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/collection', collectionRouter);
app.use('/books', bookRouter);
app.use('/logs', logRouter);

await connectDB();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
