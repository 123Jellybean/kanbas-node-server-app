import model from "./model.js";
export const findAllUsers = () => model.find();
// import db from "../Database/index.js";
// let { users } = db;

export const findUserByUsername = (username) =>
  model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>
  model.findOne({ username, password });

export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};
export const findUserById = (userId) => model.findById(userId);

export const deleteUser = (userId) => model.deleteOne({ _id: userId });

export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });

export const createUser = (user) => {
  delete user._id;
  return model.create(user);
};
