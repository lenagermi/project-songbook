/* eslint-env browser */
import SetlistInput from "./SetlistInput.js";
import SongInput from "../Song/SongInput.js";

let songsToUpdate = [];

class DeleteSetlists {

    static createSetlistElement(setlist) {
        let template = document.querySelector("#setlist-delete-table"),
            clone, setlistTable, checkbox;

        template.content.querySelector("#delete-setlist-title-table").innerHTML = setlist.title;
        template.content.querySelector("#delete-setlist-container-table").setAttribute("setlistId", setlist.id);

        checkbox = template.content.querySelector("#delete-setlist-checkbox");
        checkbox.setAttribute("setlistId", setlist.id);

        clone = template.content.cloneNode(true);
        setlistTable = document.querySelector("#delete-setlist-table");
        setlistTable.appendChild(clone);
    }

    static getAllSetlistsOnDelete() {
        let checkboxes = document.querySelectorAll("#delete-setlist-checkbox"),
            setlistsOnDelete = [],
            allSetlists = SetlistInput.getAllSetlists(),
            allSongs = SongInput.getAllSongs();
        //Iteration über alle Checkboxen --> identisch zur Länge aller Setlisten
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                let id = checkboxes[i].getAttribute("setlistId");
                //Suche nach den zugehörigen Setlists zu den geklickten Checkboxen
                for (let j = 0; j < allSetlists.length; j++) {
                    if (allSetlists[j].id === id) {
                        setlistsOnDelete.push(allSetlists[j]);
                        //Alle Songs in denen eine der gelöschten Setlisten vorkommt wird bearbeitet
                        for (let k = 0; k < allSongs.length; k++) {
                            if (allSongs[k].setlists.includes(id)) {
                                allSongs[k].removeSetlistId(id);
                                songsToUpdate.push(allSongs[k]);
                            }
                        }
                    }
                }
            }
        }
        return setlistsOnDelete;
    }
    //In Songs werden die Ids aller Setlisten gespeichert, in der der Song vorkommt
    //werden Setlisten gelöscht, müssen die Ids ebenfalls entfernt werden
    static getAllSongsToUpdate() {
        return songsToUpdate;
    }

}

export default DeleteSetlists;