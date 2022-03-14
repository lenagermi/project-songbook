/* eslint-env browser */
import Song from "./Song.js";
import SongInformation from "./SongInformation.js";
import SetlistInput from "../Setlist/SetlistInput.js";
import Template from "../Template/Template.js";
import Render from "../Uploads/Render.js";
import OSMDupload from "../Uploads/fileSelectAndLoadOSMD.js";

let song, titleInput, interpretInput, genreInput, categoryInput, bpmInput, commentInput, lyricsInput;

class SongEdit {

    static editSingleSong() {
        Template.showSongUpdateTemplate();
        song = SongInformation.getSingleSong();
        titleInput = document.querySelector("#title-input-update");
        interpretInput = document.querySelector("#interpret-input-update");
        genreInput = document.querySelector("#genre-input-update");
        categoryInput = document.querySelector("#category-input-update");
        bpmInput = document.querySelector("#bpm-input-update");
        commentInput = document.querySelector("#comment-input-update");
        lyricsInput = song.lyrics;

        titleInput.value = song.title;
        interpretInput.value = song.interpret;
        genreInput.value = song.genre;
        categoryInput.value = song.category;
        bpmInput.value = song.bpm;
        commentInput.value = song.comment;
        if (song.lyrics !== undefined) {
            Render.renderFile(song.lyrics, "osmdCanvasUpdate");
        }
        document.getElementById("inputFile").addEventListener("change", OSMDupload.handleFileSelectUpdate, false);

    }

    //Gibt den bearbeitetn Song zurück, dieser enthält bereits alle geupdateten Informationen
    static getEditedSongInformation() {
        let newFile = OSMDupload.getFile();
        if (newFile !== undefined) {
            lyricsInput = newFile;
        }
        return new Song(song.id, titleInput.value, interpretInput.value, genreInput.value, categoryInput.value, bpmInput.value, commentInput.value, lyricsInput, song.setlists);
    }

    /**
     *  Alle Setlisten, die den bearbeitetn Song beinhalten werden hier angepasst
     *  denn in den SEtlisten muss ebenfalls die neue Version des Songs abgespeichert werden
     * der alte SOng und der Songname werden durch den neuen Song ersetzt
     * @param {*} song dabei handelt es sich um den bearbeiteten Song
     * @returns ein Array mit allen Setlisten, die ebenfalls geupdatet werden
     */
    static getUpdatedSetlists(song) {
        let setlists = SetlistInput.getAllSetlists(),
            updatedSetlists = [];
        for (let i = 0; i < setlists.length; i++) {
            for (let j = 0; j < setlists[i].songs.length; j++) {
                if (setlists[i].songs[j].id.includes(song.id)) {
                    setlists[i].songNames.splice(j, 1, song.title);
                    setlists[i].songs.splice(j, 1, song);
                    updatedSetlists.push(setlists[i]);
                }
            }
        }
        return updatedSetlists;
    }
}

export default SongEdit;