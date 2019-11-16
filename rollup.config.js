export default {
    input: 'src/main.js',
    output: [
        {
            file: 'lib/index.esm.js',
            format: 'esm',
        },
    ],
    external: ['bunyan'],
};
