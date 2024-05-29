const {Schema, Types} = require('mongoose');

// creating reaction model with specified guidelines
const reactionSchema = new Schema({
    reactionId: {
        type: Types.ObjectId,
        default: new Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new Date(timestamp).toISOString()
    }
}, {
    // converts to json
    toJSON: {
        // applies getters during conversion
        getter: true
    },
    id: false
});

module.exports = reactionSchema;