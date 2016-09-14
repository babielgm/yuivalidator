/**
 * Created by g.meyer on 14.09.2016.
 */

module.exports = function(grunt) {

    'use strict';

    var compressor = require('yuicompressor');


    grunt.registerMultiTask("yuivalidator", "", function () {
        var done = this.async();


        this.files.forEach(function (config) {

            // Warn if source files aren't found
            config.orig.src.forEach(function (src) {
                if (src[0] === '!') { // Exclusion glob
                    return;
                }

                var opts = {};

                if (config.orig.cwd) {
                    opts.cwd = config.orig.cwd;
                }

                var srcs = grunt.file.expand(opts, src);

                if (!srcs.length) {
                    grunt.log.warn('Source file(s) not found', src);
                }
            });

            var srcLength = config.src.length;
            var checkCount = 0;
            var hasError = false;

            config.src.forEach(function (src) {

                compressor.compress(src, {
                    //Compressor Options:
                    charset: 'utf8',
                    type: 'js',
                    nomunge: true,
                    'line-break': 80
                }, function (err, data, extra) {
                    grunt.log.writeln('Checked file', src['cyan']);
                    if (err == null) {
                        grunt.log.ok("no error");
                    } else {
                        grunt.log.error("Error in file ", src['red']);
                        grunt.log.write(err);
                        hasError = true;
                    }

                    grunt.log.writeln("--------------");
                    checkCount++;
                    if (checkCount >= srcLength) {
                        if (hasError) {
                            throw "Please correct your JS file before continue";
                        }
                        done();
                    }

                    //err   If compressor encounters an error, it's stderr will be here
                    //data  The compressed string, you write it out where you want it
                    //extra The stderr (warnings are printed here in case you want to echo them
                });


            });
        });

    });
};