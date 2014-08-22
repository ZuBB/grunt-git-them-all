# grunt-git-them-all

> All Git commands for grunt

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
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.command
Type: `String`
Default value: `null`

A string value that is used to do something with whatever.

#### options.cwd
Type: `String`
Default value: `process.cwd()`

A path where git command will be run

### Usage Examples

```js
grunt.initConfig({
  gta: {
    add_target: {
        command: 'add -A .',
    }
  },
});

grunt.initConfig({
  gta: {
    options: {
      cwd: '/path/where/to/run/git/command'
    },
    target_a: {
      'command': 'tag "v0.5.0"'
    },
    target_b: {
      'command': 'push origin master'
    }
  },
});

```

