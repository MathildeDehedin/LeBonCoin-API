const userRoute = require("../routes/user");
const User = require("../model/User");

const isAuthenticated = async (req, res, next) => {
  // Bearer
  if (req.headers.authorization) {
    const token = req.headers.authorization.replace("Bearer ", "");
    //console.log(token);
    const userFounded = await User.findOne({ token: token });
    //console.log(userFounded)
    if (!userFounded) {
      return res.status(401).json({ message: "Unauthorized" });
    } else if (userFounded) {
      req.user = userFounded;
      next();
    }
  } else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = isAuthenticated;
