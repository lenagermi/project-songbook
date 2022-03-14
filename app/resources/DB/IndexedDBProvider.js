/* eslint-env browser */

import Logger from "../Utils/Logger.js";
import Song from "../Song/Song.js";
import Config from "./DBConfig.js";
import DBProvider from "./DBProvider.js";
import Setlist from "../Setlist/Setlist.js"

var database;

function getSongObjectStore(mode) {
    let transaction = database.transaction([Config.DB_STORE_KEY], mode),
        objectStore = transaction.objectStore(Config.DB_STORE_KEY);
    return objectStore;
}

function getSetlistObjectStore(mode) {
    let transaction = database.transaction([Config.DB_STORE_KEY_SETLIST], mode),
        objectStore = transaction.objectStore(Config.DB_STORE_KEY_SETLIST);
    return objectStore;
}

function callErrorCallback(msg, callback) {
    let error = new Error(msg);
    callback(error);
}

function createDatabase() {
    return new Promise(function (resolve, reject) {
        let request = indexedDB.open(Config.DB_NAME);
        request.onerror = callErrorCallback.bind(null,
            "Could not open database", reject);
        request.onupgradeneeded = function (event) {
            let db = event.target.result,
                songObjectStore = db.createObjectStore(Config.DB_STORE_KEY, {
                    keyPath: Config.DB_STORE_KEY_PATH,
                }),
                setlistObjectStore = db.createObjectStore(Config.DB_STORE_KEY_SETLIST, {
                    keyPath: Config.DB_STORE_KEY_PATH,
                });
            console.log(songObjectStore);
            console.log(setlistObjectStore);
        };

        request.onsuccess = function (e) {
            database = e.target.result;
            if (database.objectStoreNames.contains(Config.DB_STORE_KEY) && !database.objectStoreNames.contains(Config.DB_STORE_KEY_SETLIST)) {
                var version = parseInt(database.version);
                database.close();
                if (!database.objectStoreNames.contains(Config.DB_STORE_KEY_SETLIST)) {
                    var secondRequest = indexedDB.open(Config.DB_NAME, version + 1);
                    secondRequest.onupgradeneeded = function (e) {
                        var database = e.target.result;
                        var objectStore = database.createObjectStore(Config.DB_STORE_KEY_SETLIST, {
                            keyPath: Config.DB_STORE_KEY_PATH
                        });
                    };
                    secondRequest.onsuccess = function (e) {
                        e.target.result.close();

                    }
                }
                Logger.log("DB ready to use first time");
            } else {
                Logger.log("DB ready to use");
                resolve();

            }
        };
    });
}


function storeSong(song) {
    return new Promise(function (resolve, reject) {
        let objectStore = getSongObjectStore("readwrite"),
            request = objectStore.add(song);
        request.onerror = callErrorCallback.bind(null,
            "Could not store song in database", reject);
        request.onsuccess = function () {
            Logger.log(`${song.title} ${song.id} added to DB`);
            resolve(song);
        };
    });
}

function storeSetlist(setlist) {
    return new Promise(function (resolve, reject) {
        let objectStore = getSetlistObjectStore("readwrite"),
            request = objectStore.add(setlist);
        request.onerror = callErrorCallback.bind(null,
            "Could not store setlist in database", reject);
        request.onsuccess = function () {
            Logger.log(`${setlist.title} ${setlist.id} added to DB`);
            resolve(setlist);
        };
    });
}

function getAllSongsFromDatabase() {

    return new Promise(function (resolve, reject) {
        let objectStore = getSongObjectStore("readonly"),
            request = objectStore.getAll();
        request.onerror = callErrorCallback.bind(null,
            "Could not get songs from database", reject);
        request.onsuccess = function (event) {
            let dbSongs = event.target.result,
                songs = [];
            for (let i = 0; i < dbSongs.length; i++) {
                songs.push(Song.fromObject(dbSongs[i]));
            }
            resolve(songs);
        };
    });
}

