const Bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    const salt = await Bcrypt.genSalt(10);
    const hassedPassword = await Bcrypt.hash(password, salt);
    let user = await User.findOne({ email: email });
    if (user) {
      res.status(400).json("email already exists");
    } else {
      user = new User({
        name,
        email,
        password: hassedPassword,
        age,
      });
      await user.save();

      const payload = {
        user: user._id,
      };
      const token = jwt.sign({ user: user._id }, process.env.SECRET_KEY, {
        expiresIn: 36000,
      });
      res.cookie("token", token, { httpOnly: true, expiresIn: 36000 });
      const { password: pass, ...rest } = user._doc;
      res.status(201).json({ msg: "user registered successfully", user: rest });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  try {
    if (!user) {
      res.status(404).json({ msg: "user not Found" });
    } else {
      const isValid = await Bcrypt.compare(password, user.password);
      if (isValid) {
        const token = jwt.sign({ user: user._id }, process.env.SECRET_KEY, {
          expiresIn: 36000,
        });
        res.cookie("token", token, { httpOnly: true, expiresIn: 36000 });
        res.status(200).json({ msg: "login seccessfully" });
      } else {
        res.status(404).json({ msg: "invalid credentials!" });
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

//logout
const logoutUser = (req, res) => {
  res.clearCookie("token").status(200).json({ msg: "logout successfully" });
};

//getme
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

//updateUserDetails
const updateUserDetails = async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(404).json({ msg: "user not Found" });
    } else {
      const exists = await User.findOne({ email: email });
      if (exists && exists._id.toString() !== user._id.toString()) {
        res.status(404).json({ msg: "Email already Exists" });
      } else {
        user.name = name || user.name;
        user.email = email || user.email;
        user.age = age || user.age;
        await user.save();
        res.status(200).json({ msg: "user updated", user: user });
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

//updateUserPassword
const updateUserPassword = async (req, res) => {
  const { password } = req.body;
  try {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(404).json({ msg: "User not Found!" });
    } else {
      if (!password) {
        res.status(200).json({ msg: "password field is empty" });
      } else {
        const isMatch=await Bcrypt.compare(password,user.password)
        if(isMatch){
            res.status(404).json({ msg: "You have entered current password!" });
        }else{
        const salt=await Bcrypt.genSalt(10)
        const hashpass=await Bcrypt.hash(password,salt)
        user.password = hashpass || user.password;
        await user.save();
        res.status(200).json({ msg: "password updated" });
        }
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
};

//deleterUser
const deleterUser = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      res.status(404).json({ msg: "user not Found" });
    } else {
      await User.deleteOne({ user });
      res.status(200).json({ msg: "user deleted" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  updateUserDetails,
  updateUserPassword,
  deleterUser,
};
