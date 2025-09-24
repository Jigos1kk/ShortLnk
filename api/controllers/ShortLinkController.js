'use strict'

require('dotenv').config();
const db = require('../models')
const QRCode = require('qrcode')
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

        const baseUrl = process.env.SHORT_LINK_DOMAIN || `${req.protocol}://${req.get('host')}`;;
        const shortUrl = `${baseUrl}/${code}`;

        let qrCodeBase64;
        try {
            qrCodeBase64 = await QRCode.toDataURL(shortUrl);
        } catch(qrError) {
            console.error('Ошибка генерации QR:', qrError);
            return res.status(500).json({ error: 'Ошибка генерации QR-кода' });
        }

        const new_short_link = await ShortLinkModel.create({ 
            original_url: normalUrl,
            slug: code,
            qr_code: qrCodeBase64
        })

        return res.status(201).json({ data: new_short_link });
    }

    async index(req, res) {
        try {
            const short_links = await ShortLinkModel.findAll();
            return res.status(200).json({ short_links });
        } catch(error) {
            return res.status(500).json({ error: 'Ошибка получения всех сокращенных ссылок' })
        }
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