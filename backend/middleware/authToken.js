const jwt = require("jsonwebtoken");

function generateAcessToken(user) {
  const payload = {
    email: user.email,
    name: user.name,
    enrolledCourses: user.enrolledCourses,
  };
  const options = { expiresIn: "1d" };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  console.log(token);

  if (!token) {
    return res.status(403).json({
      status: "error",
      message: "Access denied. No token found.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      status: "error",
      message: "Access denied. Invalid token.",
    });
  }
}

exports.generateAcessToken = generateAcessToken;
exports.verifyToken = verifyToken;
