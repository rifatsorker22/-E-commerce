const User = require("../model/user.model");

const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      res.status(200).json({
        message: "User found",
        data: user,
        links: {
          self: `/users/v1/${user.id}`,
          AllUsers: `/users/v1`,
          updateUser: `/users/v1/${user.id}`,
          deleteUser: `/users/v1/${user.id}`,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
const getAll = async (req, res, next) => {
  try {
    const user = await User.find();
    if (user === 0) {
      res.status(200).json({
        message: "User is Empty",
        links: {
          createUser: `/users/v1`,
        },
      });
    } else {
      res.status(200).json({
        message: "All users",
        user: user,
        links: {
          self: `/users/v1`,
          createUser: `/users/v1`,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
const create = async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;

    if (!firstName && !lastName && !email) {
      res.status(402).json({ message: "Invalid credientials" });
    } else {
      const newUser = new User({
        firstName,
        lastName,
        email,
      });

      await newUser.save();

      res.status(201).json({
        message: "New user is created",
        NewUser: newUser,
        links:{
          self: `/users/v1/${newUser.id}`,
          allUsers: `/users/v1`
        }
      });
    }
  } catch (error) {
    next(error);
  }
};
const updateById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { firstName, lastName, email } = req.body;

    const user = await User.findById(id);

    if (!user) {
      res.status(200).json({
        message: "user not exsist",
      });
    }else{

    if (!firstName && !lastName && !email) {
      res.status(402).json({ message: "Invalid credientials" });
    } else {
      const updateUser = await User.findByIdAndUpdate(
        id,
        {
          $set: {
            firstName: firstName,
            lastName: lastName,
            email: email,
          },
        },
        { new: true }
      );
      res.status(203).json({
        message: "User is update",
        data: updateUser,
        links: {
            self: `/users/v1/${updateUser.id}`
        },
      });
    }
  }
  } catch (error) {
    next(error);
  }
};
const deleteById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      res.status(200).json({
        message: "user not exsist",
      });
    } else {
      const deleteUser = await User.findByIdAndDelete(id);
      if (deleteUser) {
        res.status(200).json({
          message: "This user is Deleted successfully",
          user: deleteUser,
          links: {
            allUser: `/users/v1`,
            createUser: `users/v1`
          },
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getById,
  getAll,
  create,
  updateById,
  deleteById,
};
