import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    trim: true
  },
  ProfilePic: {
    type: String
  },
  AboutUser: {
    type: String
  }
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const gensalt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, gensalt);
  }
  next();
});

UserSchema.methods.ComparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const User = mongoose.model("User", UserSchema);

export default User;

