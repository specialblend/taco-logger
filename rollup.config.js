import { module as _module } from './package.json';

export default {
    input: 'src/main.ts',
    output: [
        {
            file: _module,
            format: 'esm',
        },
    ],
    external: ['bunyan'],
};
