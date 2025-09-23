'use strict'

const express = require('express');
const router = express.Router();

const ShortLinkController = require('./controllers/ShortLinkController')

router.get('/connect', (req, res) => {
    return res.status(200).json({ message: "Connect is success" })
});

router.post('/create/short_link', ShortLinkController.create);

module.exports = router;
