/* jshint node: true */

'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    clientJSFiles: [
      'src/**/*.ts',
      '!src/server/*.ts'
    ],
    serverJSFiles: [
      'src/dvdread/*.ts',
      'src/server/*.ts',
      'src/utils.ts'
    ],

    typescript: {
      // Client side code uses amd modules and require.js.
      client: {
        src: '<%= clientJSFiles %>',
        dest: 'public/js/dvdjs',
        options: {
          module: 'amd',
          target: 'es5',
          basePath: 'src',
          sourcemap: false,
          declaration: false,
          comments: true
        }
      },
      // Node.js code uses commonjs modules and no sourcemap generated.
      server: {
        src: '<%= serverJSFiles %>',
        dest: 'dist',
        options: {
          module: 'commonjs',
          target: 'es5',
          basePath: 'src',
          sourcemap: false,
          declaration: false,
          removeComments: true
        }
      }
    },

    // Recompile to JavaScript when a file changes.
    watch: {
      client: {
        files: '<%= clientJSFiles %>',
        tasks: ['typescript:client'],
        options: {
          spawn: false
        }
      },
      server: {
        files: '<%= serverJSFiles %>',
        tasks: ['typescript:server'],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('client', ['typescript:client']);
  grunt.registerTask('server', ['typescript:server']);

  grunt.registerTask('default', ['client', 'server']);
};
