const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const { createGroup, getAllGroups, groupDetails, deleteGroup, updateGroup } = require('../controllers/groupController');

// createGroup, getAllGroups, groupDetails, deleteGroup, updateGroup

router.post('/create' ,verifyToken, createGroup);
router.get('/all' ,verifyToken, getAllGroups);
router.get('/:id' ,verifyToken, groupDetails);
router.delete('/:id' ,verifyToken, deleteGroup);
router.put('/:id' ,verifyToken, updateGroup);

module.exports = router;
