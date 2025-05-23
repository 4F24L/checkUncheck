const express = require("express");
const env = require("dotenv").config();
const app = express();
const cors = require("cors");
const connectDb = require("./config/db");
const userRouter = require("./routes/userRoutes");
const groupRouter = require("./routes/groupRoutes");
const taskRouter = require("./routes/taskRoutes");

const PORT = process.env.PORT;

app.use(express.json()); 
app.use(
  cors({
    origin: ["http://localhost:5173", "https://checkuncheck.vercel.app", "https://checkuncheck.afzaldev.in", "http://192.168.10.10:5173"], // apna frontend URL
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


startServer();
