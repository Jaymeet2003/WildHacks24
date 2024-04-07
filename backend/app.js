// import modules

const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");

const userDB = require("./model/userSchema");

var GoogleStrategy = require("passport-google-oauth20").Strategy;

// app

const app = express();

// apis

const OpenAI = require("openai");
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// budgeting tip

app.get("/budgeting-tips", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content: "Provide one budgeting tip.",
        },
        {
          role: "user",
          content: "Provide one budgeting tip.",
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    try {
      res.json({ tips: response.choices[0].message.content });
    } catch (err) {
      console.log(err.data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

// quiz

function parseQuizTips(generatedContent) {
  try {
    const parts = generatedContent.split("\n\n");
    const question = parts[0];

    const options = parts
      .filter((line) => /^[A-D]\)/.test(line))
      .map((option) => option.trim());

    // Find the correct answer line; check if it's undefined before trimming
    const correctAnswerLine = parts.find(
      (part) => part && part.startsWith("Correct Answer:"),
    );
    // Safely extract the correct answer, checking for undefined
    const correctAnswer = correctAnswerLine
      ? correctAnswerLine.split(": ")[1]?.trim().charAt(0)
      : "";

    // Ensure the explanation index is valid and the line exists; otherwise, provide a default value
    const explanationIndex = parts.indexOf(correctAnswerLine) + 1;
    const explanation =
      parts.length > explanationIndex
        ? parts[explanationIndex].split(": ")[1]?.trim()
        : "";

    return {
      question,
      options,
      correctAnswer,
      explanation,
    };
  } catch (error) {
    console.error("Error parsing generated content:", error);
    return null;
  }
}

app.get("/quiz", async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content:
            "Create a multiple-choice question about basic financial literacy for young adults, including four options. Mark the correct answer and provide a brief explanation for why it's correct.",
        },
        {
          role: "user",
          content:
            "Create a multiple-choice question about basic financial literacy for young adults, including four options. Mark the correct answer and provide a brief explanation for why it's correct.",
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    try {
      const generatedContent = response.choices[0].message.content;

      const parsedData = parseQuizTips(generatedContent);
      // const parsedData = parseQuizTips(output.output);
      console.log(parsedData);

      res.json(parsedData);
    } catch (err) {
      console.log(err.data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

// session

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userDB.findOne({
          googleId: profile.id,
        });

        if (!user) {
          user = new userDB({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/login",
    failureRedirect: "/",
  }),
);

// db

require("./db/conn");

// middleware

app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.FRONTEND,
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  }),
);

app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.redirect(process.env.FRONTEND);
});

app.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect(`${process.env.FRONTEND}/Dash`);
  } else {
    res.redirect("/");
  }
});

app.get("/logout", (req, res) => {
  try {
    res.clearCookie("connect.sid");
    res.redirect("/");
  } catch (error) {
    // Make sure the variable name matches here
    console.error(error); // Corrected to match the catch parameter
    res.status(500).send("Internal server error");
  }
});

//port

const port = process.env.PORT;

// listener

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
