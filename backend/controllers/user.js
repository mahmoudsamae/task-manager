import UserSchema from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { email, password } = req.body || {};
  
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are requierd" });
    }

    const user = await UserSchema.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ message: "user not existed" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "password not correct" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Succesfuly logged In",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await UserSchema.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already existed" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserSchema.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "error while regitering" });
  }
};


// update user profile 
export const updateUser = async (req, res) => {
  const { username, email, currentPassword, newPassword } = req.body;
  const userID = req.params.id;
  try {

    const user = await UserSchema.findById(userID).select("+password");
    if(!user) {
      return res.status(404).json({message: "User Not Found"});
    }
    
    if (!currentPassword || !user.password) {
      return res
        .status(400)
        .json({ message: "Missing current password or stored password" });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);;
    if(!isMatch){
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const updatedData = { username, email };

    if (newPassword) {
      updatedData.password = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await UserSchema.findByIdAndUpdate(
      userID,
      updatedData,
      { new: true }
    );


    res.status(200).json({ message: "User updated", user: updatedUser });

  } catch (error) {
    res.status(500).json({message: error.message});
  }
}