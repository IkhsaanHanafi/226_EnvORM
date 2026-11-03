require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const createDatabase = require('./config/createDb');
const komikRoutes = require('./routes/komikRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API Komik jalan' });
});

app.use('/api/komik', komikRoutes);

const start = async () => {
  try {
    await createDatabase();
    await sequelize.authenticate();
    console.log('Koneksi database berhasil');

    // bikin tabel "komik" lewat sequelize
    await sequelize.sync();
    console.log('Tabel komik siap');

    app.listen(PORT, () => {
      console.log(`Server jalan di http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Gagal start server:', err.message);
    process.exit(1);
  }
};

start();
