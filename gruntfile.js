module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'css/global.css' : 'src/_styles/global.scss'
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '*',
          onCreateServer: function(server, connect, options) {
            var io = require('socket.io').listen(server);
            io.sockets.on('connection', function(socket) {
              // do something with socket
            });
          }
        }
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      },
      scripts: {
          files: '**/*.js',
          tasks: ['uglify']
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'style',
          src: ['global.css', '!global.min.css'],
          dest: 'build',
          ext: '.min.css'
        }]
      }
    },
    uglify: {
            dist: {
                files:{
                    'js/_api/tflapi.min.js': 'src/_api/tflapi.js',
                }
            }
        },
  });

  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default',['sass', 'connect', 'watch', 'cssmin', 'uglify']);
}
