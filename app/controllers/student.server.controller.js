// Load the module dependencies
const studentModel = require('mongoose').model('Student');
const passport = require('passport');

module.exports = {

    /**
     * studentController.list()
     */
    list: function (req, res) {
        studentModel.find(function (err, students) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting student.',
                    error: err
                });
            }
            return res.json(students);
        });
    },

    /**
     * studentController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        studentModel.findOne({ _id: id }, function (err, student) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting student.',
                    error: err
                });
            }
            if (!student) {
                return res.status(404).json({
                    message: 'No such student'
                });
            }
            return res.json(student);
        });
    },

    /**
     * studentController.create()
     */
    create: function (req, res) {
        var student = new studentModel({
            studentNumber: req.body.studentNumber,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            city: req.body.city,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            semester: req.body.semester

        });

        student.save(function (err, student) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating student',
                    error: err
                });
            }
            return res.status(201).json(student._id);
        });
    },

    /**
     * studentController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        studentModel.findOne({ _id: id }, function (err, student) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting student',
                    error: err
                });
            }
            if (!student) {
                return res.status(404).json({
                    message: 'No such student'
                });
            }
            student.studentNumber = req.body.studentNumber ? req.body.studentNumber : student.studentNumber;   
            student.password = req.body.password ? req.body.password : student.password;        
            student.firstName = req.body.firstName ? req.body.firstName : student.firstName;
            student.lastName = req.body.lastName ? req.body.lastName : student.lastName;
            student.address = req.body.address ? req.body.address : student.address;
            student.city = req.body.city ? req.body.city : student.city;
            student.phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : student.phoneNumber;
            student.email = req.body.email ? req.body.email : student.email;
            student.semester = req.body.semester ? req.body.semester : student.semester;
            student.courses = req.body.courses ? req.body.courses : student.courses;            

            student.save(function (err, student) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating student.',
                        error: err
                    });
                }

                return res.json(student._id);
            });
        });
    },

    /**
     * studentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        studentModel.findByIdAndRemove(id, function (err, student) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the student.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },

    listCoursesByStudent : function(req, res){
        var id = req.params.id;       
        studentModel.find({ _id: id }, function (err, student) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting student',
                    error: err
                });
            }
            if (!student) {
                return res.status(404).json({
                    message: 'No such student'
                });
            }
            return student.courses;
        });

    },

    getErrorMessage: function (err) {
        // Define the error message variable
        var message = '';

        // If an internal MongoDB error occurs get the error message
        if (err.code) {
            switch (err.code) {
                // If a unique index error occurs set the message error
                case 11000:
                case 11001:
                    message = 'Student already exists';
                    break;
                // If a general error occurs set the message error
                default:
                    message = 'Something went wrong';
            }
        } else {
            // Grab the first error message from a list of possible errors
            for (const errName in err.errors) {
                if (err.errors[errName].message) message = err.errors[errName].message;
            }
        }

        // Return the message error
        return message;
    },

    signin: function (req, res, next) {        
        passport.authenticate('local', (err, user, info) => {           
            if (err || !user) {
                res.status(400).send(info);
            } else {
                // Remove sensitive data before login
                user.password = undefined;
                user.salt = undefined;

                // Use the Passport 'login' method to login
                req.login(user, (err) => {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.json(user);
                    }
                });
            }
        })(req, res, next);
    },

    signup: function (req, res) {
        console.log(req.body);
        const user = new studentModel(req.body);
        user.provider = 'local';

        // Try saving the User
        user.save((err) => {
            if (err) {
                console.log(err);
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                // Remove sensitive data before login
                user.password = undefined;
                user.salt = undefined;

                // Login the user
                req.login(user, function (err) {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.json(user);
                    }
                });
            }
        });
    }, 

    saveOAuthUserProfile: function (req, profile, done) {
        // Try finding a user document that was registered using the current OAuth provider
        Student.findOne({
            provider: profile.provider,
            providerId: profile.providerId
        }, (err, user) => {
            // If an error occurs continue to the next middleware
            if (err) {
                return done(err);
            } else {
                // If a user could not be found, create a new user, otherwise, continue to the next middleware
                if (!user) {

                    user = new Student(profile);
                    user.save(function (err) {
                        return done(err, user);
                    });


                    //// Find a unique available username
                    //User.findUniqueUsername(possibleUsername, null, (availableUsername) => {
                    //    // Set the available user name 
                    //    profile.username = availableUsername;

                    //    // Create the user
                    //    user = new User(profile);

                    //    // Try saving the new user document
                    //    user.save(function (err) {
                    //        // Continue to the next middleware
                    //        return done(err, user);
                    //    });
                    //});
                } else {
                    // Continue to the next middleware
                    return done(err, user);
                }
            }
        });
    }, 

    signout: function (req, res) {
        // Use the Passport 'logout' method to logout
        req.logout();

        // Redirect the user back to the main application page
        res.redirect('/');
    },

    requiresLogin: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return res.status(401).send({
                message: 'Student is not logged in'
            });
        }
        next();
    }

};