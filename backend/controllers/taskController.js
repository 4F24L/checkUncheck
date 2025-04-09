const Task = require("../models/taskModel");
const Group = require("../models/groupModel");
const User = require("../models/userModel");
const z = require("zod");
const { findById } = require("../models/userModel");

// taskSchema
const createTaskSchema = z.object({
  taskName: z.string(),
  description: z.string(),
  taskStatus: z.enum(["todo", "in-progress", "done"]),
  dueDate: z.string(),
  createdBy: z.string(),
  assignedTo: z.string(),
  group: z.string(),
});

//POST /task/create
const createTask = async (req, res) => {
  try {
    const { taskName, description, taskStatus, dueDate, assignedTo } = req.body;
    const group = req.params.id;
    const createdBy = req.user.id;

    const parsedResult = createTaskSchema.safeParse({
      ...req.body,
      group,
      createdBy,
    });
    if (!parsedResult.success)
      return res.status(400).json({ message: "Invalid inputs" });

    const groupExist = await Group.findById(group);
    if (!groupExist)
      return res.status(404).json({ message: "group info error" });

    const assignedUserExist = await User.findById(assignedTo);
    if (!assignedUserExist)
      return res.status(404).json({ message: "Assigned user not found" });

    const task = await Task.create({
      taskName,
      description,
      taskStatus,
      dueDate: new Date(dueDate),
      createdBy,
      assignedTo,
      group,
    });

    await Group.findByIdAndUpdate(group, {
      $push: { tasks: task._id },
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//GET /task/all/:groupId
const allTasks = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    if (!groupId) return res.status(400).json({ message: "Group id required" });

    const groupExist = await Group.findById(groupId);
    if (!groupExist)
      return res.status(404).json({ message: "group not found" });

    const tasks = await Task.find({ group: groupId })
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//GET /task/:id
const getSingleTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!taskId) return res.status(400).json({ message: "Task id not found" });

    const getTask = await Task.findById(taskId)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    if (!getTask) return res.status(404).json({ message: "Task not found" });

    res.status(200).json(getTask);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// update schema - zod
const updateSchema = z.object({
  taskName: z.string().optional(),
  description: z.string().optional(),
  taskStatus: z.string().optional(),
  dueDate: z.string().optional(),
  assignedTo: z.string().optional(),
});

//PUT /task/:id
const updateTask = async (req, res) => {
  try {
    const { taskName, description, taskStatus, dueDate, assignedTo } = req.body;
    const taskId = req.params.id;
    if (!taskId)
      return res.status(400).json({ message: "Task id is required" });

    const parsedResult = updateSchema.safeParse(req.body);
    if (!parsedResult.success)
      return res.status(403).json({ message: "Invalid inputs" });

    const taskExist = await Task.findById(taskId);
    if (!taskExist) return res.status(404).json({ message: "Task not found" });

    const updateData = {};
    if (taskName) updateData.taskName = taskName;
    if (description) updateData.description = description;
    if (taskStatus) updateData.taskStatus = taskStatus;
    if (dueDate) updateData.dueDate = new Date(dueDate);
    if (assignedTo) updateData.assignedTo = assignedTo;

    const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, {
      new: true,
    }).populate("assignedTo");

    res.status(200).json({ message: "task updated successfully", updatedTask });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//DELETE /task/:id
const deleteTask = async (req, res) => {
  try {
    const uid = req.user._id;
    const taskId = req.params.id;
    if (!taskId)
      return res.status(400).json({ message: "Task ID is required" });

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.createdBy.toString() !== uid.toString())
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this task" });

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//GET /task/summary/:groupId
const taskSummary = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    if (!groupId) return res.status(400).json({ message: "Group Id required" });

    const totalTasks = await Task.find({ group: groupId }).populate("group");

    const allTasks = totalTasks.length;
    const todoTasks = totalTasks.filter((task) => task.taskStatus === "todo").length;
    const inProgressTasks = totalTasks.filter((task) => task.taskStatus === "in-progress").length;
    const doneTasks = totalTasks.filter((task) => task.taskStatus === "done").length;

    res.status(200).json({
      allTasks,
      todoTasks,
      inProgressTasks,
      doneTasks,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { createTask, allTasks, getSingleTask, updateTask, deleteTask, taskSummary }