const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  cors = require("cors");
let Todos = require("./model/todo");

const app = express();

const PORT = process.env.PORT || 5000;

const url_db =
  "mongodb+srv://<username>:<password>@nodecon.in62z.mongodb.net/<dbname>?retryWrites=true&w=majority";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(url_db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("database connection successfully!!!");
});

app.get("/todos", (req, res) => {
  Todos.find()
    .then((todo) => res.json(todo))
    .catch((err) => res.status(400).json(`Hata = ${err}`));
});

app.post("/todos/add", (req, res) => {
  const newTodo = new Todos({});
  newTodo.todo = req.body.todo;
  newTodo.save((err, prod) => {
    if (err) console.log(err);
    console.log(prod);
  });
});

app.delete("/:id", (req, res) => {
  Todos.findByIdAndDelete(req.params.id)
    .then(() => res.json("Todo DELETE"))
    .catch((err) => res.status(400).json(`Error=${err}`));
});

app.listen(PORT, () => {
  console.log(`your app work in localhost:${PORT}`);
});
