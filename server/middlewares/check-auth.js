import jwt from "jsonwebtoken";
import HttpError from "../models/HttpError.js";

const checkAuth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token, "hello");
    if (!token) {
      return next(new HttpError("Authentication failed!", 500));
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    return next(new HttpError("Authentication failed!", 403));
  }
};

export default checkAuth;
