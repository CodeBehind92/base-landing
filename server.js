import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 4200;
const page = 'base-landing';

// Servir archivos estáticos del build
app.use(express.static(path.join(__dirname, 'dist', page, 'browser')));

// Redirigir todas las rutas al index.html (Angular, React, Vue, etc.)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', page, 'browser', 'index.html'));
});

app.listen(port, () => {
  console.log(`Landing page corriendo en el puerto ${port}`);
});
