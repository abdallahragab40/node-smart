const fs = require("fs");
const chalk = require("chalk");

const addTodo = (title, body) => {
  const todos = loadTodos();
  const duplicate = todos.find((todo) => todo.title === title);
  if (duplicate)
    return console.log(chalk.white.bgRed.bold("Todo already exists"));

  todos.push({
    title,
    body,
    id: Math.floor(Math.random() * 100), //Date.now()
    status: "to-do",
  });
  saveTodo(todos);
  console.log(chalk.white.bgBlue.bold("New todo added!"));
};

const listTodo = (stat) => {
  const todos = loadTodos();
  const isFound = todos.find((todo) => todo.status === stat);
  if (isFound) {
    for (var i in todos) {
      if (todos[i].status === stat) {
        console.table(todos[i]);
        break;
      }
    }
  } else {
    console.table(todos);
  }
};

const displayTodo = () => {
  const todos = loadTodos();

  return todos
    .map((element) => {
      let items = `
    <p>Title : ${element.title}</p>
    <p>Body : ${element.body}</p>
    <p>Status : ${element.status}</p>
    `;
      return items;
    })
    .join("<hr />");
};

const editTodo = (title, newTitle, stat) => {
  const todos = loadTodos();
  const founded = todos.find((todo) => todo.title === title);
  if (founded) {
    for (var i in todos) {
      if (todos[i].title == title) {
        todos[i].title = newTitle;
        todos[i].status = stat;
        break;
      }
    }
    saveTodo(todos);
    console.log(chalk.white.bgBlue.bold("Todo edited successfully"));
  } else {
    console.log(chalk.white.bgRed.bold("Todo not founded"));
  }
};

const deleteTodo = (title) => {
  const todos = loadTodos();
  const filtered = todos.filter((todo) => todo.title !== title);

  if (todos.length > filtered.length) {
    saveTodo(filtered);
    console.log(chalk.white.bgBlue.bold("Todo deleted successfully"));
  } else {
    console.log(chalk.white.bgRed.bold("Todo not founded"));
  }
};

const loadTodos = () => {
  const dataBuffer = fs.readFileSync("todo.json");
  const dataJson = dataBuffer.toString() || [];
  return JSON.parse(dataJson);
};

const saveTodo = (todos) => {
  const dataJson = JSON.stringify(todos);
  fs.writeFileSync("todo.json", dataJson);
};

module.exports = { addTodo, listTodo, editTodo, deleteTodo, displayTodo };
