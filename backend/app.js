// import modules

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

// app

const app = express();

// api

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_API_ORGANIZATION
});

const openai = new OpenAIApi(configuration);

// db

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB connection error", err));

// middleware

app.use(morgan("dev"));
app.use(cors());

// routes

//port

const port = process.env.PORT;

// listener

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
