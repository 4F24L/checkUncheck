const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  description: { type: String },
  taskStatus: {
    type: String,
    enum: ["todo", "done", "in-progress"],
    default: "todo",
  },
  dueDate: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  group : {type: mongoose.Schema.Types.ObjectId, ref:"Group"}
},
{
    timestamps: true
});

const Task = mongoose.model("Task", taskSchema)
module.exports = Task;