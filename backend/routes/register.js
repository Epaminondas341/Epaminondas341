const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Asegúrate de que la ruta al modelo sea correcta
const router = express.Router(); // Usamos router en lugar de app

const JWT_SECRET = "mi_secreto_super_seguro";

router.use(express.json());

router.post("/register", async (req, res) => {
  console.log(req.body); // Ver qué datos se están recibiendo
  const { email, name, cedula, password } = req.body;

  // Verificar si el usuario ya existe en la base de datos
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "El usuario ya está registrado" });
  }

  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear un nuevo usuario
  const newUser = new User({
    email,
    name,
    cedula,
    password: hashedPassword,
  });

  // Guardar el nuevo usuario en la base de datos
  await newUser.save();

  res.json({ message: "Usuario registrado con éxito" });
});

module.exports = router;
