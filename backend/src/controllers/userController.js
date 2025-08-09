const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const Joi = require('joi');

const registerSchema = Joi.object({
  nombre: Joi.string().required(),
  email: Joi.string().email().required(),
  telefono: Joi.string().required(),
  rol: Joi.string().valid('Administrador', 'Colaborador', 'Cliente').required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

exports.register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { nombre, email, telefono, rol, password } = req.body;

    let user = await userService.findUserByEmail(email);
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = await userService.registerUser({ nombre, email, telefono, rol, password });

    const token = jwt.sign({ id: user._id, rol: user.rol }, config.secret, {
      expiresIn: config.expiresIn
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, rol: user.rol }, config.secret, {
      expiresIn: config.expiresIn
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProfile = async (req, res) => {
  res.json(req.user);
};

exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
