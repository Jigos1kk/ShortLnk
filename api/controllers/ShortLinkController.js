'use strict'

require('dotenv').config();
const db = require('../models')
const QRCode = require('qrcode')
const crypto = require('crypto');
const ShortLinkModel = db.short_link;

// Предполагаем, что у вас есть настроенный WebSocket сервер
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: process.env.WS_PORT || 8080 });

class ShortLinkController {
    constructor() {
        this.create = this.create.bind(this);
        this.redirect = this.redirect.bind(this);
        this.update = this.update.bind(this);
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

        const baseUrl = process.env.SHORT_LINK_DOMAIN || `${req.protocol}://${req.get('host')}`;
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

        console.log(new_short_link);
        

        this._broadcastNewShortLink(new_short_link);

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

    async redirect(req, res) {
        const { slug } = req.params;

        try {
            const shortLink = await ShortLinkModel.findOne({
                where: { slug }
            });

            if (!shortLink) {
                return res.status(404).json({ error: 'Ссылка не найдена' });
            }

            if (shortLink.max_clicks && shortLink.click_count >= shortLink.max_clicks) {
                return res.status(403).json({ error: 'Превышен лимит переходов' });
            }

            await ShortLinkModel.update(
                { 
                    click_count: shortLink.click_count + 1,
                    last_accessed: new Date()
                },
                { where: { id: shortLink.id } }
            );

            const updated_short_link = await ShortLinkModel.findOne({ where: { id: shortLink.id } })
            console.log(updated_short_link);
            
            this._broadcastUpdateShortLink(updated_short_link);

            return res.redirect(shortLink.original_url);
            
        } catch (error) {
            console.error('Ошибка редиректа:', error);
            return res.status(500).json({ error: 'Ошибка перенаправления' });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const data = req.body;

        try {
            const existingLink = await ShortLinkModel.findByPk(id);
            if (!existingLink) {
                return res.status(404).json({ error: 'Ссылка не найдена' });
            }

            let normalUrl;
            try {
                normalUrl = new URL(data.original_url).toString();
            } catch(error) {
                return res.status(400).json({ error: 'Неправильный URL' });
            }

            const updatedData = {
                ...data,
                updated_at: new Date()
            };

            if (existingLink.original_url !== normalUrl) {
                const baseUrl = process.env.SHORT_LINK_DOMAIN || `${req.protocol}://${req.get('host')}`;
                const shortUrl = `${baseUrl}/${existingLink.slug}`;
                
                try {
                    updatedData.qr_code = await QRCode.toDataURL(shortUrl);
                } catch(qrError) {
                    console.error('Ошибка генерации QR:', qrError);
                    return res.status(500).json({ error: 'Ошибка генерации QR-кода' });
                }
            }

            await ShortLinkModel.update(updatedData, {
                where: { id }
            });

            const updatedLink = await ShortLinkModel.findByPk(id);

            this._broadcastUpdateShortLink(updatedLink);

            return res.status(200).json({ data: updatedLink });
        } catch (error) {
            console.error('Ошибка обновления:', error);
            return res.status(500).json({ error: 'Ошибка обновления ссылки' });
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

    _broadcastNewShortLink(shortLink) {
        const message = JSON.stringify({
            type: 'SHORT_LINK_CREATED',
            data: shortLink
        });

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }

    _broadcastUpdateShortLink(shortLink) {
        const message = JSON.stringify({
            type: 'SHORT_LINK_UPDATED',
            data: shortLink
        });

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }

    // Функция для broadcast по WebSocket о клике по ссылке
    _broadcastLinkClick(shortLink) {
        const message = JSON.stringify({
            type: 'SHORT_LINK_CLICKED',
            data: shortLink
        });

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }
}

module.exports = new ShortLinkController();