/* eslint-disable no-console */
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("resources/sw.js")
        .then((reg) => console.log("service worker is registered", reg))
        .catch((err) => console.log("service worker is not registered", err));
}