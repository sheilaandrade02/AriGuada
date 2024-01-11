const express = require('express');
const mongoose = require('mongoose');
const { z } = require('zod');

const app = express();
const cors = require('cors'); // CORS

app.use(cors()); // CORS
app.disable('x-powered-by');
app.use(express.json());

// ConÃ©ctate a MongoDB
mongoose.connect('mongodb://localhost:27017/BaseDatosAri', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define el esquema del modelo
const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correoElectronico: { type: String, required: true, unique: true },
  usuario: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  codigoPostal: { type: String, required: true, maxlength: 5 },
  direccion: { type: String, required: true },
});

// Crea el modelo a partir del esquema
const Usuario = mongoose.model('Usuario', usuarioSchema);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/users', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json({ results: usuarios });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/users/:usuario', async (req, res) => {
  try {
    const usuarioEncontrado = await Usuario.findOne({ usuario: req.params.usuario });

    if (usuarioEncontrado) {
      const contrasenaEnviada = req.get('contrasena');

      if (contrasenaEnviada === usuarioEncontrado.contrasena) {
        res.json({ BIENVENIDO: usuarioEncontrado.nombre });
      } else {
        res.status(401).send('Contraseña incorrecta');
      }
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/users', async (req, res) => {
  const schema = z.object({
    nombre: z.string().nonempty(),
    apellido: z.string().nonempty(),
    correoElectronico: z.string().email(),
    usuario: z.string().nonempty(),
    contrasena: z.string().nonempty(),
    codigoPostal: z.string().length(5),
    direccion: z.string().nonempty(),
  });

  try {
    const nuevoUsuario = schema.parse(req.body);
    const usuarioCreado = await Usuario.create(nuevoUsuario);
    res.status(201).json(usuarioCreado);
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


