const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Student = require('mongoose').model('Student');

module.exports = function() {
    passport.use(new LocalStrategy(function(id, password, done){
        Student.findOne({_id:id}, (err,student) => {
            if (err){
                return done(err);
            } 
            
            if (!student){
                return done(null, false, {message:'Invalid student number or password'});
            }

            return done(null, student);
        });
    }));
}