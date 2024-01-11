const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { z } = require('zod');

const app = express();

app.use(cors());
app.disable('x-powered-by');
app.use(express.json());

// Conéctate a MongoDB
mongoose.connect('mongodb://localhost:27017/BaseDatosAri', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define el esquema del modelo para las camisetas
const camisetaSchema = new mongoose.Schema({
  color: { type: String, required: true },
  stock: {
    S: { type: Number, required: true },
    M: { type: Number, required: true },
    L: { type: Number, required: true },
    XL: { type: Number, required: true },
  }
});


// Crea el modelo a partir del esquema
const Tiendas = mongoose.model('Tiendas', camisetaSchema);

app.get('/', (req, res) => {
  res.send('Hello Mundo');
});

app.get('/camisetas', async (req, res) => {
  try {
    const camisetas = await Tiendas.find();
    res.json({camisetas });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/camisetas/decrementar-stock/:color/:stock', async (req, res) => {
  const { color, stock } = req.params;

  try {
    const camiseta = await Tiendas.findOne({ color });

    if (!camiseta) {
      return res.status(404).json({ error: 'Camiseta no encontrada' });
    }

    // Verificar si la talla existe en el stock
    if (!(stock in camiseta.stock)) {
      return res.status(400).json({ error: 'Talla no válida para esta camiseta' });
    }

    // Decrementar el stock de la talla correspondiente
    camiseta.stock[stock]--;

    // Guardar la camiseta modificada
    const camisetaModificada = await camiseta.save();

    res.json({ camisetaModificada });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch('/camisetas/incrementar-stock/:color/:stock', async (req, res) => {
  const { color, stock } = req.params;

  try {
    const camiseta = await Tiendas.findOne({ color });

    if (!camiseta) {
      return res.status(404).json({ error: 'Camiseta no encontrada' });
    }

    // Verificar si la talla existe en el stock
    if (!(stock in camiseta.stock)) {
      return res.status(400).json({ error: 'Talla no válida para esta camiseta' });
    }

    // Decrementar el stock de la talla correspondiente
    camiseta.stock[stock]++;

    // Guardar la camiseta modificada
    const camisetaModificada = await camiseta.save();

    res.json({ camisetaModificada });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
