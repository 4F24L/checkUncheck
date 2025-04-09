const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const { createTask, allTasks, getSingleTask, updateTask, deleteTask, taskSummary } = require("../controllers/taskController");

// createTask, allTasks, getSingleTask, updateTask, deleteTask, taskSummary

router.post('/create',verifyToken, createTask);
router.get('/all/:groupId', allTasks);
router.get('/:id',verifyToken, getSingleTask);
router.put('/:id',verifyToken, updateTask);
router.delete('/:id',verifyToken, deleteTask);
router.get('/summary/:groupId',verifyToken, taskSummary);

module.exports = router;