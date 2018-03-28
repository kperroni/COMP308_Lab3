var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema   = mongoose.Schema;

var studentSchema = new Schema({
	'studentNumber' : {
		type:Number,
		unique:true,
		required:'Student number is required',
		trim:true
	},
	'password' : {
		type:String,
		validate: [function(passoword){
			return password && password.length > 6; 
		}, 'Password should be longer']
	},
	'salt':{
		type:String
	},
	'provider':{
		type:String,
		required:'Provider is required'
	},
	'providerId':String,
	'providerData':{},
	'firstName' : String,
	'lastName' : String,
	'address' : String,
	'city' : String,
	'phoneNumber' : Number,
	'email' : {
		type:String,
		match: [/.+\@.+\..+/, "Please fill a valid e-mail address"] 
	},
	'semester' : Number,
	'course':{
		type:Schema.Types.ObjectId,
		ref:'Course'
	}
});

studentSchema.virtual('fullName').get(function(){
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName){
	const splitName = fullName.splitName(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[splitName.length -1] || '';
})

studentSchema.pre('save', function(next){
	if (this.password){
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.passoword);
	}
	next();
});

studentSchema.methods.hashPassword = function(passoword){
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
}

studentSchema.methods.authenticate = function(password){
	return this.password === this.hashPassword(password);
}

module.exports = mongoose.model('Student', studentSchema);
