var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
    'studentNumber': {
        type: Number,
        unique: true,
        required: 'Student number is required',
        trim: true
    },
    'password': {
        type: String,
        required: 'Password is required',
        // Validate the 'password' value length
        validate: [
            (password) => password && password.length > 6,
            'Password should be longer'
        ]
    },
    'salt': {
        type: String
    },
    'provider': {
        type: String,
        required: 'Provider is required'
    },
    'providerId': String,
    'providerData': {},
    'firstName': String,
    'lastName': String,
    'address': String,
    'city': String,
    'phoneNumber': Number,
    'email': {
        type: String,
        match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
    },
    'semester': Number,
    'courses': [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

studentSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
}).set(function (fullName) {
    const splitName = fullName.splitName(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[splitName.length - 1] || '';
})

studentSchema.pre('save', function (next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);

    }
    next();
});

studentSchema.methods.hashPassword = function (password) {
    console.log(crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex'))
    return crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');

};

studentSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

studentSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

module.exports = mongoose.model('Student', studentSchema);
