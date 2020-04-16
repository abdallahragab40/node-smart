const fs = require("fs");

addTodo = (title, body) => {
  const todos = loadTodos();
  const duplicate = todos.find((todo) => todo.title === title);
  if (!duplicate) {
    todos.push({
      title,
      body,
      id: Math.floor(Math.random() * 100), //Date.now()
      status: "to-do",
    });
    saveTodo(todos);
    console.log("New todo added!");
  } else {
    console.log("Todo already exists");
  }
};

listTodo = (s) => {
  const todos = loadTodos();
  const founded = todos.find((todo) => todo.status === s);
  if (founded) {
    for (var i in todos) {
      if (todos[i].status === s) {
        console.table(todos[i]);
        break;
      }
    }
  } else {
    console.table(todos);
  }
};

editTodo = (title, newTitle, stat) => {
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
    console.log("Todo edited successfully");
  } else {
    console.log("Todo not founded");
  }
};

deleteTodo = (title) => {
  const todos = loadTodos();
  const filtered = todos.filter((todo) => todo.title !== title);

  if (todos.length > filtered.length) {
    saveTodo(filtered);
    console.log("Todo deleted successfully");
  } else {
    console.log("Todo not founded");
  }
};

loadTodos = () => {
  try {
    const dataBuffer = fs.readFileSync("todo.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    return [];
  }
};

saveTodo = (todos) => {
  const dataJson = JSON.stringify(todos);
  fs.writeFileSync("todo.json", dataJson);
};

module.exports = { addTodo, listTodo, editTodo, deleteTodo };
