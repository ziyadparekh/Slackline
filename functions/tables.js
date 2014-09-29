"use strict";

var connection = require("../modules/connection");
var categories;

categories = function () {
    return 'CREATE TABLE categories' +
                 '(id int(11),' +
                 'name varchar(256),' +
                 'color varchar(6),' +
                 'text_color varchar(6),' +
                 'slug varchar(256),' +
                 'topic_count int(11),' +
                 'description varchar(256));';
};

connection.query(categories());
