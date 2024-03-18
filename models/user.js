const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");

//imp --- employee used in admin-panel while user only used on site

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // permissions: { type: Array, default: ["guest"] },
  // lastLoggedIn: { type: Date },
  permissions: { type: Array, default: ["user"] },
  refreshToken: { type: String },
});

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      name: this.name,
    },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: "1d" }
  );
};

userSchema.methods.generateAcessToken = function () {
  return jwt.sign(
    {
      userInfo: {
        name: this.name,
        _id: this._id,
        permissions: this.permissions,
      },
    },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: "1d" }
    // { expiresIn: "1d" }
  );
};

const User = mongoose.model("User", userSchema);

module.exports.User = User;
