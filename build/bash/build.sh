#!/bin/bash
node build/node/concat.js
rollup --config build/rollup/rollup.config.js
rm -r skylake.js
node build/node/version.js
cp index.js ../penryn-starter/src/static/js/lib/skylake/skylake-test.js
cp index.js ../../aristidebenoist/src/static/js/lib/skylake/skylake-test.js
