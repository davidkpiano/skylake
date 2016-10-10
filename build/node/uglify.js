const UglifyJS = require("uglify-js")
const fs       = require('fs')

const result = UglifyJS.minify(['skylake.js'])

fs.writeFileSync('index.js', result.code, 'utf8')
