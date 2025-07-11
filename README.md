# Guitar Shop

## 🚀 Запуск проекта

### 📦 Условия:

* Установлен [Docker](https://www.docker.com/) и Docker Compose

### 🛠 Инструкция:

1. Создать файл `.env` в папке `backend/` на основе `.env.example`:

   ```bash
   cp backend/.env.example backend/.env
   ```

   Проверь, что в `.env` указаны:

   ```env
   MONGODB_URI=mongodb://mongo:27017/guitar-shop
   JWT_SECRET=your_jwt_secret
   ```

2. Запустить проект:

   ```bash
   docker compose up --build
   ```

3. Открыть браузер:

    * Frontend: [http://localhost:5173](http://localhost:5173)
    * Backend API: [http://localhost:4000/api](http://localhost:4000/api)

---

## 📜 Сценарии (`package.json`)

### 📁 Backend (`backend/`):

| Скрипт          | Назначение                          |
|-----------------|-------------------------------------|
| `npm run start` | Запуск собранного сервера           |
| `npm run dev`   | Запуск сервера с `ts-node-dev`      |
| `npm run build` | Сборка TypeScript-кода в `dist/`    |
| `npm run lint`  | Проверка линтера (если есть ESLint) |

---

### 💻 Frontend (`frontend/`):

| Скрипт            | Назначение                        |
|-------------------|-----------------------------------|
| `npm run dev`     | Запуск в режиме разработки (Vite) |
| `npm run build`   | Сборка фронта в `dist/`           |
| `npm run preview` | Просмотр собранного проекта       |

---

## 🐳 Docker Compose

Файл `docker-compose.yml` в корне проекта запускает:

* MongoDB на порту `27017`
* Backend (`localhost:4000`)
* Frontend (`localhost:5173`)

Папка `uploads/` в `backend/` используется для хранения загруженных изображений.