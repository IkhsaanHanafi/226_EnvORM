const express = require('express');
const router = express.Router();
const komikController = require('../controllers/komikController');

router.get('/', komikController.getAllKomik);
router.get('/:id', komikController.getKomikById);
router.post('/', komikController.createKomik);
router.put('/:id', komikController.updateKomik);
router.delete('/:id', komikController.deleteKomik);

module.exports = router;
