const passport = require('passport');
const mongoose = require('mongoose');

module.exports = function() {
    const Student = mongoose.model('Student');
    
    passport.serializeUser(function(student, done) { 
        done(null, student.id );
    });
    
    passport.deserializeUser(function(id, done){
        Student.findOne({_id:id},'-passoword -salt', function(err, done){
            done(err, student);
        });
    });

    require('./strategies/local')();

}