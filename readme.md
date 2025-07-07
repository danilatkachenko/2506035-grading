# 🎸 Guitar Shop — Fullstack CRUD-магазин гитар

Полноценное приложение для управления магазином гитар.  
Сделано с нуля на **React + Node.js + MongoDB**. Поддерживает:

- 🔐 Авторизацию и регистрацию
- 🧩 CRUD для товаров (гитары)
- 🔍 Поиск, фильтры и сортировку
- 🎨 Полную стилизацию по готовому макету (markup)
- 💾 Локальную MongoDB (или Docker)

---

## 📁 Структура проекта
```
markup/ — вёрстка проекта, UI-kit и страницы (HTML, CSS, изображения)
frontend/ — React-приложение
backend/ — API на Express + MongoDB
```
---

## ⚙️ Установка и запуск

### 📦 1. Backend
```
cd backend
npm install
cp .env.example .env
npm run dev
```
🔸 Mongo должна быть запущена локально на mongodb://localhost:27017/guitar-shop
(если нужно — можешь использовать docker-compose.yml)

🌐 2. Frontend
```
cd frontend
npm install
npm run dev
```
Откроется на http://localhost:5173
```
👤 Тестовые аккаунты
| Email              | Пароль |
| -------------------| ------ |
| danila@example.com | 12345  |
```
🧠 В проекте реализовано:
🔐 Аутентификация через JWT

👥 Роуты /login, /register

🎸 Страница со списком товаров /products

➕ Создание товара /create

📝 Редактирование товара /products/:id/edit

👁️ Просмотр товара /products/:id/view

🧹 Удаление

📄 404-страница

🔍 Поиск + фильтрация + сортировка

🎨 Полная адаптация под макет markup/ (готовая вёрстка)

📦 CLI генератор товаров
Для быстрой генерации товаров:
```
cd backend
npx ts-node src/cli.ts
```
🗂 Пример .env файла
```
PORT=4000
MONGO_URL=mongodb://localhost:27017/guitar-shop
JWT_SECRET=your_jwt_secret
```
🚀 Разработка
✅ React 18 + Vite + TypeScript

✅ Express.js

✅ MongoDB + Mongoose

✅ Tailwind (только базово)

✅ Собственные стили из markup

✅ REST API с авторизацией

👀 Макет Figma
👉 [Открыть макет](https://www.figma.com/design/Ly8nnxUpM0jEV5zfTmHTFl/Guitar-2.0-Грейдирование--Фулстек-разработчик--9-?node-id=1-4775)

🤝 Спасибо за просмотр!
Проект сделан как часть грейдирования. Все стили, разметка и изображения — из готового markup/.
