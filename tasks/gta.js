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

            cwd: null
        });

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
        });

        var check1 = options.storeOutputTo !== '';
        var check2 = typeof options.storeOutputTo === 'string';

        if (check1 && check2) {
            // https://github.com/gruntjs/grunt/issues/1207
            //grunt.config(options.storeOutputTo, process.stdout);
            GLOBAL[options.storeOutputTo] = process.stdout.toString();
        }

        if (options.stdout || grunt.option('verbose')) {
            cp.stdout.pipe(process.stdout);
        }

        if (options.stderr || grunt.option('verbose')) {
            cp.stderr.pipe(process.stderr);
        }
    });
};
