var Builder = require('systemjs-builder');
var builder = new Builder();

builder
  .loadConfig('./config.js')
  .then(function() {
    builder
      .buildSFX('./lib/main.js', 'memory.min.js', { sourceMaps: true, minify: true, mangle: false, sfxFormat: 'global' })
      .then(function() {
        console.log('Build complete');
      })
      .catch(function(err) {
        console.log('Build error');
        console.log(err);
      });
  });