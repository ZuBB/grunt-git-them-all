/*
 * grunt-gta
 * https://github.com/ZuBB/grunt-gta
 *
 * Copyright (c) 2014 Vasyl Zuzyak
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        'gta': {
            default_options: {
                options: {
                },
                files: {
                    'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123']
                }
            },
            custom_options: {
                options: {
                    separator: ': ',
                    punctuation: ' !!!'
                },
                files: {
                    'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123']
                }
            },
            test: {
                command: 'branch',
                options: {
                    storeOutputTo: 'var1',
                }
            }
        },

        // Unit tests.
        release: {
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-release');

    grunt.registerTask('dumpVar', 'prints variable content', function() {
        console.log(grunt.config('var1'));
    });

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'gta', 'nodeunit']);
    grunt.registerTask('qt', ['gta:test', 'dumpVar']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint'/*, 'test'*/]);
};
