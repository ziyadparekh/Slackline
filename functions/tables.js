"use strict";

var connection = require("../modules/connection");
var users;

users = function () {
    return 'CREATE TABLE users' +
                 '(id int(11) PRIMARY KEY AUTO_INCREMENT,' +
                 'name varchar(256),' +
                 'facebook_id bigint(20),' +
                 'email varchar(256),' +
                 'image varchar(256),' +
                 'verified tinyint(1),' +
                 'bio longtext,' +
                 'date_created date,' +
                 'last_seen date);';
};

connection.query(users());
