require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const TelegramApi = require("node-telegram-bot-api");

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const token = process.env.BOT_TOKEN;     
const webAppUrl = process.env.WEBAPP_URL; 

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(cors());
}
app.use(express.json()); // для парсинга body JSON

// --- TELEGRAM BOT ---
const bot = new TelegramApi(token, { polling: true });


//=====================================================================
// ---- Memory storage (имитация БД) ----
function loadUsers() {
  return JSON.parse(fs.readFileSync("users.json", "utf-8"));
}
function saveUsers(data) {
  fs.writeFileSync("users.json", JSON.stringify(data, null, 2));
}

// ---- Диалог состояния ----
const userState = {};  // chatId → "waiting_city_time"


//  /start Команда
const againOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "Запуск приложения", web_app: { url: webAppUrl } }]
    ]
  })
};


bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Привет! Хочешь получать ежедневный прогноз погоды?\n" +
    "Используй команду /setcity\n" +
    "Или нажми кнопку, чтобы открыть приложение 👇", againOptions);
});

// -------------------------------------
//  /setcity — пользователь начинает настройку
// -------------------------------------
bot.onText(/\/setcity/, (msg) => {
  const chatId = msg.chat.id;

  userState[chatId] = "waiting_city_time";

  bot.sendMessage(chatId, "Укажите город и время в формате: Москва 09:00");
});

// -------------------------------------
//  Обработка ввода "Москва 09:00"
// -------------------------------------
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (userState[chatId] !== "waiting_city_time") return;

  const parsed = text.match(/(.+)\s+(\d{1,2}):(\d{2})/);

  if (!parsed) {
    return bot.sendMessage(chatId, "Формат неверный. Пример: Москва 09:00");
  }

  const city = parsed[1].trim();
  const hours = parseInt(parsed[2]);
  const minutes = parseInt(parsed[3]);

  // ---- Получаем timezone города ----
  const owUrl = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_BOT_API_KEY}&q=${encodeURIComponent(city)}&days=1&aqi=no&alerts=no&lang=ru`;

  const resp = await fetch(owUrl);
  const data = await resp.json();

  if (!data.location.name) {
    return bot.sendMessage(chatId, "Город не найден.");
  }

  const nowUTC = Math.floor(Date.now() / 1000);
  const timezoneOffset = data.location.localtime_epoch - nowUTC;

  // ---- Конвертация пользовательского времени -> UTC ----
  // Время пользователя (локальное по городу) минус смещение
  const totalMinutes = hours * 60 + minutes;
  const utcMinutes = totalMinutes - timezoneOffset / 60;

  let utcH = Math.floor((utcMinutes / 60 + 24) % 24);
  let utcM = ((utcMinutes % 60) + 60) % 60;

  // ---- Сохраняем в JSON ----
  const users = loadUsers();

  const entry = {
    chatId,
    city,
    tzOffset: timezoneOffset,
    userH: hours,
    userM: minutes,
    utcH,
    utcM
  };

  // удаляем предыдущую настройку
  const filtered = users.filter(u => u.chatId !== chatId);
  filtered.push(entry);
  saveUsers(filtered);

  delete userState[chatId];

  bot.sendMessage(chatId,
    `Готово!\nБуду отправлять прогноз для *${city}* каждый день в *${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}*`,
    { parse_mode: "Markdown" }
  );
});

// -------------------------------------
//  CRON — Проверка каждую минуту
// -------------------------------------
cron.schedule("* * * * *", async () => {
  const now = new Date();
  const h = now.getUTCHours();
  const m = now.getUTCMinutes();

  const users = loadUsers();

  for (const u of users) {
    if (u.utcH === h && u.utcM === m) {
      // --- Получаем прогноз ---
    //  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(u.city)}&appid=${process.env.WEATHER_BOT_API_KEY}&units=metric&lang=ru`;
      const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_BOT_API_KEY}&q=${encodeURIComponent(u.city)}&days=1&aqi=no&alerts=no&lang=ru`;

      const resp = await fetch(url);
      const data = await resp.json();

      const chanceOfRanin = data.forecast.forecastday[0].day.daily_chance_of_rain;
      const chanceOfSnow = data.forecast.forecastday[0].day.daily_chance_of_snow;
      const precepitationChance = chanceOfRanin > chanceOfSnow ? `Вероятность дождя ${chanceOfRanin}%` : `Вероятность выпадения снега ${chanceOfSnow}%`

      const text =
        `Погода в *${u.city}* сейчас:\n` +
        `Температура: *${Math.trunc(data.current.temp_c)}°C*\n` +
        `${data.current.condition.text}\n` +
        `\n` +
        `Погода сегодня:\n` +
        `Температура max: ${Math.trunc(data.forecast.forecastday[0].day.maxtemp_c)}\n` +
        `Температура min: ${Math.trunc(data.forecast.forecastday[0].day.mintemp_c)}\n` +
        `Ветер: ${data.forecast.forecastday[0].day.maxwind_kph}км/ч\n` +
        `${precepitationChance}`;

      bot.sendMessage(u.chatId, text, { parse_mode: "Markdown" });
    }
  }
});

//=====================================================================
// -------------------------------------
//  /deletecity — удалить город пользователя
// -------------------------------------
    bot.onText(/\/deletecity/, (msg) => {
      const chatId = msg.chat.id;

      const users = loadUsers();

      // проверяем, есть ли запись
      const exists = users.some(u => u.chatId === chatId);

      if (!exists) {
        return bot.sendMessage(chatId, "У вас нет сохранённого города.");
      }

      // удаляем запись
      const updated = users.filter(u => u.chatId !== chatId);
      saveUsers(updated);

      bot.sendMessage(chatId, "Ваш город был успешно удалён. Ежедневные уведомления отключены.");
    });

//====================================================================


bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(chatId, "Привет! Нажми кнопку, чтобы открыть приложение 👇", againOptions);
  }
});

// --- API ДЛЯ ФРОНТЕНДА ---
app.get("/api/weather", async (req, res) => {
  const city = req.query.city || "Москва";

  try {
    const API_KEY = process.env.WEATHER_API_KEY;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&lang=ru&appid=${API_KEY}&units=metric`);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Ошибка получения данных" });
  }
});

