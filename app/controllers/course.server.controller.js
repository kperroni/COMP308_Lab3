var courseModel = require('../models/course.server.model');

/**
 * courseController.js
 *
 * @description :: Server-side logic for managing courses.
 */
module.exports = {

    /**
     * courseController.list()
     */
    list: function (req, res) {
        courseModel.find(function (err, courses) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting course.',
                    error: err
                });
            }
            return res.json(courses);
        });
    },

    /**
     * courseController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        courseModel.findOne({_id: id}, function (err, course) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting course.',
                    error: err
                });
            }
            if (!course) {
                return res.status(404).json({
                    message: 'No such course'
                });
            }
            return res.json(course);
        });
    },

    /**
     * courseController.create()
     */
    create: function (req, res) {
        var course = new courseModel({
			courseCode : req.body.courseCode,
			courseName : req.body.courseName,
			section : req.body.section,
			semester : req.body.semester

        });

        console.log(req.body);

        course.save(function (err, course) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating course',
                    error: err
                });
            }
            return res.status(201).json(course);
        });
    },

    /**
     * courseController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        courseModel.findOne({_id: id}, function (err, course) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting course',
                    error: err
                });
            }
            if (!course) {
                return res.status(404).json({
                    message: 'No such course'
                });
            }

            course.courseCode = req.body.courseCode ? req.body.courseCode : course.courseCode;
			course.courseName = req.body.courseName ? req.body.courseName : course.courseName;
			course.section = req.body.section ? req.body.section : course.section;
			course.semester = req.body.semester ? req.body.semester : course.semester;
			
            course.save(function (err, course) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating course.',
                        error: err
                    });
                }

                return res.json(course);
            });
        });
    },

    /**
     * courseController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        courseModel.findByIdAndRemove(id, function (err, course) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the course.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
