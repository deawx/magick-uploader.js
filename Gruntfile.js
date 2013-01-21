module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      name: "joy.js",
      banner: '/* \n' +
        ' * <%= meta.name %> v<%= pkg.version %> \n' +
        ' * <%= pkg.homepage %>\n' +
        ' * \n' +
        ' * @copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> \n' +
        ' * @license <%= pkg.licenses[0].type %>\n' +
        ' * @build <%= grunt.template.today("m/d/yyyy") %>\n' +
        ' */\n\n'
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: [
          'lib/*.js'
        ],
        dest: 'dist/magick-uploader.js'
      }
    },
    uglify: {
      exportAll: {
        src: 'dist/magick-uploader.js',
        dest: 'dist/magick-uploader.min.js',
        options: {
          preserveComments: 'some'
        }
      }
    },
    qunit: {
      all: ['test/index.html']
    },
    jshint: {
      all: [ 'Gruntfile.js', 'lib/*.js'],
      options: {
        "browser": true
        // "es5": true
      }
    },
    watch: {
      scripts: {
        files: '<%= concat.dist.src %>',
        tasks: ['jshint', 'concat'],
        options: {
          interrupt: true
        }
      }
    },
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        nocode: 'true',
        themedir: 'doctheme/',
        options: {
          paths: 'lib/',
          outdir: 'doc/'
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'qunit']);

  // Test task
  grunt.registerTask('test', ['concat', 'jshint', 'qunit']);

  // Minify
  grunt.registerTask('min', ['concat', 'uglify']);

  // Travis CI task.
  grunt.registerTask('travis', 'default');

  // Generate only documentation.
  grunt.registerTask('docs', 'yuidoc');
};

