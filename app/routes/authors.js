const controller = require('../controllers/authors');

const router = require('express').Router();
const cacheNoStore = require('../middlewares/cacheNoStore')

router.get('/',cacheNoStore,controller.getAuthors);
router.get('/:id',cacheNoStore,controller.getAllBooks);
router.put('/:id',cacheNoStore,controller.updateAuthor);
router.post('/',cacheNoStore,controller.createAuthor);


module.exports = router; 