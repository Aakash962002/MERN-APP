import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import { User, validate } from "../models/userModel.js";
import bcrypt from "bcrypt";
import Joi from "joi";

export const registerUser = async (req, res) => {
  try {
    const { error } = validate(req.body);

    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(409).send({ message: "User with this email already exists" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "user created succssfully" });
  } catch (error) {
    res.status(404).json({ messages: error.message });
  }
};

const validateUserData = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

export const loginUser = async (req, res) => {
  try {
    const { error } = validateUserData(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send({ message: "Invalid email or password" });

    const validatePassword = await bcrypt.compare(req.body.password, user.password);

    if (!validatePassword) return res.status(401).send({ message: "Invalid email or password" });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Logged in succssfully" });
  } catch (error) {
    res.status(404).json({ messages: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const messages = await PostMessage.find();
    console.log("🚀 ~ file: posts.js:65 ~ getPosts ~ messages:", messages);
    res.status(200).json(messages);
  } catch (error) {
    res.status(404).json({ messages: error.message });
  }
};

export const createPosts = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    newPost.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ messages: error.message });
  }
};

export const updatePosts = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No data found");

  const updatePost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
  res.json(updatePost);
};

export const deletePosts = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No data found");

  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No data found");

  const post = await PostMessage.findById(id);
  const updatePost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
  res.json(updatePost);
};
