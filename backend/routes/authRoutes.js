const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateRegister, validateLogin } = require('../middleware/validators');

router.post('/register', register);
router.post('/login', validateLogin, login);
router.get('/me', protect, getMe);

module.exports = router;