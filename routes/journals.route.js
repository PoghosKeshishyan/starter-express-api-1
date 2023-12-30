const { Router } = require('express');
const { all, by_year, add, edit, remove } = require('../controllers/journals');

const router = Router();

router.get('/', all)
router.get('/:year', by_year);
router.post('/add', add);
router.put('/edit/:id', edit)
router.delete('/remove/:id', remove);

module.exports = router;