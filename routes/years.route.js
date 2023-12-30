const { Router } = require('express');
const { all, add, remove } = require('../controllers/years');

const router = Router();

router.get('/', all)
router.post('/add/:year', add);
router.delete('/remove/:year', remove);

module.exports = router;