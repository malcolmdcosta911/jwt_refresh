const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  // const origin = req.headers.origin;
  // console.log("origin", origin);

  let user = await User.findOne({ email });
  if (!user) return res.status(404).json("Invalid username or password");

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword)
    return res.status(404).json("Invalid username or password");

  const refreshToken = user.generateRefreshToken();
  const accessToken = user.generateAcessToken();

  //need to check condition where user didnt logout and cookie still present

  user.refreshToken = refreshToken;
  await user.save();

  res
    .cookie("x-refresh-token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .header("x-access-token", accessToken)
    .json({ name: user.name, accessToken });
};

// person can use anothers refresh token if not logged out and provide their  own acess token
//but since request provide data base on access token should not be problem?

//api gives new access token based on refresh token

const refresh = async (req, res) => {
  const refreshToken = req?.cookies?.["x-refresh-token"];
  if (!refreshToken) return res.status(401).json("no refresh token found");

  const user = await User.findOne({ refreshToken });
  if (!user) return res.status(404).json("No user found");

  //login again for new refresh token in mongo?

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET_KEY,
    async function (err, decoded) {
      if (err || user.name !== decoded.name)
        return res.status(404).send("Invalid refresh token.");

      const accessToken = user.generateAcessToken();

      user.refreshToken = refreshToken;
      await user.save();

      return res.header("x-access-token", accessToken).json({ accessToken });
    }
  );
};

const logout = async (req, res) => {
  const refreshToken = req?.cookies?.["x-refresh-token"];
  if (!refreshToken) return res.status(401).json("Invalid token");

  const user = await User.findOne({ refreshToken });
  console.log("user", user);
  if (!user) return res.status(404).json("No user found");

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET_KEY,
    async function (err, decoded) {
      console.log(err);
      if (err || user.name !== decoded.name)
        return res.status(400).json("Invalid refresh token");

      user.refreshToken = "";
      await user.save();

      return res
        .clearCookie("x-refresh-token", {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        })
        .json("logout sucess");
    }
  );
};

module.exports = { login, refresh, logout };
