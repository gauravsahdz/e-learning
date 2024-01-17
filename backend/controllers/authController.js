const { generateAcessToken } = require("../middleware/authToken");
const Users = require("../models/userModel");

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Users.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        status: "USER_NOT_FOUND",
        message: "No user found with this email",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        status: "INCORRECT_PASSWORD",
        message: "Incorrect password",
      });
    }

    const token = await generateAcessToken(user);
    res.status(200).json({
      status: "success",
      token: token,
    });
  } catch (error) {
    return res.status(403).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
