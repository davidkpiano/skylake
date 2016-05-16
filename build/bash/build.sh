#!/bin/bash
node build/node/concat.js
rollup --config build/rollup/rollup.config.js
rm -r skylake.js
node build/node/version.js
