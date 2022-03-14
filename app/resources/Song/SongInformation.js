/* eslint-env browser */
import Render from "../Uploads/Render.js";
var currentSong;

class SongInformation {
    // wird aufgerufen, wenn das "i" in der Songliste eines Songs angeglickt wird, anschließend werden die "Karten" mit den 
    //entsprechenden Informationen zum Song gespeichert
    static createDetailInformation(song) {
        document.querySelector("#title-information").innerHTML = song.title;
        document.querySelector("#interpret-information").innerHTML = song.interpret;
        document.querySelector("#genre-information").innerHTML = song.genre;
        document.querySelector("#category-information").innerHTML = song.category;
        document.querySelector("#bpm-information").innerHTML = song.bpm;
        document.querySelector("#comment-information").innerHTML = song.comment;
        if (song.lyrics !== undefined) {
            Render.renderFile(song.lyrics, "osmdCanvasDetails");
        }
        currentSong = song;
    }

    //Getter der den aktuellen Song in der Informationsansicht zurückgibt
    static getSingleSong() {
        return currentSong;
    }

}

export default SongInformation;