const { User } = require("../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.status(400).json("User already registered");

  const hashedPassword = bcrypt.hashSync(password, 10);
  user = new User({ ...req.body, password: hashedPassword });
  await user.save();
  //.select("-__v -password");
  return res.json({ name: user.name });
};

//req.user._id added by auth middleware
const userProfile = async (req, res) => {
  let user = await User.findById(req.user._id).select("name email -_id");
  return res.json({ user });
};

module.exports = { register, userProfile };
