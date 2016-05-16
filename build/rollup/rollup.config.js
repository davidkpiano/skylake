import babel  from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
    entry: 'skylake.js',
    dest: 'index.js',
    plugins: [
        babel({
            presets: 'es2015-rollup'
        }),
        uglify()
    ],
    format: 'cjs'
}
