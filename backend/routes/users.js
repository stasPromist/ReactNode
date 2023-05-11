var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth');
const users = require('../controllers/users');

router.get('/:id', auth, users.details);

/* authentication */
router.post('/signin', users.signin);
router.post('/signin2', users.signin2);

router.post('/signup', users.signup);
router.put('/favCards/:id', users.updateDetailsofUser);
router.get('/:id/favCards', users.getFavCards);
// router.delete('/:id/favCards/:id', users.delFavCard);
router.delete('/delUser/:id', users.deleteUserOne);

router.put('/delFavCards/:id', users.delFavCard);
router.get('/', users.list);
router.get('/:id', users.list2);

router.get('/:id', users.details);
router.put('/:id', users.updateDetails);


module.exports = router;
