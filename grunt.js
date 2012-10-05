module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-coffee');

  grunt.initConfig({
    coffee: {
      plugins: {
        src: ['src/*.coffee'],
        dest: 'js'
      }
    }
  });

  grunt.registerTask('default', 'coffee');
};
