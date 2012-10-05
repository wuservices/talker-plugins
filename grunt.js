module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-coffee');

  grunt.initConfig({
    coffee: {
      plugins: {
        src: ['src/*.coffee'],
        dest: 'js'
      },

      specs: {
        src: ['spec/*.coffee'],
        dest: 'spec/js'
      },
    },

    watch: {
      files: ['<config:coffee.plugins.src>', '<config:coffee.specs.src>'],
      tasks: ['coffee']
    }
  });

  grunt.registerTask('default', 'coffee');
};
