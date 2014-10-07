//Module dependencies
var pjson = require('../package.json');

exports.index = function(req, res){
    if(req)
        var user = JSON.stringify(req.user);
    var url = "http://localhost:3010";
    res.render('slackline',{url:url, user: user});
};

exports.login = function(req, res){
    var url = "http://localhost:3010";
    res.render('login', {url: url});
}
exports.logout = function(req, res){
    if(req && req.user && req.user.id){
        req.session.destroy();
        res.redirect('/login');
    }else
    res.redirect('/login');
};

exports.status = function(req, res){
    res.send({meta: 200,
        response: {
            name: process.env.DB_NAME+"-web",
            status: "ok",
            message: "All systems go!",
            version: pjson.version,
        },
        error: null
    });
};
