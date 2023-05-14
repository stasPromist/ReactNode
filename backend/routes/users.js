var express = require('express');
var router = express.Router();
const auth = require('../middleware/auth');
const users = require('../controllers/users');

router.get('/:id', auth, users.details);

/* authentication */
router.post('/signin', users.signin);
router.put('/newPassword', users.updatePassword);

router.post('/signup', users.signup);
router.put('/favCards/:id', users.updateDetailsofUser);
router.get('/:id/favCards', users.getFavCards);
router.delete('/delUser/:id', users.deleteUserOne);

router.put('/delFavCards/:id', users.delFavCard);
router.get('/', users.list);
router.get('/:id', users.ShowUser);

router.get('/:id', users.details);
router.put('/:id', users.updateDetails);


module.exports = router;
