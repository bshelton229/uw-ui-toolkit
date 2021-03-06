module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      img: {
        files: [{src: 'src/img/*', dest: 'dist/img/', flatten: true, expand: true}]
      },

      /**
       * copy:bootstrap is used to upgrade bootstrap in src/less/bootstrap, and should not be run routinely
       * First, upgrade the tag ref for the bootstrap devDependency in package.json.
       * Then, npm install, grunt copy:bootstrap.
       */
      bootstrap: {
        files: [
          {src: 'node_modules/bootstrap/less/*.less',dest: 'src/less/bootstrap/', flatten: true, expand: true},
          {src: 'node_modules/bootstrap/fonts/*', dest: 'dist/fonts/', flatten: true, expand: true}
        ]
      }
    },

    less: {
      toolkit: {
        files: { 'dist/css/uw-ui-toolkit.css': ["src/less/uw-ui-toolkit.less"] }
      },
      min: {
        options: {
          compress: true
        },
        files: { 'dist/css/uw-ui-toolkit.min.css': ["src/less/uw-ui-toolkit.less"] }
      }
    },

    watch: {
      all: {
        files: ['src/**/*.less'],
        tasks: ['default']
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register tasks
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['less','copy:img']);
}
