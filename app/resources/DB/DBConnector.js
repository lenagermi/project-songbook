/* eslint-env browser */

/**
 * DBConnector ist die Stelle, mit der alle Komponenten unserer Anwendung sprechen.
 * Im Konstruktor des DBConnectors wird die jeweilige Strategie gesetzt (in unserem Fall IndexedDB)
 */

import IndexedDBProvider from "./IndexedDBProvider.js";

/**
 * Über diese Funktion wird dem DBConnector eine Strategie über die unten erstellten Symbole übergeben
 */
function getProvider(strategy) {
    switch (strategy) {
        case DBConnector.INDEXED_DB_STRATEGY:
            return new IndexedDBProvider();
        default:
            throw new Error("Strategy");
    }
}

class DBConnector {

    constructor(strategy) {
        this.db = getProvider(strategy);
    }

    open() {
        return this.db.open();
    }

    createSong(song) {
        return this.db.createSong(song);
    }

    getSongs() {
        return this.db.getSongs();
    }

    updateSong(song) {
        return this.db.updateSong(song);
    }

    removeSong(song) {
        return this.db.removeSong(song);
    }

    createSetlist(setlist) {
        return this.db.createSetlist(setlist);
    }

    getSetlists() {
        return this.db.getSetlists();
    }

    updateSetlist(setlist) {
        return this.db.updateSetlist(setlist);
    }

    removeSetlist(setlist) {
        return this.db.removeSetlist(setlist);
    }

}

// Symbol ist in JavaScript eine Möglichkeit etwas zu kennzeichnen, was absolut eindeutig ist.
// Ähnlich wie eine Konstante, aber kann nicht "überschrieben" werden.
DBConnector.INDEXED_DB_STRATEGY = Symbol("IndexedDB");

export default DBConnector;