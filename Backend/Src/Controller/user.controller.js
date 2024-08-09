import asyncHandler from "../../Utility/Asynchandler.js";
import Apierror from "../../Utility/Apierror.js";
import Apiresponse from "../../Utility/Apiresponse.js";
import User from "../Model/User.Model.js";
import { compare } from "bcrypt";



  export const registerUser= asyncHandler(async(req,res,next)=>{
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return next(new Apierror("Please enter all fields", 400));
    }
  
    const userExist = await User.findOne({ email });
  
    if (userExist) {
      return next(new Apierror("User Already Exists", 400));
    }
  
    const user = await User.create({ name, email, password });
  
    const token = user.generateToken();
  
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    };
  
    res.cookie("token", token, cookieOptions);
  
    return res.status(201).json({
      name: user.name,
      email: user.email,
      ProfilePic: user.ProfilePic || "",
      AboutUser: user.AboutUser || "",
    }); 

  })


  export const signinUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return next(new Apierror("Please enter all fields", 400));
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return next(new Apierror("User Not Found", 404));
    }
  
    const validPassword = await user.ComparePassword(password);
  
    if (!validPassword) {
      return next(new Apierror("Invalid password", 400));
    }
  
    const token = user.generateToken();
  
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    };
  
    res.cookie('token', token, cookieOptions);
  
    user.password = undefined;
  
    return res.status(200).json(new Apiresponse(200, "Login Success", {
      name: user.name,
      email: user.email,
      ProfilePic: user.ProfilePic || "",
      AboutUser: user.AboutUser || "",
    }));
  });

  
  export const Logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0)
    });
    
    return res.status(200).json(new Apiresponse(200, "Logout Success", {}));
  });
  

  
  export const Getuser = asyncHandler(async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return next(new Apierror("User not found", 404));
      }
  
      return res.status(200).json({
        name: user.name,
        email: user.email,
        ProfilePic: user.ProfilePic || "",
        AboutUser: user.AboutUser || "",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  });
  

  export const Updateuser = asyncHandler(async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return next(new Apierror("User not found", 404));
      }
  
      if (req.body.name) {
        user.name = req.body.name;
      }
  
      if (req.body.email) {
        user.email = req.body.email;
      }
  
      if (req.body.ProfilePic) {
        user.ProfilePic = req.body.ProfilePic;
      }
  
      if (req.body.AboutUser) {
        user.AboutUser = req.body.AboutUser;
      }

      if(req.body.password){
        user.password = req.body.password;
      }

      await user.save();
  
      return res.status(200).json({
        name: user.name,
        email: user.email,
        ProfilePic: user.ProfilePic || "",
        AboutUser: user.AboutUser || "",
        password: user.password || "",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  });