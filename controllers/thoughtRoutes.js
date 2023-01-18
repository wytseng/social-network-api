const router = require('express').Router();
const { User, Thought } = require('../models');

// Thought CRUD methods

router.get('/', async (req, res) => {
  try {
    const thoughtsData = await Thought.find({}).select('-__v')
    res.json(thoughtsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const thoughtData = await Thought.findById(req.params.id).select('-__v').populate('reactions');
    if (!thoughtData) {
      return res.status(404).json('Thought does not exist in database.');
    }
    res.json(thoughtData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    const userData = await User.findByIdAndUpdate(req.body.userId, { $addToSet: { thoughts: newThought._id}}, { new:true });
    if (!userData) {
      return res.status(204).json("Thought created, but associated user was not found, therefore ownership not defined.");
    } 
    res.json(newThought);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const thoughtData = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!thoughtData) {
      return res.status(404).json("Thought does not exist in database.");
    }
    res.sendStatus(200);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const thoughtData = await Thought.findByIdAndDelete(req.params.id);
    if (!thoughtData) {
      return res.status(404).json("Thought does not exist in database.");
    }
    await User.findOneAndUpdate({ username: thoughtData.username }, { $pull: { thoughts:  thoughtData._id }}, { new:true });
    res.sendStatus(200);
  } catch(err) {
    res.status(400).json(err);
  }
});

// Add/Remove Reactions

router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const thoughtData = await Thought.findByIdAndUpdate(req.params.thoughtId, { $addToSet: { reactions: req.body }}, { new: true, runValidators: true });
    if (!thoughtData) {
      return res.status(404).json("Thought does not exist in database.");
    }
    res.status(200).json(thoughtData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thoughtData = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId }}}, { new: true });
    if (!thoughtData) {
      return res.status(404).json("Thought does not exist in database.");
    }
    res.status(200).json("Thought deleted.");
  } catch(err) { 
    res.status(500).json(err);
  }
})

module.exports = router;