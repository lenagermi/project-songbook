/* eslint-env browser */


class DBProvider {

    /*
     * Muss ein Promise zurückgeben, das aufgelöst wird, wenn die Datenbank bereit ist
     */
    async open() {
        throw new Error("Not implemented");
    }

    /*
     * Muss ein Promise zurückgeben, das mit einer neuen Aufgabe aufgelöst wird, wenn diese Aufgabe erstellt und in der Datenbank gespeichert wurde
     */
    async createSong(song) {
        throw new Error("Not implemented");
    }

    /*
     * Muss ein Promise zurückgeben, dass aufgelöst wird, wenn alle Songs verfügbar sind 
     */
    async getSongs() {
        throw new Error("Not implemented");
    }

    /*
     * Muss ein Promise zurückgeben, das mit einem aktualisierten Song aufgelöst wird, wenn der Song in der Datenbank aktualisiert wurde
     */
    async updateSong(song) {
        throw new Error("Not implemented");
    }

    /*
     * Muss ein Promise zurückgeben, das mit dem entfernten Song aufgelöst wird, wenn dieser Song aus der Datenbank entfernt wurde
     */
    async removeSong(song) {
        throw new Error("Not implemented");
    }

    async createSetlist(setlist) {
        throw new Error("Not implemented");
    }

    /*
     * Muss ein Promise zurückgeben, das mit allen verfügbaren Setlists aufgelöst wird
     */
    async getSetlists() {
        throw new Error("Not implemented");
    }

    /*
     * Muss ein Promise zurückgeben, das mit einer aktualisierten Setliste aufgelöst wird, wenn die gegebene Setliste in der Datenbank aktualisiert wurde
     */
    async updateSetlist(setlist) {
        throw new Error("Not implemented");
    }

    /*
     * Muss ein Promise zurückgeben, das mit der entfernten Setliste aufgelöst wird, wenn diese aus der Datenbank entfernt wurde
     */
    async removeSetlist(setlist) {
        throw new Error("Not implemented");
    }

}

export default DBProvider;