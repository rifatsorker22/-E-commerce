const User = require("../model/user.model");

const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    const baseUrl = `${req.protocol}://${req.get('host')}`

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      res.status(200).json({
        message: "User found",
        data: user,
        links: {
          self: `${baseUrl}/users/v1/${user.id}`,
          AllUsers: `${baseUrl}/users/v1`,
          updateUser: `${baseUrl}/users/v1/${user.id}`,
          deleteUser: `${baseUrl}/users/v1/${user.id}`,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
const getAll = async (req, res, next) => {
  try {
    const page = +req.query.page || 1
    const limit = +req.query.limit || 10
    const skip = ( page - 1)*limit
    const user = await User.find().skip(skip).limit(limit)
    const totalItem = await User.count()
    const totalPage = Math.ceil(totalItem/limit)



    const baseUrl = `${req.protocol}://${req.get('host')}`
    if (user === 0) {
      res.status(200).json({
        message: "User is Empty",
        links: {
          createUser: `${baseUrl}/users/v1`,
        },
      });
    } else {
      res.status(200).json({
        message: "All users",
        user: user,
        pagination:{
          currentPage:page,
          totalItem:totalItem,
          totalPage:totalPage,
          hasPrev:(page > 1)?page-1:null,
          hasNext:(page< totalPage) ? page + 1: null
        },
        links: {
          self: `${baseUrl}/users/v1?page=${page}&limit=${limit}`,
          prev: (page > 1) ? `${baseUrl}/users/v1?page=${page-1}&limit=${limit}`:null,
          next: (page< totalPage) ? `${baseUrl}/users/v1?page=${page+1}&limit=${limit}`:null
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
      const baseUrl = `${req.protocol}://${req.get('host')}`
      res.status(201).json({
        message: "New user is created",
        NewUser: newUser,
        links:{
          self: `${baseUrl}/users/v1/${newUser.id}`,
          allUsers: `${baseUrl}/users/v1`
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
      const baseUrl = `${req.protocol}://${req.get('host')}`
      res.status(203).json({
        message: "User is update",
        data: updateUser,
        links: {
            self: `${baseUrl}/users/v1/${updateUser.id}`
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
        const baseUrl = `${req.protocol}://${req.get('host')}`
        res.status(200).json({
          message: "This user is Deleted successfully",
          user: deleteUser,
          links: {
            allUser: `${baseUrl}/users/v1`,
            createUser: `${baseUrl}/users/v1`
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
