const router = require('express').Router();
const { User, Thought } = require('../models');

// user CRUD methods

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
      res.status(404).json("User with given id does not exist.");
    }
    res.json(userData);
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
    const userData = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!userData) {
      res.status(404).json("User with given id does not exist.");
    }
    res.sendStatus(200);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.findByIdAndDelete(req.params.id);
    if (!userData) {
      res.status(404).json("User with given id does not exist.");
    }

    if (userData.thoughts.length > 0) {
      await Thought.deleteMany({username: userData.username});
    }
    res.sendStatus(200);
  } catch(err) {
    res.status(400).json(err);
  }
});

// Friending 

router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const userData = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId }}, { new:true });
    if (!userData) {
      res.status(404).json("User with given id does not exist.");
    }
    res.sendStatus(200);
  } catch (err) {
    res.json(400).json(err);
  }
});

router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const userData = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends:  req.params.friendId }}, { new:true });
    if (!userData) {
      res.status(404).json("User with given id does not exist.");
    }
  
    res.sendStatus(200);
  } catch(err) {
    res.status(400).json(err);
  }
});

module.exports = router;