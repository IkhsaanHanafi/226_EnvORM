const Komik = require('../models/komik');

// GET semua komik
exports.getAllKomik = async (req, res) => {
  try {
    const data = await Komik.findAll({ order: [['id', 'ASC']] });
    res.status(200).json({ message: 'Berhasil ambil data komik', data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET komik by id
exports.getKomikById = async (req, res) => {
  try {
    const komik = await Komik.findByPk(req.params.id);
    if (!komik) {
      return res.status(404).json({ message: 'Komik tidak ditemukan' });
    }
    res.status(200).json({ message: 'Berhasil ambil data komik', data: komik });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST tambah komik
exports.createKomik = async (req, res) => {
  try {
    const { title, description, author } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: 'title dan author wajib diisi' });
    }

    const komik = await Komik.create({ title, description, author });
    res.status(201).json({ message: 'Komik berhasil ditambahkan', data: komik });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT update komik
exports.updateKomik = async (req, res) => {
  try {
    const { title, description, author } = req.body;

    const komik = await Komik.findByPk(req.params.id);
    if (!komik) {
      return res.status(404).json({ message: 'Komik tidak ditemukan' });
    }

    if (!title || !author) {
      return res.status(400).json({ message: 'title dan author wajib diisi' });
    }

    await komik.update({ title, description, author });
    res.status(200).json({ message: 'Komik berhasil diupdate', data: komik });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE hapus komik
exports.deleteKomik = async (req, res) => {
  try {
    const komik = await Komik.findByPk(req.params.id);
    if (!komik) {
      return res.status(404).json({ message: 'Komik tidak ditemukan' });
    }

    await komik.destroy();
    res.status(200).json({ message: 'Komik berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
