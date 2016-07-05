#!/bin/bash
node build/node/concat.js
rollup --config build/rollup/rollup.config.js
rm -r skylake.js
node build/node/version.js
cp index.js ../../lab/src/public/js/lib/skylake/skylake-test.js
