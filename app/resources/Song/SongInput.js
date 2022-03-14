/* eslint-env browser */
/** Das Modul SongInput fängt die Eingaben des Users ab und speichert diese in einem Song. */

import Song from "./Song.js";
import SongView from "./SongView.js";
import SonglistView from "../Setlist/SonglistView.js";
import SetlistEdit from "../Setlist/SetlistEdit.js";
import DeleteSongs from "./DeleteSongs.js";
import OSMDupload from "../Uploads/fileSelectAndLoadOSMD.js";

// alle Songs werden erstmal hier gespeichert
var allSongs = [],
    // Anzeige der Songs in rosa-Box (Auflistung aller Songs)
    // wir benötigen beide Liste, da in den Arrays unterschiedlich Darstellungen gespeichert werden
    songViews = [],
    //Anzeige der Songs mit Checkbox bei der Setlisten-Erstellung (mit Checkboxen)
    songlistViews = [],
    //Anzeigen aller Songs mit Checkboxen um eine Setliste zu bearbeiten (mit Checkboxen --> kennzeichen ob Song aus Setliste gelöscht 
    //oder hinzugefügt wird) 
    songlistEditViews = [],
    //Anzeigen aller Songs in der Tabelle zum löschen der Songs (mit Checkboxen)
    songsToDeleteViews = [];

/** Die eingegebenen Informationen werden aus den Formularfeldern extrahiert und in einem neuen Song-Objekt gespeichert
 *  Dieses Objekt wird wiederrum dem Array allSongs hinzugefügt
 * für jeden Song wird beim Speichern der Daten ein View erstellt, welches dem Array songViews hinzugefügt wird
*/

class SongInput {

    static saveSongInput() {
        let titleInput = document.querySelector("#title-input"),
            interpretInput = document.querySelector("#interpret-input"),
            genreInput = document.querySelector("#genre-input"),
            categoryInput = document.querySelector("#category-input"),
            bpmInput = document.querySelector("#bpm-input"),
            commentInput = document.querySelector("#comment-input"),
            lyricsInput = OSMDupload.getFile(),
            newSong;
        if (bpmInput.value === "Wähle Beats per Minute") {
            bpmInput.value = "100";
        }

        newSong = new Song(null, titleInput.value, interpretInput.value, genreInput.value, categoryInput.value, bpmInput.value, commentInput.value, lyricsInput, null);

        initSongViews(newSong);
        titleInput.value = "";
        interpretInput.value = "";
        genreInput.value = "";
        categoryInput.value = "";
        bpmInput.value = "Wähle Beats per Minute";
        commentInput.value = "";
        allSongs.push(newSong);
        document.getElementById("files").value = null;
        document.getElementById("osmdCanvas").innerHTML = "";
        return newSong;
    }

    /**
     * Das Array allSongs wird ausgelesen, um alle Songs, die bereits in der DB gespeichert wurden anzuzeigen
     * Alle vier verschiedenen Views werden dazu angezeigt
     */
    static createViewsFromDB() {
        for (let i = 0; i < allSongs.length; i++) {
            initSongViews(allSongs[i]);
        }
    }

    //Alle songs werden aus der Datenbank zurückgegeben
    static getSongsFromDatabase(songs) {
        allSongs = songs;
    }

    //Bekomme alle Songs zurück, sowohl die bereits gespeicherten der DB und die neu hinzugefügten
    static getAllSongs() {
        return allSongs;
    }
}

//alle Views bekommen den neu hinzugefügten Song übergeben, sodass dieser angezeigt wird
function initSongViews(song) {
    let view = new SongView(song),
        songlistView = new SonglistView(song),
        songlistEditView = SetlistEdit.createSongListElement(song),
        songToDelete = DeleteSongs.createSongListElement(song);

    songViews.push(view);
    songlistEditViews.push(songlistEditView);
    songsToDeleteViews.push(songToDelete);
    songlistViews.push(songlistView);
}

export default SongInput;