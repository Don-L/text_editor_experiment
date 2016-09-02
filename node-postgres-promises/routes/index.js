const express = require('express');
const router = express.Router();

const db = require('../queries');

router.get('/text', db.getAllText);
// router.get('/items/:id', db.getSingleItem);
// router.post('/items', db.createItem);
router.put('/text', db.updateText);
// router.delete('/items/:id', db.removeItem);

module.exports = router;
