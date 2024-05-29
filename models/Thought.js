const {Schema, model} = require('mongoose');

const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new Date(timestamp).toISOString()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema],
},
// including virtuals and getters for output
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        toObject: {
            virtuals: true,
            getters: true 
        },
        id: false
    });

    //created virtual called reaction count to retrieve length of thought's reactions array on query
    thoughtSchema.virtual('reactionCount').get(function () {
        return this.reactions.length;
    });

    const Thought = model('Thought', thoughtSchema);

    module.exports = Thought;