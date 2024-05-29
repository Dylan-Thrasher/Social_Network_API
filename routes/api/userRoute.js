const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// gets all users
router.get('/', async (req,res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//  gets single user by id and shows thought/friend data
router.get('/:id', async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        .populate('thoughts')
        .populate('friends')
    if (!user) return res.status(404).json({ message: 'User does not exist'})
    res.json(user)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// posts a new user
router.post('/', async (req,res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
});

//  updates a new user
router.put('/:id', async (req,res) => {
try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User does not exist" })
    if (req.body.username != null) {
        user.username = req.body.username
    }
    if (req.body.email != null) {
        user.email = req.body.email
    }
    const updatedUser = await user.save();
    res.json(updatedUser)
} catch (err) {
    res.status(400).json({ message: err.message })
}
});

// deletes a user by id
router.delete('/:id', async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ message: "User does not exist" })
        await user.deleteOne();
    res.json({ message: "User deleted successfully"})
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router;