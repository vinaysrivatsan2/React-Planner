const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://127.0.0.1:27017/todos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', function () {
  console.log('DB');
});

todoRoutes.route('/').get(function (req, res) {
  Todo.find(function (err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});
todoRoutes.route('/:id').get(function (req, res) {
  let id = req.params.id;
  Todo.findById(id, function (err, todo) {
    res.json(todo);
  });
});

todoRoutes.route('/add').post(function (req, res) {
  let todo = new Todo(req.body);
  todo
    .save()
    .then((todo) => {
      res.status(200).json({ todo: 'todo added successfully' });
    })
    .catch((error) => {
      res.status(400).send('failed');
    });
});
todoRoutes.route('/update/:id').post(function (req, res) {
  Todo.findById(req.params.id, function (err, todo) {
    if (!todo) {
      res.status(404).send('data is not found');
    } else todo.todo_description = req.body.todo_description;
    todo.todo_responsible = req.body.todo_responsible;
    todo.todo_priority = req.body.todo_priority;
    todo.todo_completed = req.body.todo_completed;

    todo
      .save()
      .then((todo) => {
        res.json('Todo updated');
      })
      .catch((err) => {
        res.status(400).send('not possible');
      });
  });
});

// todoRoutes.route('/delete/:id').delete(function (req, res) {
//   let id = req.params.id;
//   Todo.findById(id, function (err, todo) {
//     Todo.findByIdAndDelete(todo.id);
//     Todo.save().then((todo) => {
//       res.json('Todo deleted').catch((err) => {
//         res.status(400).send('not possible');
//       });
//     });
//   });
// });
todoRoutes.route('/delete1/:id').delete(function (req, res) {
  Todo.findByIdAndDelete(req.params.id, function (err, todo) {
    try {
      if (!todo) {
        return res.status(404).send('data is not found');
      }
      res.json('Todo deleted');
    } catch (err) {
      console.error(err.message);
      res.status(404).send('server error');
    }
  });
});

app.use('/todos', todoRoutes);
app.listen(PORT, function () {
  console.log('Server is running:' + PORT);
});
