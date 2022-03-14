/* eslint-env browser */
import SongInput from "./SongInput.js";
import SetlistInput from "../Setlist/SetlistInput.js";

var setlistsToUpdate = [];

class DeleteSongs {

    //View für einen Listeneintrag aller Songs wird erstellt --> mit Checkboxen um auszuwählen, welche Songs gelöscht werden sollen
    static createSongListElement(song) {
        let template = document.querySelector("#delete-song-entry-table"),
            clone,
            songlistTable,
            checkbox;

        template.content.querySelector("#delete-song-title-table").innerHTML = song.title;
        template.content.querySelector("#delete-song-interpret-table").innerHTML = song.interpret;
        template.content.querySelector("#delete-song-genre-table").innerHTML = song.genre;

        template.content.querySelector("#delete-song-entry-container-table").setAttribute("songId", song.id);
        checkbox = template.content.querySelector("#delete-song-checkbox");
        checkbox.setAttribute("songId", song.id);

        clone = template.content.cloneNode(true);
        songlistTable = document.querySelector("#songlist-delete-table");
        songlistTable.appendChild(clone);
    }

    /**
     * @returns Songs mit geklickter Checkbox werden zurückgegeben, dabei handelt es sich um alle Songs, die gelöscht werden sollen
     */
    static getAllSongsOnDelete() {
        let checkboxes = document.querySelectorAll("#delete-song-checkbox"),
            songsOnDelete = [],
            allSetlists = SetlistInput.getAllSetlists(),
            allSongs = SongInput.getAllSongs();

        //Iteration über alle Checkboxen --> identisch zur Länge aller Songs
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                let id = checkboxes[i].getAttribute("songId");
                //Iteration über alle Songs, um den passenden Song zur geklickten Checkbos herauszufinden
                // Wenn eine Übereinstimmung er Ids gefunden wird, wird der Song dem songsOnDelete-Array hinzugefügt
                for (let j = 0; j < allSongs.length; j++) {
                    if (allSongs[j].id === id) {
                        songsOnDelete.push(allSongs[j]);
                        //Iteration über alle Setlisten, um zu prüfen, ob sich der zu löschende Song in einer der Setlisten befindet
                        //Ist dies der Fall werden der SOng und SongName aus der Setlist entfernt
                        for (let k = 0; k < allSetlists.length; k++) {
                            for (let l = 0; l < allSetlists[k].songs.length; l++) {
                                if (allSetlists[k].songs[l].id.includes(id)) {
                                    allSetlists[k].removeSong(id);
                                    setlistsToUpdate.push(allSetlists[k]);
                                }
                            }
                        }
                    }
                }
            }
        }
        return songsOnDelete;
    }

    //Alle Setliste, die einen gelöschten SOng beinhalten müssen ebenfalls geupdatet werden --> diese Setlisten werden hier zurückgegeben
    static getAllSetlistsToUpdate() {
        return setlistsToUpdate;
    }
}
export default DeleteSongs;