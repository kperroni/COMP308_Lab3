const Task = require('mongoose').model('Task');
const moment = require('moment');

exports.createTask = function(req, res, next){

    let task = new Task(req.body);        
   
    task.save(function(err){
        if (err) return next(err);
        else res.json(task);
    });
}

exports.editTask = function(req, res, next){
    
    console.log(req.params);
    console.log(req.body);

    let taskIndex = req.body.taskId.indexOf(req.params.taskId);

    let task  = {
        taskId: req.body.taskId[taskIndex],
        taskName: req.body.taskName[taskIndex],
        taskDescription: req.body.taskDescription[taskIndex],
        startDate: req.body.startDate[taskIndex],
        endDate: req.body.endDate[taskIndex],
        owner: req.body.owner[taskIndex]
    }

    Task.findOneAndUpdate({ taskId:req.body.taskId[taskIndex] }, task , function(err, task){
        if (err) return next(err);
        else res.redirect("/list_tasks");
    });
}

exports.delete = function(req, res, next){

    Task.findOneAndRemove({taskId:req.params.taskId}, function(err, task){
        if (err) return res.status(500).send(err);
        else res.redirect("/list_tasks");
    });
}

exports.readTasks = function(req, res, next){
    console.log('in readTasks');

    Task.find({}, function(err, tasks){
        if (err) {
            console.log(err);
            return next(err);
        } else {
            res.render('tasks', {
                title: 'Tasks', 
                tasks:tasks,
                moment:moment
            })
        }
    })
}