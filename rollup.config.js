// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

import pkg from './package.json';


export default [
    {        
        input: 'src/main.js',
        output: {
            name: pkg.name,
            file: pkg.browser,
            format: 'umd',
            globals : pkg.globals,
        },
        plugins: [
            resolve({
                // pass custom options to the resolve plugin
                customResolveOptions: {
                    moduleDirectory: 'node_modules'
                }
            }),
            commonjs()
        ],
        // indicate which modules should be treated as external
        external: ['axios']
    },
    {
        input: 'src/main.js',
        external: ['axios'],
        output: [
            { file: pkg.main, format: 'cjs', globals : pkg.globals },
            { file: pkg.module, format: 'es', globals : pkg.globals }
        ]
    }
];