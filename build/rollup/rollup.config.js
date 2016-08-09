import babel  from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
    entry: 'skylake.js',
    dest: 'index.js',
    plugins: [
        babel({
            babelrc: false,
            presets: [
                ['es2015', { 'modules': false }]
            ],
            plugins: ['external-helpers']
        }),
        uglify()
    ],
    format: 'cjs'
}
