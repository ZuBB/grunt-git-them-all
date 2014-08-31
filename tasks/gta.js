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
        var cb = this.async();
        var cmd = this.data.command;
        var options = this.options({
            failOnError: true,

            stdout: false,
            stderr: false,

            storeOutputTo: '',
            postProcessOutput: null,

            cwd: null
        });

        if (typeof cmd !== 'string') {
            throw new Error('`command` required');
        }

        cmd = 'git ' + cmd;
        grunt.verbose.writeln('Command:', cmd);

        var childProcess = exec(cmd, {cwd: options.cwd}, function (error) {
            if (error && options.failOnError) {
                grunt.warn(error);
            }

            cb();
        });

        var output = '';
        var func = options.postProcessOutput;
        var variable = options.storeOutputTo;

        if (typeof variable === 'string' && variable !== '') {
            childProcess.stdout.on('data', function(buf) {
                output += buf.toString();
            });
            childProcess.stdout.on('end', function() {
                var value = typeof func === 'function' ? func(output) : output;
                grunt.config(variable, value);
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
