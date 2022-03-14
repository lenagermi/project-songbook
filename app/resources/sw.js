/* eslint-env browser*/
// install service worker 
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("mme").then(function (cache) {
      cache.addAll([
        "/",
        "/index.html",
        "/resources/css/style.css",
        "/resources/js/index.js",
        "/resources/DB/DBConfig.js",
        "/resources/DB/DBConnector.js",
        "/resources/DB/DBProvider.js",
        "/resources/DB/IndexedDBProvider.js",
        "/resources/js/app.js",
        "/resources/OpenSheetMusicDisplay/opensheetmusicdisplay.min.js",
        "/resources/Properties/Theme.js",
        "/resources/Setlist/PlaySetlist.js",
        "/resources/Setlist/Setlist.js",
        "/resources/Setlist/SetlistDetailView.js",
        "/resources/Setlist/SetlistView.js",
        "/resources/Setlist/SonglistView.js",
        "/resources/Song/PlaySong.js",
        "/resources/Song/Song.js",
        "/resources/Song/SongInformation.js",
        "/resources/Song/SongView.js",
        "/resources/Template/Template.js",
        "/resources/Uploads/fileSelectAndLoadOSMD.js",
        "/resources/Uploads/Render.js",
        "/resources/Setlist/DeleteSetlists.js",
        "/resources/Setlist/SetlistEdit.js",
        "/resources/Setlist/SetlistInput.js",
        "/resources/Song/DeleteSongs.js",
        "/resources/Song/SongEdit.js",
        "/resources/Song/SongInput.js",

      ]).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.open("mme")
      .then(cache => cache.match(event.request, { ignoreSearch: true }))
      .then(response => {
        return response || fetch(event.request);
      })
  );
});