var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);

UserSchema.path("username").validate(function (value, respond) {
  return mongoose
    .model("User")
    .count({ username: value })
    .exec()
    .then(function (count) {
      return !count;
    })
    .catch(function (err) {
      throw err;
    });
}, "Email already exists.");

let User = mongoose.model("User", UserSchema);
module.exports = User;
