const mongoose = require('mongoose');


var TaskSchema = new mongoose.Schema({
    taskId:{
        type: String,
        unique:true,
        required:true
    },
    taskName: String,
    taskDescription: String,
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default:Date.now
    },
    owner: String
});


mongoose.model('Task', TaskSchema);