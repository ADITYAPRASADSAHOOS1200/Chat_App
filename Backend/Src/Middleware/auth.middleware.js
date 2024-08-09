import asyncHandler from "../../Utility/Asynchandler.js";
import Apierror from "../../Utility/Apierror.js";
import jwt from 'jsonwebtoken';
import User from "../Model/User.Model.js";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.replace("Bearer", ""));
  console.log(token);
  
  if (!token) {
    return next(new Apierror("Please Login First", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    
    
    req.user = await User.findById(decoded._id);
    
    if (!req.user) {
      return next(new Apierror("User not found", 404));
    }
    
    next();
  } catch (error) {
    return next(new Apierror("Invalid or expired token", 401));
  }
});

