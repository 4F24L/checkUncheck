const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware') 
const {registerUser, loginUser, myProfile, publicUser, updateUser} = require('../controllers/userController');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', verifyToken, myProfile);
router.get('/:id', publicUser);
router.put('/update',verifyToken, updateUser);


module.exports = router;