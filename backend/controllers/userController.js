const User = require("../models/userModel");
const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//google auth setup
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//register schema - zod
const registerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

//POST /user/register
const registerUser = async (req, res) => {
  try {
    //collect data
    const { firstName, lastName, email, password } = req.body;

    //zod validation
    const parsedResult = registerSchema.safeParse(req.body);

    if (!parsedResult.success) {
      return res
        .status(500)
        .json({ error: parsedResult.error.errors[0].message });
    }

    //check if exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    //hash password
    const hashedPass = await bcrypt.hash(password, 5);

    //create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPass,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//login schema - zod
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

//POST /user/login
const loginUser = async (req, res) => {
  try {
    //data collect
    const { email, password } = req.body;

    //zod validation
    const parsedResult = loginSchema.safeParse(req.body);
    if (!parsedResult.success) {
      return res.status(400).json({ message: "Invalid Inputs" });
    }

    //find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    //check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Invalid password" });
    }

    //gen jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //user data without password
    const userData = { ...user._doc };
    delete userData.password;

    res.status(200).json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

//Google auth - login

const googleLogin = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: "No token provided" });

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const { email, name, picture } = payload;

    // Optional: Reject fake/unauthorized domains
    if (!email.endsWith("@gmail.com")) {
      return res
        .status(403)
        .json({ message: "Only Gmail accounts are allowed" });
    }

    // Check if user exists
    const normalizedEmail = email.toLowerCase().trim();

    let user = await User.findOne({ normalizedEmail });

    if (!user) {
      // If not, create user (you can customize fields as needed)
      const [firstName, ...rest] = name.split(" ");
      const lastName = rest.join(" ") || "";
      user = await User.create({
        firstName,
        lastName,
        email,
        password: "", // No password required for Google Auth
        picture,
      });
    }

    // Create token
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const userData = { ...user._doc };
    delete userData.password;

    return res.status(200).json({
      message: "Google login successful",
      token: jwtToken,
      user: { ...userData },
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error });
  }
};

//GET /user/me
const myProfile = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//GET /user/id/:id
const publicUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(403).json({ message: "Server error/publicUser" });
  }
};

//update schema - zod
const updateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
});

//PUT /user/update
const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    const parsedResult = updateSchema.safeParse(req.body);
    if (!parsedResult.success) {
      return res.status(500).json({ message: "Invalid inputs" });
    }

    const updateData = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(email && { email }),
    };

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    res.status(503).json({ message: "Server error" });
  }
};

//GET /user/mygroups
const myGroups = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) return res.status(404).json({ message: "User id required" });

    const userExist = await User.findById(userId).populate("groupsJoined");
    if (!userExist) return res.status(404).json({ message: "User not found" });

    const groups = userExist.groupsJoined;
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  myProfile,
  publicUser,
  updateUser,
  myGroups,
};
