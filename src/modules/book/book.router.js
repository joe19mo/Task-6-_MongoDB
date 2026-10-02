import { Router } from 'express';
import {
    addBook,
    addBooksBatch,
    updateBookYear,
    getBookByTitle,
    getBooksByYearRange,
    getBooksByGenre,
    getBooksSkipLimit,
    getBooksYearInteger,
    getBooksExcludeGenres,
    deleteBooksBeforeYear,
    aggregate1,
    aggregate2,
    aggregate3,
    aggregate4
} from './book.controller.js';

const router = Router();

router.post('/', addBook);
router.post('/batch', addBooksBatch);
router.patch('/:title', updateBookYear);

router.get('/title', getBookByTitle);
router.get('/year', getBooksByYearRange);
router.get('/genre', getBooksByGenre);
router.get('/skip-limit', getBooksSkipLimit);
router.get('/year-integer', getBooksYearInteger);
router.get('/exclude-genres', getBooksExcludeGenres);

router.delete('/before-year', deleteBooksBeforeYear);
router.get('/before-year', deleteBooksBeforeYear);

router.get('/aggregate1', aggregate1);
router.get('/aggregate2', aggregate2);
router.get('/aggregate3', aggregate3);
router.get('/aggregate4', aggregate4);

export default router;
