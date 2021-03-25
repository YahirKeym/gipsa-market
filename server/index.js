const express = require("express");
const path = require("path");

const app = express();

// Cargamos el directorio estatico de la aplicación
app.use(express.static(path.join(__dirname, "/build")));

// Hacemos el match con cualquier ruta y lo mandamos a llamar el index
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("La app está corriendo en el puerto " + port);
