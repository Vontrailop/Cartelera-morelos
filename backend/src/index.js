const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);
const pedidoRoutes = require('./routes/pedidoRoutes');
app.use('/api/pedidos', pedidoRoutes);
const cotizacionRoutes = require('./routes/cotizacionRoutes');
app.use('/api/cotizaciones', cotizacionRoutes);
const contratoRoutes = require('./routes/contratoRoutes');
app.use('/api/contratos', contratoRoutes);
const costoRoutes = require('./routes/costoRoutes');
app.use('/api/costos', costoRoutes);
const notificacionRoutes = require('./routes/notificacionRoutes');
app.use('/api/notificaciones', notificacionRoutes);
const equipoRoutes = require('./routes/equipoRoutes');
app.use('/api/equipos', equipoRoutes);
const rentaEquipoRoutes = require('./routes/rentaEquipoRoutes');
app.use('/api/rentas', rentaEquipoRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
