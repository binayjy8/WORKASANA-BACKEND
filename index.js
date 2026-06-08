const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { initializeDatabase } = require("./config/db");
initializeDatabase();


// ROUTES
const projectRoutes = require("./routes/projectRoutes");
const teamRoutes = require("./routes/teamRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");


// MIDDLEWARE
app.use(cors());
app.use(express.json());


// API ROUTES
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/teams", teamRoutes);


// HOME ROUTE
app.get("/", (req, res) => {
  res.send("Hello World!");
});


// LOCAL DEVELOPMENT
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}



module.exports = app;