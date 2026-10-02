import { Router } from 'express';
import {
    createBooksCollection,
    createAuthorsImplicit,
    createLogsCapped,
    createBooksIndex
} from './collection.controller.js';

const router = Router();

router.post('/books', createBooksCollection);
router.post('/authors', createAuthorsImplicit);
router.post('/logs/capped', createLogsCapped);
router.post('/books/index', createBooksIndex);

export default router;
