const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
require("dotenv").config();

const app = express();

const { router } = require("./booksRouter");

const PORT = process.env.PORT || 8081;
const thirdPartyBaseUrl = "http://api.weatherbit.io/v2.0/current";
const thirdPartyApiKey = process.env.WEATHER_API_KEY;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("tiny"));

app.get("/api/weather", async (req, res) => {
  try {
    const responce = await axios.get(thirdPartyBaseUrl, {
      params: {
        key: thirdPartyApiKey,
        lat: "38.123",
        lon: "-78.543",
      },
    });
    const [weatherData] = responce.data.data;
    const {
      city_name,
      weather: { description },
      temp,
    } = weatherData;

    res.json({
      city_name,
      description,
      temp,
    });
    // res.json({ responce: responce.data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, (err) => {
  if (err) console.error("Error at server launch:", err);
  console.log(`Server works at port ${PORT}!`);
});
