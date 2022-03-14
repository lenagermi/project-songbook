/* eslint-env browser */
import Setlist from "./Setlist.js";
import { getSingleSetlist } from "./SetlistDetailView.js";
import SongInput from "../Song/SongInput.js";
import Template from "../Template/Template.js";

let setlist, updatedSongs = [];

class SetlistEdit {

    static editSingleSetlist() {
        setlist = getSingleSetlist();
        let checkboxes = document.querySelectorAll("#update-checkbox");
        //Setlistenname wird ins Menüband geschrieben
        document.querySelector("#setlist-name-input-update").value = setlist.title;
        //Alle Checkboxen der Songs in einer Setlisten werden gechecked
        for (let i = 0; i < checkboxes.length; i++) {
            let checkboxId = checkboxes[i].getAttribute("songId");
            for (let j = 0; j < setlist.songs.length; j++) {
                if (setlist.songs[j].id === checkboxId) {
                    checkboxes[i].checked = true;
                }
            }
        }
        Template.showSetlistUpdateTemplate();
    }

    //View zu einem Song mit Checkbox wird erstellt, dieses View dient um alle Songs mit Checkbox anzuzeigen(Tabelle),
    //um diese zu einer Setliste hinzuzufügen oder aus dieser zu löschen
    static createSongListElement(song) {
        let template = document.querySelector("#update-song-setlist-template"),
            clone, songlistTable, checkbox;

        template.content.querySelector("#update-title-table").innerHTML = song.title;
        template.content.querySelector("#update-interpret-table").innerHTML = song.interpret;
        template.content.querySelector("#update-genre-table").innerHTML = song.genre;

        template.content.querySelector("#update-setlist-container-table").setAttribute("songId", song.id);

        checkbox = template.content.querySelector("#update-checkbox");
        checkbox.setAttribute("songId", song.id);

        clone = template.content.cloneNode(true);
        songlistTable = document.querySelector("#update-setlist-table");
        songlistTable.appendChild(clone);
    }

    /**
     * Es wird über alle Checkboxen iteriert
     * 1. gecklickte Checkboxen bedeuten Song wird zur Seƒtlise hinzugefügt bzw. bleibt in der Setliste
     * 2. Es wird überprüft, ob ein Song neu zur Setliste hinzugefügt wurde oder bereits in der Setliste war
     * 2.1 War der Song noch nicht in der Setliste, wird dem Song die ID der Setliste hinzugefügt
     * 3. Wenn ein nicht geklickter Song, die Id der Setliste besitzt, bedeutet das, dass dieser Song aus der Setliste gelöscht wird
     *    Deshalb muss der Song geupdatet werden, indem die Id der Setliste aus dem Song gelöscht wird
     * @returns die bearbeitete Setliste wird zurückgegeben
     */
    static getEditedSetlistInformation() {
        let setlistTitle = document.querySelector("#setlist-name-input-update"),
            checkboxes = document.querySelectorAll("#update-checkbox"),
            editedSetlist = new Setlist(setlist.id, setlistTitle.value),
            songlist = SongInput.getAllSongs();

        for (let i = 0; i < checkboxes.length; i++) {
            let song = songlist[i];
            if (checkboxes[i].checked) {
                let id = checkboxes[i].getAttribute("songId");
                if (songlist[i].id === id) {
                    editedSetlist.addSong(song);
                    if (!song.setlists.includes(setlist.id)) {
                        song.addSetlistId(setlist.id);
                        updatedSongs.push(song);
                    }
                }
            } else if (song.setlists.includes(setlist.id)) {
                song.removeSetlistId(setlist.id);
                updatedSongs.push(song);
            }
        }
        return editedSetlist;
    }

    //Songs die neu zu einer Setliste hinzugekommen sind oder auch aus der Setliste gelöscht wurden, werden zurückgegeben
    static getUpdatedSongs() {
        return updatedSongs;
    }
}

export default SetlistEdit;