const sass = require('sass');
const fs = require('fs');
const browserSync = require('browser-sync');
const watch = require('node-watch');

browserSync.create();
browserSync.init({
	server: '.',
	open: false,
});

// copy normalize css
fs.copyFileSync('./node_modules/modern-normalize/modern-normalize.css', './css/modern-normalize.css');
compileSass();

watch('./js', { recursive: true }, function(evt, name) {
    console.log('javascript has changed');
    transformES6Code();
    browserSync.reload();
});

watch('./scss/main.scss', { recursive: true }, function(evt, name) {
    console.log('./scss/main.scss file changed');
    compileSass();
    browserSync.reload();
});

watch('./index.html', { recursive: true }, function(evt, name) {
    console.log('./index.html file changed');
    browserSync.reload();
});

function compileSass() {
    sass.render({file: './scss/main.scss', sourceMapEmbed: true, outputStyle: 'compressed',
        }, function(error, result) {
            if (error) {
                console.log('ERROR while compiling SASS: ' + error);
            } else {
                console.log('SASS - compiled')
                fs.writeFileSync('./css/main.css', result.css);
                browserSync.reload('*.css');
            }
        });
}