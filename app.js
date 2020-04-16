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
  },
  handler(argv) {
    todoList.addTodo(argv.title, argv.body);
  },
});

// List Command
yargs.command({
  command: "list",
  describe: "list all todos",
  builder: {
    s: {
      describe: "status of todos",
      demandOption: false,
      type: "string",
    },
  },
  handler(argv) {
    todoList.listTodo(argv.s);
  },
});

// Edit Command
yargs.command({
  command: "edit",
  describe: "edit todo",
  builder: {
    title: {
      describe: "title of edit todo",
      demandOption: true,
      type: "string",
    },
    newTitle: {
      describe: "new title",
      demandOption: true,
      type: "string",
    },
    id: {
      describe: "id of todo",
      demandOption: false,
      type: "number",
    },
    stat: {
      describe: "status of todo",
      demandOption: false,
      type: "string",
    },
  },
  handler(argv) {
    todoList.editTodo(argv.title, argv.newTitle, argv.stat);
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

yargs.default("random", function randomValue() {
  return Math.random() * 256;
}).argv;

yargs.parse();
