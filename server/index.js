require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const TelegramApi = require("node-telegram-bot-api");

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const token = process.env.BOT_TOKEN;     // твоё значение из .env
const webAppUrl = process.env.WEBAPP_URL; // ссылка на фронтенд

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(cors());
}
app.use(express.json()); // для парсинга body JSON

// --- TELEGRAM BOT ---
const bot = new TelegramApi(token, { polling: true });

const againOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "Запуск приложения", web_app: { url: webAppUrl } }]
    ]
  })
};

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(chatId, "Привет! Нажми кнопку, чтобы открыть приложение 👇", againOptions);
  }
});

// --- API ДЛЯ ФРОНТЕНДА ---
// Пример: запрос прогнозов на сервере
app.get("/api/weather", async (req, res) => {
  const city = req.query.city || "Москва";

  try {
    const API_KEY = process.env.WEATHER_API_KEY;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=${API_KEY}&units=metric`);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Ошибка получения данных" });
  }
});


// --- ЗАПУСК СЕРВЕРА ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("✅ Сервер запущен на порту " + PORT));







// // --- РАЗДАЧА REACT BUILD ---
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "bundle")));
//   app.get("*", (_, res) => {
//     res.sendFile(path.join(__dirname, "bundle", "index.html"));
//   });
// }







// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // Пример API для погоды
// app.get("/api/weather", async (req, res) => {
//   const city = req.query.city;

//   if (!city) {
//     return res.status(400).json({ error: "Город не указан" });
//   }

//   try {
//     const apiKey = process.env.WEATHER_API_KEY;
//     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=${apiKey}&units=metric`);
//     const data = await response.json();

//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Ошибка при получении данных" });
//   }
// });

// app.listen(PORT, () => console.log(`✅ Сервер запущен на http://localhost:${PORT}`));