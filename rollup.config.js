// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import flow from 'rollup-plugin-flow';
import {terser}  from 'rollup-plugin-terser';


import pkg from './package.json';

export default [
    {        
        input: 'src/jsRequest.js',
        output: {
            name: pkg.name,
            file: pkg.browser,
            format: 'umd',
            globals : pkg.globals,
        },
        plugins: [
            flow(),
            resolve({
                // pass custom options to the resolve plugin
                customResolveOptions: {
                    moduleDirectory: 'node_modules'
                }
            }),            

            commonjs(),
            babel(babelrc()),
            terser(),

            
        ],
        // indicate which modules should be treated as external
        external: ['axios']
    },
    {
        input: 'src/jsRequest.js',
        external: ['axios'],
        plugins: [
            flow(),
            resolve({
                // pass custom options to the resolve plugin
                customResolveOptions: {
                    moduleDirectory: 'node_modules'
                }
            }),

            commonjs(),
            babel(babelrc()),
            terser(),
            
        ],
        output: [
            { file: pkg.main, format: 'cjs', globals : pkg.globals },
            { file: pkg.module, format: 'es', globals : pkg.globals }
        ]
    }
];