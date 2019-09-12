export default
{
    input: 'src/main.js',
    output: [
        // {
        //     file: 'lib/index.js',
        //     format: 'cjs',
        // },
        {
            file: 'lib/index.js',
            format: 'esm',
        },
        // {
        //     file: 'lib/index.umd.js',
        //     format: 'umd',
        //     name: 'index',
        // },
    ],
    external: ['winston'],
};
