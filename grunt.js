module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-coffee');

  grunt.initConfig({
    coffee: {
      plugins: {
        src: ['src/*.coffee'],
        dest: 'js'
      }
    },

    watch: {
      files: ['<config:coffee.plugins.src>'],
      tasks: ['coffee:plugins']
    }
  });

  grunt.registerTask('default', 'coffee');
};
