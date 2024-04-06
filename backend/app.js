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

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
//   organization: process.env.OPENAI_API_ORGANIZATION,
// });

// const openai = new OpenAIApi(configuration);


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
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  }),
);

app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.get("/login", (req, res) => {
  if(req.isAuthenticated()){
    res.json({ message: "Success" });
  }else{
    res.json({ message: "Failed" });
  }
});


app.get("/logout", (req,res) =>{
  try {
    res.clearCookie("connect.sid");
    res.redirect("/");
  } catch (error) { // Make sure the variable name matches here
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
