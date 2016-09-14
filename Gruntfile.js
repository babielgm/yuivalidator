/**
 * Created by g.meyer on 14.09.2016.
 */
module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({
        "yuivalidator" : {
            "shouldRun" : {
                "src" : "testfiles/ShouldRun.js"
            },
            "shouldThrowError" : {
                "src" : "testfiles/ShouldThrowError.js"
            },
            "shouldMixedValues" : {
                "src" : "testfiles/*.js"
            }
        }
    });
    grunt.loadTasks('tasks');
};