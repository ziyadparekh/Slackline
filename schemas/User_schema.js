var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/Slackline");
var Schema = mongoose.Schema;

autoIncrement.initialize(connection);

var UserSchema = new Schema({
    id: Number,
    username: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    avatar_template: String,
    name: String,
    email: String,
    last_posted_at: Date,
    last_seen_at: Date,
    created_at: Date,
    can_send_private_message_to_user: Boolean,
    moderator: Boolean,
    admin: Boolean,
    can_edit: Boolean
});

UserSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'id',
    startAt: 1
});

var user = connection.model('User', UserSchema);
