const cards = require("./routes/cards");
const lists = require("./routes/lists");
const boards = require("./routes/boards");
const login = require("./routes/login");
const signups = require("./routes/signups");
const cors = require("cors"); // Fetch data
const morgan = require("morgan"); // With Morgan every request send to the server will le logged !
const helmet = require("helmet");
// Validate datas.
// const Joi = require("joi");
const express = require("express");
const session = require("express-session");
const app = express();
const mongoose = require("mongoose");

// Middleware Functions

app.use(
    session({
        secret: 'this is secret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/cards", cards);
app.use("/api/lists", lists);
app.use("/api/boards", boards);
app.use("/api/login", login);
app.use("/api/signups", signups);

// Environment
// TERMINAL: export NODE_ENV=ENVIRONMENT
// console.log(`NODE_ENV: ${process.env.Monokai-EasyNODE_ENV}`);
// console.log(`APP: ${app.get('env')}`);
if (app.get("env") === "development") {
    app.use(morgan("tiny")); // tiny -> A nice format of logged http requests.
    console.log("Morgan enabled...");
}

// Hello, world.
app.get("/", (req, res) => {
    res.send("Hello, world.");
});

// Connect to MongoDB
mongoose
    .connect("mongodb://localhost/MyTaskManager-backend")
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDB...", err));

// PORT
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
