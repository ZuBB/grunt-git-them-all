/*
 * grunt-gta
 * https://github.com/ZuBB/grunt-gta
 *
 * Copyright (c) 2014 Vasyl Zuzyak
 * Licensed under the MIT license.
 */

'use strict';
var exec = require('child_process').exec;

module.exports = function(grunt) {
    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    grunt.registerMultiTask('gta', 'All Git commands for grunt', function() {

        var cb = this.async();
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            cwd: process.cwd(),
            command: null,

            punctuation: '.',
            separator: ', ',

            stdout: false,
            stderr: false,

            failOnError: true
        });

        var cmd = this.data.command;

        if (typeof cmd !== 'string') {
            throw new Error('`command` required');
        }

        cmd = 'git ' + cmd;

        grunt.verbose.writeln('Command:', cmd);

        var cp = exec(cmd, {cwd: options.cwd}, function (error) {
            if (error && options.failOnError) {
                grunt.warn(error);
            }

            cb();
        }.bind(this));

        var captureOutput = function (child, output) {
            child.pipe(output);
        };

        if (options.stdout || grunt.option('verbose')) {
            captureOutput(cp.stdout, process.stdout);
        }

        if (options.stderr || grunt.option('verbose')) {
            captureOutput(cp.stderr, process.stderr);
        }
    });
};
