module.exports = function(grunt) {

  grunt.initConfig({
    connect: {
      server: {
        options: {
            port: 8080,
            base: './',
            livereload: true
        }
      }
    },
    watch: {
      scripts: {
        files: ['game/**/*.js'],
        options: {
          spawn: false,
          livereload: true
        },
      },
    }
  });
  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['connect', 'watch']);

};
