const express = require('express');
const router = express.Router();
const {Thought} = require('../../models/')

// adding new reaction in a thought's reactions array
router.post('/:thoughtId/reactions', async (req,res) => {
    try {
        const thought = await Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$addToSet: {reactions: req.body}}, {new: true})
        if (!thought) return res.status(404).json({ message: 'No thought found'});

        res.status(201).json(thought);
    } catch (err) {
        res.status(400).json({ message: err.message })

    }
})

// removes a reaction
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) return res.status(404).json({ message: 'No thought found' });
        const reaction = thought.reactions.find(
            reaction => reaction.reactionId.toString() === req.params.reactionId
        );
        if (!reaction) return res.status(404).json({ message: 'No reaction found' });
        thought.reactions.pull(reaction);
        const updatedThought = await thought.save();
        res.json(updatedThought)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router;