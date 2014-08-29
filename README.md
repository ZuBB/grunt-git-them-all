# grunt-git? no, its better! its "grunt, git them all"!

> All Git commands for grunt

## Why I came with one more grunt plugin for git?

We already have nice and fancy, well tested and fully configuralble [plugin](https://github.com/rubenv/grunt-git) for that. So what is wrong with it?

* It used to not support run of git commands in custom path. I come with a PR, but ... it was bad. Other guy did a better one, but it still requires one more option to have all that work.
* I needed to run a command with option that was not supported by that plugin. I came with PR, but ... it does not have tests (yea, I am lazy a bit).
* I needed to run a command that was supported by that plugin. But its explicit run is impossible because it is included into other task/command.

Ok, lets try to find some pros for that plugin. It supports dozen of tasks/commands which have tons of options. All that crowd turns into words and then into final string with word 'git' at start. And only after that its being invoked. Still as a shell command.

What the reason to go around if you just need 1 simple thing? I think most of that buzz is useless there. Key of my plugin is next: **just write command and get what you need**

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-git-them-all --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-git-them-all');
```

## The "gta" task

### Overview
In your project's Gruntfile, add a section named `gta` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gta: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific command and/or options go here.
    },
  },
});
```

### Command
Type: `String`
Default value: `null`

A string that will be trailing part of the shell command. **Required**

### Options

#### options.cwd
Type: `String`
Default value: `process.cwd()`

A path where git command will be run

#### options.failOnError

Type: `boolean`
Default: `true`

Fail task if it encounters an error

#### options.stdout

Type: `boolean`
Default: `false`

Show stdout in the terminal.

#### options.stderr

Type: `boolean`
Default: `false`

Show stderr in the terminal.

#### options.storeOutputTo

Type: `string`
Default: `(empty string)`

Store command's output to global variable with specified name

### Usage Examples

```js
grunt.initConfig({
    gta: {
        add_target: {
            command: 'add -A .',
            options: {
                stdout: true
            }
        },
    },
});

grunt.initConfig({
    gta: {
        options: {
            cwd: '/path/where/to/run/git/command'
        },
        target_a: {
            command: 'tag "v0.5.0"',
            options: {
                    stderr: true
            }
        },
        target_b: {
            command: 'push origin master'
            options: {
                stderr: true
            }
        },
    },
});

grunt.initConfig({
    gta: {
        branch: {
            command: 'git rev-parse --abbrev-ref HEAD'
            options: {
                storeOutputTo: 'currentBranch'
            }
        },
    },
});
...
grunt.registerTask('git-branch', 'print current branch', function() {
    grunt.log.writeln('current branch is: ' + currentBranch);
});
```

