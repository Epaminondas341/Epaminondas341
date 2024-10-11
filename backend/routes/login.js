const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Asegúrate de que la ruta al modelo sea correcta
const router = express.Router();

const JWT_SECRET = "mi_secreto_super_seguro";

router.use(express.json());

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Busca el usuario por el email
  const user = await User.findOne({ email });
  console.log("Usuario encontrado:", user); // Verifica que se encuentra el usuario

  if (!user) {
    return res.status(400).json({ message: "Usuario no encontrado" });
  }

  // Verifica la contraseña encriptada
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log("Contraseña válida:", isPasswordValid); // Verifica si la contraseña es correcta

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Contraseña incorrecta" });
  }

  // Genera el token
  const token = jwt.sign({ email: user.email }, JWT_SECRET, {
    expiresIn: "30d",
  });
  res.json({ message: "Login exitoso", token });
});

module.exports = router;
