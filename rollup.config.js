import { module as __module__ } from './package.json';

export default {
    input: 'src/main.js',
    output: [
        {
            file: __module__,
            format: 'esm',
        },
    ],
    external: ['bunyan'],
};
