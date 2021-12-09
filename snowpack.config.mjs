export default {
    mount: {
        src: '/dist',
        public: '/',
    },
    buildOptions: {
        baseUrl: './',
    },
    plugins: ['@snowpack/plugin-svelte'],
    optimize: {
        entrypoints: ['src/main.mjs'],
        bundle: true,
        minify: true,
        treeshake: true,
        sourcemap: false,
    },
};
