const { Schema, Types, Model, model } = require('mongoose');

// creating userSchema based on requirements
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
        // match creeated based on mongoose's matching validation
    },
    thoughts: [
        {
            type: Types.ObjectId,
            ref: 'Thought'
            // references Thought model
        }
    ],
    friends: [
        {
            type: Types.ObjectId,
            ref: 'User'
        } // references user model
    ]
},
{
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

// created virtual called friend count to retrieve length of user's friend array on query
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = model('User', userSchema)

module.exports = User