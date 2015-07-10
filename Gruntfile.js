module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            less: {
                src: ['src/**/*.less'],
                dest: 'less-helpers.less'
            }
        },
        postcss: {
            prod: {
                options: {
                    map: {
                        inline: false, // save all sourcemaps as separate files...
                        annotation: '/src/maps' // ...to the specified directory
                    },
                    // safe: true,
                    processors: [
                        require('pixrem')(), // add fallbacks for rem units
                        require('autoprefixer-core')({
                            browsers: 'last 2 versions'
                        }), // add vendor prefixes
                        require('cssnano')(), // minify the result
                        require('cssnext')() // Plugins to use future CSS features now by adding backwards compatibility css processing
                    ]
                },
                dist: {
                    files: {
                        "dist/less-helpers.css": ['dist/less-helpers.css']
                    }
                }
            },
            dev: {}
        },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "dist/less-helpers.css": "less-helpers.less"
                }
            }
        },
        watch: {
            files: ['src/**/*.less'],
            tasks: ['concat:less']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less', 'postcss:prod']);
};