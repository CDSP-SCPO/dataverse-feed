export default {
    mount: {
        src: '/dist',
        public: '/',
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
