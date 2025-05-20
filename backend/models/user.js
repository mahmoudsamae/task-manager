import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /.+\@.+\..+/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false, // Exclude from query results by default
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema = mongoose.model("user", userSchema);

export default UserSchema;