const express = require('express');
const formsController = require('../controllers/forms');
const router = express.Router();

router.post('/profile/upload/:id', formsController.uploadProfileImg);
router.post('/profile/update/:id', formsController.updateProfile);
router.post('/profile/delete/:id', formsController.deleteProfile);
router.post('/register', formsController.register);
router.post('/login', formsController.postLogin);

module.exports = router;