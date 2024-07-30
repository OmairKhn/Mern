const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./model/Users");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
.connect("mongodb://127.0.0.1:27017/crud", {
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.get("/", (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
})
app.get("/getAllUsers", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const searchQuery = req.query.search || '';

    const query = searchQuery ? { name: { $regex: searchQuery, $options: 'i' } } : {};

    const users = await UserModel.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    const count = await UserModel.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(count / pageSize),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/getUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findById(id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json(err));
});

app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, age } = req.body;

  // Check if all required fields are present
  if (!name || !email || !age) {
    return res.status(400).json({ error: "All fields (name, email, age) are required" });
  }

  UserModel.findByIdAndUpdate(id, { name, email, age }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    })
    .catch((err) => res.status(400).json(err));
});

app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json(err));
});

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete(id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    })
    .catch((err) => res.status(400).json(err));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
