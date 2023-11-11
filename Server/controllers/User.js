import { emailSignUp } from "../helpers/emails.js";
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";
import User from "../models/User.js";

// Get
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    const response = {
      status: 200,
      message: "getUsers",
      data: users,
    };
    return res.status(200).json(response);
  } catch (error) {
    const response = {
      status: 400,
      message: `getUsers, Error: ${error.message}`,
    };
    return res.status(400).json(response);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await User.findById(id);
    const response = {
      status: 200,
      message: "getUsers",
      data: users,
    };
    return res.status(200).json(response);
  } catch (error) {
    const response = {
      status: 400,
      message: `getUsers, Error: ${error.message}`,
    };
    return res.status(400).json(response);
  }
};

// POST
const createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const userFound = await User.findOne({ email });
    if (userFound) {
      const error = new Error("Usuario ya registrado");
      return res
        .status(400)
        .json({ message: `createUser, Error: ${error.message}` });
    }
    const user = new User(req.body);
    user.token = generateId();
    const response = await user.save();
    emailSignUp({
      email: response.email,
      name: response.name,
      token: response.token,
    });
    return res.status(200).json({ message: "createUser", data: response });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `createUser, Error: ${error.message}` });
  }
};

const login = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email }).select("+password");
    // Revisamos si existe el usuario
    if (!userFound) {
      const error = new Error("Usuario no encontrado");
      return res
        .status(400)
        .json({ message: `login, Error: ${error.message}` });
    }
    // Revisamos si el usuario ha sido confirmado
    if (!userFound.confirmed) {
      const error = new Error("Usuario no confirmado");
      return res
        .status(400)
        .json({ message: `login, Error: ${error.message}` });
    }
    // Revisamos si el password es correcto
    if (await userFound.validatePassword(password)) {
      return res.status(200).json({
        status: 200,
        message: "Password correcto",
        data: {
          _id: userFound._id,
          name: userFound.name,
          email: userFound.email,
          token: generateJWT(userFound._id),
        },
      });
    } else {
      const error = new Error("Password incorrecto");
      return res.status(401).json({ status: 401, message: error.message });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: `createUser, Error: ${error.message}` });
  }
};

export { getUsers, getUserById, createUser, login };
