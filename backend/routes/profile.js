const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router(); // Usamos router en lugar de app

const JWT_SECRET = "mi_secreto_super_seguro";

router.use(express.json());

let users = [];

router.post("/register", async (req, res) => {
  const { email, name, cedula, password } = req.body;
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: "El usuario ya está registrado" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, name, cedula, password: hashedPassword });

  res.json({ message: "Usuario registrado con éxito" });
});

module.exports = router;
