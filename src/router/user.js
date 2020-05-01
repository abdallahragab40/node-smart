const express = require("express");
const auth = require("../middleware/auth");
const User = require("../model/user");

const router = express.Router();

router.post("/register", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res
      .status(201)
      .send(`User was registered Successfully , ${user}, ${token}`);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(201).send(`User was Logged in Successfully, ${user} , ${token}`);
  } catch (e) {
    res.status(401).send(e);
  }
});

router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save;
    res.send("User was Logged out Successfully");
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/me", auth, (req, res) => {
  res.send(req.user);
});

// router.delete("/:id", async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       res.status(404).send();
//     }
//     res.send(`User deleted Successfully ,  ${user}`);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

router.delete("/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// router.patch("/:id", async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["username", "password", "firstname"];
//   const isValidUpdate = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );

//   if (!isValidUpdate) {
//     return res.status(404).send("Error : Invalid updates");
//   }

//   try {
//     const user = await User.findById(req.params.id);
//     updates.forEach((update) => (req.user[update] = req.body[update]));
//     await req.user.save();

//     res.status(201).send(`User was edited Successfully ,  ${user}`);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

router.patch("/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["username", "password", "firstname"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(404).send("Error : Invalid updates");
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.status(201).send(`User was edited Successfully ,  ${user}`);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
