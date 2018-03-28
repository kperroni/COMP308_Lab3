var studentModel = require('../models/student.server.model');

/**
 * studentController.js
 *
 * @description :: Server-side logic for managing students.
 */
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
        studentModel.findOne({_id: id}, function (err, student) {
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
			studentNumber : req.body.studentNumber,
			password : req.body.password,
			firstName : req.body.firstName,
			lastName : req.body.lastName,
			address : req.body.address,
			city : req.body.city,
			phoneNumber : req.body.phoneNumber,
			email : req.body.email,
			semester : req.body.semester

        });

        student.save(function (err, student) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating student',
                    error: err
                });
            }
            return res.status(201).json(student);
        });
    },

    /**
     * studentController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        studentModel.findOne({_id: id}, function (err, student) {
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
			
            student.save(function (err, student) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating student.',
                        error: err
                    });
                }

                return res.json(student);
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
    }
};
