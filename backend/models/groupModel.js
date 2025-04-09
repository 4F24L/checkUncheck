const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: [20, "Title should not be more than 20 characters"] },
  description: {type: String, maxlength: [100, "Max 100 character supported."]} ,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  visibility: { type: String, enum: ["public", "private"], default: "public" },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  inviteCode: { type: String },
  entryPassword: { type: String, maxlength:[6, "Password should be 6 digit"] },
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
