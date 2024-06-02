const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// add a friend to user's friend list
router.post('/:userId/friends/:friendId', async (req,res) => {
    try {
        // finds user
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: 'No user found'});
        // finds friend
        const friend = await User.findById(req.params.friendId);
        if (!friend) return res.status(404).json({ message: 'No friend found'});
        // checks if friend exists when trying to add
        if (user.friends.includes(req.params.friendId)) {
            return res.status(400).json({ message: 'You are already friends'})
        }
        user.friends.push(req.params.friendId)
        //saves and updates user info
        await user.save();
        res.status(200).json(user)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// deletes a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req,res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ messenger: 'No user found' })
        // checks if friend exists
    const friendIndex = user.friends.indexOf(req.params.friendId);
    if (friendIndex === -1) {
        return res.status(404).json({ message: 'Friend does not exist in list'})
    }
    user.friends.splice(friendIndex, 1);
    await user.save();
    res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router;