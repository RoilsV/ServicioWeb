const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, 'contactos.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Leer contactos
app.get('/api/contactos', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'No se pudo leer el archivo.' });
    const contactos = JSON.parse(data || '[]');
    res.json(contactos);
  });
});

// Guardar nuevo contacto
app.post('/api/contactos', (req, res) => {
  const nuevo = req.body;
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    let contactos = [];
    if (!err && data) contactos = JSON.parse(data);
    contactos.push(nuevo);

    fs.writeFile(DATA_FILE, JSON.stringify(contactos, null, 2), err => {
      if (err) return res.status(500).json({ error: 'No se pudo guardar el contacto.' });
      res.status(201).json({ mensaje: 'Contacto guardado' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
