const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Thought = require('../../models/Thought')

// retrieve all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// retrieves a single thought by id
router.get('/:id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) return res.status(404).json({ message: 'No thought found' })
        res.json(thought)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// Creates a new thought
router.post('/', async (req,res) => {
    const thought = new Thought({
        thoughtText: req.body.thoughtText,
        username: req.body.username,
        userId: req.body.userId
    })
    try {
        // saves and updates new thought
        const newThought = await thought.save();
        // associates thought to selected user
        const user = await User.findById(req.body.userId);
        // pushes the thought to user
        user.thoughts.push(newThought._id)
        // saves to user and updates
        await user.save();
        res.status(201).json(newThought);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// updates a specific thought
router.put('/:id', async (req,res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) return res.status(404).json({ message: 'No thought found'})
            if (req.body.thoughtText != null) {
                thought.thoughtText = req.body.thoughtText
            }
            // updates and saves thought
            const updatedThought = await thought.save();
            res.json(updatedThought);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// deletes a specific thought
router.delete('/:id', async (req,res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) return res.status(404).json({ message: 'No thought found' })
            await thought.deleteOne();

        // removes thought from user
        const user = await User.findById(thought.userId);
        if (user) {
            user.thoughts.pull(thought._id);
            // saves the removal
            await user.save();
        } res.json({ message: 'Thought has been deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});



module.exports = router;