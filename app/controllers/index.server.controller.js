exports.render = function(req, res){
    res.render('index', {
        title: 'Sample Test'
    });
}

exports.renderAdd = function(req, res){
    res.render('add_task', {
        title:'Add New Task', 
        task:{}
    });
}