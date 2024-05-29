const router = require('express').Router();

const userRoute = require('./userRoute');
const friendsRoute = require('./friendsRoute');
const reactionRoute = require('./reactionRoute');
const thoughtsRoute = require('./thoughtsRoute');

router.use('/users', userRoute);
router.use('/friends', friendsRoute);
router.use('/reactions', reactionRoute);
router.use('/thoughts', thoughtsRoute);

module.exports = router;