const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware') 
const {registerUser, loginUser, googleLogin, myProfile, publicUser, updateUser, myGroups} = require('../controllers/userController');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google-login', googleLogin);
router.get('/me', verifyToken, myProfile);
router.get('/mygroups', verifyToken, myGroups);
router.get('/:id', publicUser);
router.put('/update',verifyToken, updateUser);


module.exports = router;