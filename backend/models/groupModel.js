const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  groupName: { type: String, required: true, maxlength: 20 },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  visibility: { type: String, enum: ["public", "private"], default: "public" },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  inviteCode: { type: String },
  entryPassword: { type: String },
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
