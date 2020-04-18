const express = require("express");
const path = require("path");
const todoList = require("./todoList");

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "./public");

app.use(express.static(publicPath));

// GET
app.get("/", (req, res) => {
  try {
    res.send("Home Page");
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await todoList.displayTodo();
    res.send(todos);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("*", (req, res) => {
  res.send("Error, this url is not found");
});

// POST
app.post("/todos", async (req, res) => {
  try {
    const { title, body, username } = req.body;
    const todo = await todoList.addTodo(title, body, username);
    res.status(201).send(req.body);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Enhancement

app.post("/register", async (req, res) => {
  const registeredUser = Object.keys(req.body);
  const allowedInserted = ["username", "password", "firstName"];
  const isValidRegister = registeredUser.every((insert) =>
    allowedInserted.includes(insert)
  );

  if (!isValidRegister) {
    return res.status(404).send("Error : Invalid Register");
  }
  try {
    const { username, password, firstName } = req.body;
    const user = await todoList.register(username, password, firstName);
    res.send("user was registered successfully.");
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await todoList.login(req.body.username);
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// DELETE
app.delete("/todos/:id", async (req, res) => {
  try {
    const todo = await todoList.deleteTodo(Number(req.params.id));
    res.send(todo);
  } catch (e) {
    res.status(400).send(e);
  }
});

// EDIT
app.patch("/todos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, status } = req.body;
    const todo = await todoList.editTodo(title, status, id);
    res.send(todo);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log("App is running in port " + port);
});
