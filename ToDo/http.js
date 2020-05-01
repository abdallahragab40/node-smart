const http = require("http");
const todoList = require("./todoList");
const fs = require("fs");

const port = process.env.PORT || 4410;

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
    case "/home":
      res.setHeader("Content-Type", "text/html");
      res.end(`
        <head>
          <link rel="stylesheet" href="/style.css"/>
        </head>
        <body>
          <h1> TO DO APPLICATION </h1>
          <a href="/nature">Nature</a>
          <a href="/quotes">Quotes</a>
          ${todoList.displayTodo()}
        </body>
        `);
      break;

    case "/style.css":
      res.setHeader("Content-Type", "text/css");
      res.end(`
        body {
          background-color : #f2f2f2
        }
        `);
      break;

    case "/nature":
      res.setHeader("Content-Type", "text/html");
      res.end(`
      <head>
          <link rel="stylesheet" href="/image.css"/>
      </head>
      <body>
        <h1>Nature Page</h1>
        <div>
          <a href="/">Back Home</a>
        </div>
        <img src="/nature1" />
        <img src="/nature2" />
      </body>
      `);
      break;

    case "/image.css":
      res.setHeader("Content-Type", "text/css");
      res.end(`
          img {
            width:500px;
            height: auto;
          }
          `);
      break;

    case "/nature1":
      res.setHeader("Content-Type", "image/jpeg");
      const natureImage1 = fs.readFileSync("./Nature/2-nature.jpg");
      res.end(natureImage1);
      break;

    case "/nature2":
      res.setHeader("Content-Type", "image/jpeg");
      const natureImage2 = fs.readFileSync("./Nature/foresttb-l.jpg");
      res.end(natureImage2);
      break;

    case "/quotes":
      res.setHeader("Content-Type", "text/html");
      res.end(`
      <head>
        <link rel="stylesheet" href="/image.css"/>
      </head>
      <body>
          <h1>Quotes Page</h1>
          <div>
            <a href="/">Back Home</a>
          </div>
          <img src="/quote1" />
          <img src="/quote2" />
      </body>
        `);
      break;

    case "/quote1":
      res.setHeader("Content-Type", "image/jpeg");
      const quoteImage1 = fs.readFileSync("./Quotes/Linus.jpg");
      res.end(quoteImage1);
      break;

    case "/quote2":
      res.setHeader("Content-Type", "image/jpeg");
      const quoteImage2 = fs.readFileSync("./Quotes/Think twice.jpg");
      res.end(quoteImage2);
      break;

    case "/favicon.ico":
      res.setHeader("Content-Type", "image/png");
      const favicon = fs.readFileSync("./favicon.png");
      res.end(favicon);
      break;

    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end("<h1>Error, the URL doesn't exist</h1>");
      break;
  }
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
