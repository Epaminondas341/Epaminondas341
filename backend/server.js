const express = require("express");
const cors = require("./middlewares/cors");
const authenticateToken = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");
const registerRoutes = require("./routes/register");
const loginRoutes = require("./routes/login");

const app = express();
const port = 5000;

require("dotenv").config();

app.use(cors()); // Activar CORS
app.use(express.json()); // Middleware para parsear JSON

// Configuración de MongoDB
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/autoback")
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("No se pudo conectar a MongoDB:", err));

// Ruta raíz
app.get("/", (req, res) => {
  res.send("Bienvenido al backend de Autocentro!");
});

// Rutas
app.use("/auth", registerRoutes);
app.use("/auth", loginRoutes);

// Ruta protegida con autenticación
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Acceso autorizado!" });
});

// Middleware de manejo de errores
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
