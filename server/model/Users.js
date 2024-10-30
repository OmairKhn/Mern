// model/Users.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  userId: {
    type: String,
    required: false
  }
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
