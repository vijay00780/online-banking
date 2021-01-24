const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/login', userController.login);
router.get('/register', userController.register);
router.get('/profile/:id', userController.profile);
router.get('/', userController.home);
router.use(userController.pageNotFound);

module.exports = router;
