const express = require("express");
const env = require("dotenv").config();
const app = express();
const cors = require("cors");
const connectDb = require("./config/db");
const userRouter = require("./routes/userRoutes");
const groupRouter = require("./routes/groupRoutes");
const taskRouter = require("./routes/taskRoutes");
const Email = require("./models/emailSchema");

const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://checkuncheck.vercel.app", "https://checkuncheck.afzaldev.in"], // apna frontend URL
    credentials: true,
  })
);

async function startServer() {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (err) {}
}

app.get("/", (req, res) => {
  res.send("Hello checkUncheck !!");
});

app.use("/api/user", userRouter);

app.use("/api/group", groupRouter);

app.use("/api/task", taskRouter);

app.post("/collect-email", async (req, res) => {
  const { email } = req.body;

  try {
    const existingEmail = await Email.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    const newEmail = new Email({ email });
    await newEmail.save();

    res.status(200).json({ message: "Email collected successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error collecting email" });
  }
});


startServer();
