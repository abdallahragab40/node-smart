const yargs = require("yargs");
const todoList = require("./todoList");

// Add Command
yargs.command({
  command: "add",
  describe: "Add new todo",
  builder: {
    title: {
      describe: "title of todo",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "body of todo",
      demandOption: true,
      type: "string",
    },
    username: {
      describe: "name of user",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    const { title, body, username } = argv;
    todoList.addTodo(title, body, username);
  },
});

// List Command
yargs.command({
  command: "list",
  describe: "list all todos",
  builder: {
    stat: {
      describe: "status of todos",
      demandOption: false,
      type: "string",
    },
  },
  handler(argv) {
    todoList.listTodo(argv.stat);
  },
});

// Edit Command
yargs.command({
  command: "edit",
  describe: "edit todo",
  builder: {
    title: {
      describe: "new title of todo",
      demandOption: true,
      type: "string",
    },

    status: {
      describe: "status of todo",
      demandOption: true,
      type: "string",
    },
    id: {
      describe: "status of todo",
      demandOption: false,
      type: "number",
    },
  },
  handler(argv) {
    todoList.editTodo(argv.title, argv.status, argv.id);
  },
});

// Delete Command
yargs.command({
  command: "delete",
  describe: "delete todo",
  builder: {
    title: {
      describe: "title of delete todo",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    todoList.deleteTodo(argv.title);
  },
});

// Register
yargs.command({
  command: "register",
  describe: "register user",
  builder: {
    username: {
      describe: "username of user",
      demandOption: true,
      type: "string",
    },
    password: {
      describe: "password of user",
      demandOption: true,
      type: "string",
    },
    firstName: {
      describe: "firstName of user",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    const { username, password, firstName } = argv;
    todoList.register(username, password, firstName);
  },
});

// Login
yargs.command({
  command: "login",
  describe: "login user",
  builder: {
    username: {
      describe: "username of user",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    todoList.login(argv.username);
  },
});

yargs.parse();
