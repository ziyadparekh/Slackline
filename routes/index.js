exports.index = function(req, res){
    if(req)
        var user = JSON.stringify(req.user);
    var url = "http://localhost:3010";
    res.render('slackline',{url:url, user: user});
}
