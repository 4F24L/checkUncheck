const Group = require("../models/groupModel");
const z = require("zod");

// create schema - zod
const groupSchema = z.object({
  title: z.string().max(20),
  description: z.string().max(100),
  createdBy: z.string(),
  visibility: z.string(),
});

//POST /group/create
const createGroup = async (req, res) => {
  try {
    //collect data
    const { title, description, visibility } = req.body;
    const createdBy = req.user._id;

    //zod validation
    const parsedResult = groupSchema.safeParse({ ...req.body, createdBy });
    if (!parsedResult.success) {
      return res.status(400).json({ message: "Invalid inputs" });
    }

    //check exists
    const groupExist = await Group.findOne({ title });
    if (groupExist) {
      return res
        .status(409)
        .json({ message: "Group already exists, please explore" });
    }

    //create new group
    const group = await Group.create({
      title,
      description,
      createdBy,
      visibility,
    });
    res.status(201).json({ message: "group created succesfully", group });
  } catch (err) {
    res.status(503).json({ message: "Server error", err });
  }
};

//GET /group/all
const getAllGroups = async (req, res) => {
  try {
    const allGroups = await Group.find({ visibility: "public" });

    //   const publicGroups = allGroups.filter((group) => {
    //     return group.visibility === "public";
    //   });

    res.status(201).json({ allGroups });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//GET /group/:id
const groupDetails = async (req, res) => {
  try {
    const groupId = req.params.id;
    if (!groupId) return res.status(500).json({ message: "Group Id invalid" });

    const getGroup = await Group.findById(groupId);
    if (!getGroup) return res.status(404).json({ message: "Group not found" });

    res.status(200).json(getGroup);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//DELETE /group/:id
const deleteGroup = async (req, res) => {
  try {
    const groupId = req.params.id;

    const getGroup = await Group.findById(groupId);
    if (!getGroup) return res.status(500).json({ message: "Group not found" });

    await Group.findByIdAndDelete(groupId);

    res.status(200).json({ message: "group deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//update schema - zod
const updateSchema = z.object({
  title: z.string().max(20),
  description: z.string().max(100),
  visibility: z.string(),
  inviteCode: z.string(),
  entryPassword: z.string().max(6),
});


//PUT /group/:id
const updateGroup = async (req, res) => {
  try {
    const groupId = req.params.id;
    const { title, description, visibility, inviteCode, entryPassword } =
      req.body;

    const parsedResult = updateSchema.safeParse(req.body);
    if (!parsedResult.success)
      return res.status(400).json({ message: "Invalid inputs" });

    const groupExist = await Group.findById(groupId);
    if (!groupExist)
      return res.status(404).json({ message: "Group info error" });

    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { title, description, visibility, inviteCode, entryPassword },
      { new: true, runValidators: true }
    );

    res
      .status(200)
      .json({ message: "group updated successfully", updatedGroup });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createGroup, getAllGroups, groupDetails, deleteGroup, updateGroup }
