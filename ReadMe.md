
<img src="./image/logo.png" style="width: 85px; height: 85px">
<div style="font-size: 64px; font-weight: bold"> Short.lnk </div>


Современный веб-сервис для сокращения длинных URL-адресов, построенный на Vue.js клиенте, Node.js(Express.js) API и PostgreSQL базе данных в Docker-окружении.

## 🚀 Основные возможности

- **Сокращение ссылок**: Преобразование длинных URL в короткие удобные ссылки
- **Статистика переходов**: Просмотр количества кликов по каждой ссылке
- **Адаптивный дизайн**: Красивый и современный интерфейс
- **Docker-развертывание**: Простое запускание всей инфраструктуры одной командой

## 📋 Технологический стек

### Frontend
- Vue.js 3 + Composition API - основной фреймворк
- Vue Router - клиентская маршрутизация
- WebSocket Native API - real-time соединения
- Axios - HTTP-клиент для REST API
- Vite - сборка и разработка

### Backend
- Node.js + Express - серверная платформа
- WebSocket (ws) - real-time протокол
- PostgreSQL - реляционная база данных
- node-postgres (pg) - драйвер БД

### Инфраструктура
- Docker + Docker Compose - контейнеризация БД
- CORS - междоменные запросы
- REST API - архитектура взаимодействия

### Предварительные требования

- **Docker** версии 20.10+ 
- **Docker Compose** версии 2.0+
- **Node.js** 23+

## 📸 Скриншоты

### Главная страница
![Главная страница](/image/FirstPage.png)

*Интерфейс для ввода длинной ссылки и получения короткого варианта*

### Статистика и настройка
![Статистика](/image/SettingDialoge.png)

*Просмотр статистики переходов по сокращенным ссылкам, полная их настройка и конфигурация*

### После запуска приложение
- Клиентское приложение: http://localhost:3000
- Сервер API: http://localhost:4000
- База данных: **localhost:5432**
- WebSocket: **localhost:8080**

---
<div align="center">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
    <img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D">
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
    <img src="https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=websocket&logoColor=white">
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
</div>
