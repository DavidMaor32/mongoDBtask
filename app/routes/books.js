const controller = require('../controllers/books');

const router = require('express').Router();
const cacheNoStore = require('../middlewares/cacheNoStore')

router.get('/',cacheNoStore,controller.getAllBooks);
router.post('/',cacheNoStore,controller.createBook);
router.delete('/:id',cacheNoStore,controller.deleteBook);


module.exports = router; 