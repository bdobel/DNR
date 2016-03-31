module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //css compilation from less
    less: {
      dev: {
        options: {
          paths: ['public/css']
        },
        files: {
          "public/build/style-<%= pkg.name %>.css": "public/css/style.less"
        }
      },
      prod: {
        options: {
          paths: ["assets/css"],
          plugins: [
              new(require('less-plugin-autoprefix'))({
                browsers: ["last 2 versions"]
              }),
              new(require('less-plugin-clean-css'))({})
            ]
            // modifyVars: {
            //   imgPath: '"http://mycdn.com/path/to/images"',
            //   bgColor: 'red'
            // }
        },
        files: {
          "public/build/style-<%= pkg.name %>.min.css": "public/css/style.less"
        }
      }
    },
    //concatenate all js files
    concat: {
      options: {
        //separator: ';',
      },
      multi: {
        files: {
          'public/build/<%= pkg.name %>.js': [
            'js/*.js'
          ]
        }
      }
    },
    //minify js files
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: [{
          src: 'public/build/<%= pkg.name %>.js',
          dest: 'public/build/<%= pkg.name %>.min.js'
        }]
      }
    },
    //watch tasks    
    watch: {
      js: {
        files: [
          'public/js/*.js',
          'public/js/**/*.js',
          'public/js/**/**/*.js'
        ],
        tasks: ['concat']
      },
      //browserify: {
      //  files: ['js/*.js'],
      //  tasks: ['bump', 'browserify:dev']
      //},
      css: {
        files: ['public/css/*.less'],
        tasks: ['less']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'less', 'watch']);
  grunt.registerTask('production', ['concat', 'uglify', 'less:prod']);

};
