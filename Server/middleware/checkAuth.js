import User from "../models/User.js";
import jwt from "jsonwebtoken";

const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select(
        "-confirmed -token -createdAt -updatedAt -__v"
      );
      return next();
    } catch (error) {
      return res.status(403).json({ status: 403, message: error.message });
    }
  }
  if (!token) {
    console.log(token);
    return res.status(401).json({ status: 401, message: "Token Invalido" });
  }
  next();
};

export default checkAuth;
