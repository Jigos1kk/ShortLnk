'use strict'

require('dotenv').config();
const db = require('../models')
const crypto = require('crypto');
const ShortLinkModel = db.short_link;

class ShortLinkController {
    constructor() {
        this.create = this.create.bind(this);
    }

    async create(req, res) {
        const { url } = req.body;

        let normalUrl;
        try {
            normalUrl = new URL(url).toString();
        } catch(error) {
            return res.status(400).json({ error: 'Неправильный URL' })
        }

        const code = this._createShortLink(normalUrl);

        const new_short_link = await ShortLinkModel.create({ 
            original_url: normalUrl,
            slug: code
        })

        return res.status(201).json({ data: new_short_link });
    }

    _createShortLink(_url, length = 7) {
      const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const max = alphabet.length;

      let result = '';
      for (let i = 0; i < length; i++) {
        const idx = crypto.randomInt(0, max);
        result += alphabet[idx];
      }
      return result;
    }
}

module.exports = new ShortLinkController();