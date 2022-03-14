/* eslint-env browser */
import SongInput from "./SongInput.js";
import SongInformation from "./SongInformation.js";
import Template from "../Template/Template.js";
// Das Modul Song enthält alle wichtigen Informationen zum Song
 
class Song {

    constructor(id, title, interpret, genre, category, bpm, comment, lyrics, setlists) {
        if (id === null) {
            this.id = Date.now().toString();
        } else {
            this.id = id;
        }
        this.title = title;
        this.interpret = interpret;
        this.genre = genre;
        this.category = category;
        this.bpm = bpm;
        this.comment = comment;
        this.lyrics = lyrics;
        if (setlists === null) {
            this.setlists = [];
        } else {
            this.setlists = setlists;
        }
    }

    //gibt alle Setlistenids der SEtlisten zurück, in denen der Song vorkommt
    getSetlists() {
        return this.setlists;
    }

    addSetlistId(id) {
        this.setlists.push(id);
    }

    removeSetlistId(id) {
        for (let i = 0; i < this.setlists.length; i++) {
            if (this.setlists[i] === id) {
                this.setlists.splice(i, 1);
            }
        }
    }

    static fromObject(obj) {
        return new Song(obj.id, obj.title, obj.interpret, obj.genre, obj.category, obj.bpm, obj.comment, obj.lyrics, obj.setlists);
    }
}

// Buttons für die Song-DetailAnsicht werden initialisiert und Eventlistener darauf registriert
function initInfoButtons() {
    let infoBtn = document.querySelectorAll("#info-button"),
        detailBtn = document.querySelectorAll("#detail-button");
    for (let i = 0; i < infoBtn.length; i++) {
        infoBtn[i].addEventListener("click", showInformation);
    }
    for (let i = 0; i < detailBtn.length; i++) {
        detailBtn[i].addEventListener("click", showInformation);
    }
}

//beim Klicken auf einen Informationsbutton, werden die Informationen zum passenden Song in Cards angezeigt
function showInformation() {
    Template.showSongDetailTemplates();
    let element = this,
        songlist,
        id = element.getAttribute("songId");
    songlist = SongInput.getAllSongs();
    for (let i = 0; i < songlist.length; i++) {
        if (songlist[i].id === id) {
            SongInformation.createDetailInformation(songlist[i]);
        }
    }
}

export default Song;
export { initInfoButtons };