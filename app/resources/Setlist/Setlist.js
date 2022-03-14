/* eslint-env browser */

/**
 * Im Modul Setlist werden wichtige Informationen zu einer Setliste gespeichert, dazu zählen:
 * - setlistId
 * - Name der Setlist
 * - Alle Songs, die in einer Setlist gespeichert werden
 * 
 * Außerdem gibt es Methoden um einen Song zu einer Setlist hinzuzufügen, einen Song aus der Setlist zu löschen und alle Songs auszugeben.
 */

class Setlist {

    constructor(id, title) {
        if (id === null) {
            this.id = Date.now().toString();
        } else {
            this.id = id;
        }
        this.title = title;
        this.songs = [];
        this.songNames = [];

    }

    getSongs() {
        return this.songs;
    }

    addSong(song) {
        this.songNames.push(song.title);
        this.songs.push(song);
    }

    //Song wird sowohl aus als Song aus der Setliste gelöscht, als auch der Name aus dem Namensarray
    removeSong(id) {
        for (let i = 0; i < this.songs.length; i++) {
            if (this.songs[i].id === id) {
                this.songs.splice(i, 1);
                this.songNames.splice(i, 1);
            }
        }
    }

    setSongs(songArray) {
        this.songs = songArray;
    }

    setSongNames(songNameArray) {
        this.songNames = songNameArray;
    }

    static fromObject(obj) {
        let setlist = new Setlist(obj.id, obj.title);
        setlist.setSongs(obj.songs);
        setlist.setSongNames(obj.songNames);
        return setlist;
    }
}

export default Setlist;