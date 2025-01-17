const express = require("express");
const app = express();
const port = 3000;
const { addUser, authenticateUser } = require("./database/services");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", (req, res) => {
  const { email, password } = req.body;
  addUser(email, password);
  return res.redirect("/signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const auth = authenticateUser(email, password);

  if (await auth) {
    return res.redirect("/dashboard");
  }
  return res.redirect("/login");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
