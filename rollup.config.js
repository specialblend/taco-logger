import { module as __module__ } from './package.json';

export default {
    input: 'src/main.ts',
    output: [
        {
            file: __module__,
            format: 'esm',
        },
    ],
    external: ['bunyan'],
};
