const express = require("express");
const auth = require("../middleware/auth");
const Todo = require("../model/todo");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const todo = new Todo({
      ...req.body,
      owner: req.user._id,
    });
    await todo.save();
    res.status(201).send(todo);
  } catch (e) {
    res.status(401).send(e);
  }
});

router.get("/:userId", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ owner: req.params.userId });
    res.send(todos);
  } catch (e) {
    res.status(401).send(e);
  }
});

router.patch("/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "status", "tags"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(404).send("Error : Invalid updates");
  }

  try {
    req.body.updatedAt = Date.now();

    const todo = await Todo.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!todo) {
      return res.status(404).send();
    }

    updates.forEach((update) => (todo[update] = req.body[update]));
    await todo.save;
    res.status(201).send(`Todo was edited Successfully ,  ${todo}`);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!todo) {
      res.status(404).send();
    }
    res.send(`Todo deleted Successfully ,  ${todo}`);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
