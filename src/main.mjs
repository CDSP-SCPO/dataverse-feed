import App from "./App.svelte";

function createFeed(target, settings) {
    new App({
        target: target,
        props: {
            settings: settings,
        },
    });
}

export default createFeed;