function getAllSetlistsFromDatabase() {
    return new Promise(function (resolve, reject) {
        let objectStore = getSetlistObjectStore("readonly"),
            request = objectStore.getAll();
        request.onerror = callErrorCallback.bind(null,
            "Could not get setlists from database", reject);
        request.onsuccess = function (event) {
            let dbSetlists = event.target.result,
                setlists = [];
            for (let i = 0; i < dbSetlists.length; i++) {
                setlists.push(Setlist.fromObject(dbSetlists[i]));
            }
            resolve(setlists);
        };
    });
}

function updateSongInDatabase(song) {
    return new Promise(function (resolve, reject) {
        let objectStore = getSongObjectStore("readwrite"),
            request = objectStore.get(song.id);
        request.onerror = callErrorCallback.bind(null,
            "Could not get song from database", reject);
        request.onsuccess = function (event) {
            let updateRequest, dbSong = event.target.result;
            dbSong.title = song.title;
            dbSong.interpret = song.interpret;
            dbSong.genre = song.genre;
            dbSong.category = song.category;
            dbSong.bpm = song.bpm;
            dbSong.comment = song.comment;
            dbSong.lyrics = song.lyrics;
            dbSong.setlists = song.setlists;
            updateRequest = objectStore.put(dbSong);
            updateRequest.onerror = callErrorCallback.bind(null,
                "Could not update song in database", reject);
            updateRequest.onsuccess = function () {
                let newSong = Song.fromObject(dbSong);
                Logger.log(`Song ${song.id} updated in DB`);
                resolve(newSong);
            };
        };
    });
}

function updateSetlistInDatabase(setlist) {
    return new Promise(function (resolve, reject) {
        let objectStore = getSetlistObjectStore("readwrite"),
            request = objectStore.get(setlist.id);
        request.onerror = callErrorCallback.bind(null,
            "Could not get setlist from database", reject);
        request.onsuccess = function (event) {
            let updateRequest, dbSetlist = event.target.result;
            // alle Eigenschaften werden geändert
            dbSetlist.title = setlist.title;
            dbSetlist.songs = setlist.songs;
            dbSetlist.songNames = setlist.songNames;

            updateRequest = objectStore.put(dbSetlist);
            updateRequest.onerror = callErrorCallback.bind(null,
                "Could not update setlist in database", reject);
            updateRequest.onsuccess = function () {
                let newSetlist = Setlist.fromObject(dbSetlist);
                Logger.log(`${setlist.title} ${setlist.id} updated in DB`);
                resolve(newSetlist);
            };
        };
    });
}

function removeSongFromDatabase(song) {
    return new Promise(function (resolve, reject) {
        let objectStore = getSongObjectStore("readwrite"),
            request = objectStore.delete(song.id);
        request.onerror = callErrorCallback.bind(null,
            "Could not remove song from database", reject);
        request.onsuccess = function () {
            Logger.log(`Song ${song.id} removed from DB`);
            resolve(song);
        };
    });
}

function removeSetlistFromDatabase(setlist) {
    return new Promise(function (resolve, reject) {
        let objectStore = getSetlistObjectStore("readwrite"),
            request = objectStore.delete(setlist.id);
        request.onerror = callErrorCallback.bind(null,
            "Could not remove setlist from database", reject);
        request.onsuccess = function () {
            Logger.log(`Setlist ${setlist.id} removed from DB`);
            resolve(setlist);
        };
    });
}

class IndexedDBManager extends DBProvider {

    async open() {
        return createDatabase();
    }

    async createSong(song) {
        return storeSong(song);
    }

    async getSongs() {
        return getAllSongsFromDatabase();
    }

    async updateSong(song) {
        return updateSongInDatabase(song);
    }

    async removeSong(song) {
        return removeSongFromDatabase(song);
    }

    // Funktionen für Setliste
    async createSetlist(setlist) {
        return storeSetlist(setlist)

    }

    async getSetlists() {
        return getAllSetlistsFromDatabase();
    }

    async updateSetlist(setlist) {
        updateSetlistInDatabase(setlist);
    }

    async removeSetlist(setlist) {
        removeSetlistFromDatabase(setlist);
    }

}

export default IndexedDBManager;