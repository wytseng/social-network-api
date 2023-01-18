const router = require('express').Router();
const { User, Thought } = require('../models');

router.get('/', async (req, res) => {
  try {
    const userData = await User.find({}).select('-__v');
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findById(req.params.id).select('-__v').populate("thoughts friends");
    if (!userData) {
      res.json("User with given id does not exist.");
    } else {
      res.json(userData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.sendStatus(200);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.findById(req.params.id);
    if (userData.thoughts.length > 0) {
      await Thought.deleteMany({username: userData.username});
    }
    await User.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch(err) {
    res.status(400).json(err);
  }
});

module.exports = router;