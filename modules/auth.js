/**
 * Module dependencies.
 */
 var passport = require('passport');
 var LocalStrategy    = require('passport-local').Strategy;
 var FacebookStrategy = require('passport-facebook').Strategy;
 var db = require('../db');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});


passport.use(
new FacebookStrategy({
    clientID: '269130943267557',
    clientSecret: 'd9e472afd49094fd954070fce47e0ee8',
    callbackURL: process.env.LOCAL+"/auth/facebook/callback",
    passReqToCallback: true
},
function(req, accessToken, refreshToken, profile, done) {
    var profile = profile._json;
    if(req){
        db.users.findByFacebookId(profile.id, req, function(exists, user){
            if(exists){
                return done(null, user);
            }else{
                console.log("need to create a new user");
                var send = {
                    name: profile.name,
                    email: profile.email ? profile.email : "",
                    image: 'http://graph.facebook.com/'+profile.id+'/picture?width=640&height=640',
                    facebook_id: profile.id,
                    verified: profile.verified ? 1 : 0,
                    bio: ""
                };
                db.users.create(send, req, function(err, user){
                    if(err)
                        console.log(err);
                    //console.log(user);
                    return done(null, user);
                });
            }
        });
    }
}));
