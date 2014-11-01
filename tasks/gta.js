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
    grunt.registerMultiTask('gta', 'All Git commands for grunt', function() {
        var text = '';
        var done = this.async();
        var command = (this.data.command || '').toString().trim();
        var options = this.options({
            failOnError: true,

            stdout: false,
            stderr: false,

            storeOutputTo: null,
            postProcessOutput: function(text) { return text; },

            cwd: null
        });

        if (command.length < 1) {
            throw new Error('`command` required');
        }

        if (command.indexOf('git ') !== 0) {
            command = 'git ' + command;
        }

        grunt.verbose.writeln('Command:', command);

        var childProcess = exec(command, {cwd: options.cwd}, function (error) {
            if (error && options.failOnError) {
                grunt.warn(error);
            }

            done();
        });

        if (options.storeOutputTo) {
            childProcess.stdout.on('data', function(buf) {
                text += buf.toString();
            });

            childProcess.stdout.on('end', function() {
                var variable = options.storeOutputTo.toString().trim();
                grunt.config(variable, options.postProcessOutput(text));
            });
        }

        if (options.stdout || grunt.option('verbose')) {
            childProcess.stdout.pipe(process.stdout);
        }

        if (options.stderr || grunt.option('verbose')) {
            childProcess.stderr.pipe(process.stderr);
        }
    });
};
