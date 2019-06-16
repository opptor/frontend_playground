const browserSync = require('browser-sync');
const fs = require('fs');
const sass = require('sass');
const watch = require('node-watch');

browserSync.create();
browserSync.init({
    server: '.',
    open: false
});

compileSass();

watch('./scss/main.scss', {recursive: true}, function(evt, name) {
    console.log('./scss/main.scss file changed');
    compileSass();
    browserSync.reload('*.css');
});

function compileSass() {
    sass.render({file: './scss/main.scss', sourceMapEmbed: true, outputStyle: 'compressed'},
        function(error, result) {
            if (error) {
                console.log('ERROR while compiling SASS: ' + error);
            } else {
                console.log('SASS successfully compiled!');
                fs.writeFileSync('./css/main.css', result.css);
                browserSync.reload('*.css');
            }
        }
    )
}