app.get("/api/forecast", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "lat и lon обязательны" });
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,weather_code,precipitation_sum,winddirection_10m_dominant,apparent_temperature_max,apparent_temperature_min,pressure_msl_mean&hourly=temperature_2m,weather_code,precipitation,wind_speed_10m&current=temperature_2m,apparent_temperature,weather_code,cloud_cover,wind_speed_10m,pressure_msl,relative_humidity_2m&timezone=auto&forecast_days=14&wind_speed_unit=ms`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при получении прогноза" });
  }
});

app.get("/api/random-pic", async (req, res) => {
  const { descr } = req.query;

  if (!descr) {
    return res.status(400).json({ error: "Описание (descr) обязательно" });
  }

  try {
    const apiKey = process.env.UNSPLASH_API_KEY;

    const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(descr)}&orientation=portrait&client_id=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка получения изображения" });
  }
});

app.get("/api/random-pics", async (req, res) => {
  try {
    const apiKey = process.env.UNSPLASH_API_KEY;

    const url = `https://api.unsplash.com/photos/random?count=14&query=macro+nature&orientation=portrait&client_id=${apiKey}`;

    const response = await fetch(url);
    let data = await response.json();

    // Если вернулся один объект, оборачиваем в массив
    if (!Array.isArray(data)) {
      data = [data];
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка получения списка фото" });
  }
});


// --- ЗАПУСК СЕРВЕРА ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("✅ Сервер запущен на порту " + PORT));






//==============================================================================================


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

// app.get("/api/forecast", async (req, res) => {
//   const { lat, lon } = req.query;

//   if (!lat || !lon) {
//     return res.status(400).json({ error: "lat и lon обязательны" });
//   }

//   try {
//     const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,weather_code,precipitation_sum,winddirection_10m_dominant,apparent_temperature_max,apparent_temperature_min,pressure_msl_mean&hourly=temperature_2m,weather_code,precipitation,wind_speed_10m&current=temperature_2m,apparent_temperature,weather_code,cloud_cover,wind_speed_10m,pressure_msl,relative_humidity_2m&timezone=auto&forecast_days=14&wind_speed_unit=ms`;

//     const response = await fetch(url);
//     const data = await response.json();

//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Ошибка при получении прогноза" });
//   }
// });

// app.get("/api/random-pic", async (req, res) => {
//   const { descr } = req.query;

//   if (!descr) {
//     return res.status(400).json({ error: "Описание (descr) обязательно" });
//   }

//   try {
//     const apiKey = process.env.UNSPLASH_API_KEY;

//     const url = `https://api.unsplash.com/photos/random?query=${descr}&orientation=portrait&client_id=${apiKey}`;

//     const response = await fetch(url);
//     const data = await response.json();

//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Ошибка получения изображения" });
//   }
// });

// app.get("/api/random-pics", async (req, res) => {
//   try {
//     const apiKey = process.env.UNSPLASH_API_KEY;

//     const url = `https://api.unsplash.com/photos/random?count=14&query=macro+nature&orientation=portrait&client_id=${apiKey}`;

//     const response = await fetch(url);
//     let data = await response.json();

//     // Если вернулся один объект, оборачиваем в массив
//     if (!Array.isArray(data)) {
//       data = [data];
//     }

//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Ошибка получения списка фото" });
//   }
// });

//  app.listen(PORT, () => console.log(`✅ Сервер запущен на http://localhost:${PORT}`));