module.exports = function(grunt) {

    grunt.initConfig({
        "angular-builder": {
            options: {
                mainModule: "docPortal",
                externalModules: ["ngRoute"]
            },
            app: {
                src: "./app/**/*.js",
                dest: "./dist/project.js"
            }
        },
      jshint: {
        options: {
          predef: [ "document", "console", "$", "firebase" ],
          esnext: true,
          globalstrict: true,
          globals: {"angular": true} 
        },
        files: ['./app/**/*.js']
      },
      sass: {
        dist: {
          files: {
            './css/main.css': './sass/main.scss'
          }
        }
      },
      watch: {
        javascripts: {
          files: ['./app/**/*.js'],
          tasks: ['jshint']
        },
        sass: {
          files: ['../sass/**/*.scss'],
          tasks: ['sass']
        }
      },
      clean: {
        options: { force: true },
        public: ['../public']
      },
      copy: {
        dev: {
          files: [{
            expand: true,
            cwd: "../",
            src: [
              "index.html",
              "images/*",
              "css/**/*.css",
              "templates/**/*.html",
              "lib/node_modules/jquery/dist/jquery.min.js",
              "lib/node_modules/bootstrap/dist/js/bootstrap.min.js",
              "lib/node_modules/bootstrap/dist/css/bootstrap.min.css",
              "lib/node_modules/angular/angular.min.js",
              "lib/node_modules/angular-sanitize/angular-sanitize.min.js",
              "lib/node_modules/angular-animate/angular-animate.min.js",
              "lib/node_modules/angular-route/angular-route.min.js",
              "lib/node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js",
              "lib/node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
              "app/**/*.js"
            ],
            dest: "../public/"
          }]
        }
      }
    });
  
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  
    grunt.registerTask('default', ['jshint', 'sass', 'watch']);
    grunt.registerTask('delploy', ['sass', 'copy']);
    grunt.registerTask('cleanit', ['clean']);
  };