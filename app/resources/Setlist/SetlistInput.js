import Setlist from "./Setlist.js";
import SetlistView from "./SetlistView.js";
import SongInput from "../Song/SongInput.js";
import SetlistDetailView from "./SetlistDetailView.js";
import DeleteSetlists from "./DeleteSetlists.js";
import Template from "../Template/Template.js";

var allSetlistViews = [],
    allDetailViews = [],
    allSetlists = [],
    deleteSetlistViews = [];

/**
 * 
 * @returns eine Setlist
 * Der Name der Setliste wird aus dem Eingabefeld entnommen
 * Alle Songs, die in der Setliste gespeichert werden sollen, werden mit der Checkbox gekennzeichnet
 */
class SetlistInput {

    static saveSetlistInput() {
        let setlistTitle = document.querySelector("#setlist-name-input"),
            checkboxes = document.querySelectorAll("#checkbox"),
            setlist = new Setlist(null, setlistTitle.value),
            songlist = SongInput.getAllSongs();

        //Wenn eine Checkbox geklickt wird, wird derentsprechende Song zur Setliste hinzugefügt
        //Außerdem wird die Setlisten ID zu dem Song hinzugefügt
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                let id = checkboxes[i].getAttribute("songId"),
                    song;

                for (let i = 0; i < songlist.length; i++) {
                    if (songlist[i].id === id) {
                        song = songlist[i];
                    }
                }
                setlist.addSong(song);
                song.addSetlistId(setlist.id);
            }
        }
        initSetlistViews(setlist);
        setlistTitle.value = "";
        initInfoButton();
        uncheckAll();
        allSetlists.push(setlist);
        return setlist;
    }

    // Setlisten die bereits in Datenbank gespeichert wurden
    static createViewsFromDB() {
        for (let i = 0; i < allSetlists.length; i++) {
            initSetlistViews(allSetlists[i]);
        }
        initInfoButton();
    }

    static getSetlistsFromDatabase(setlists) {
        allSetlists = setlists;
    }

    static getAllSetlists() {
        return allSetlists;
    }

}
//Views für Setlisten werden initialisiert
function initSetlistViews(setlist) {
    let setlistView = new SetlistView(setlist),
        deleteSetlistView = DeleteSetlists.createSetlistElement(setlist);

    allSetlistViews.push(setlistView);
    deleteSetlistViews.push(deleteSetlistView);
}

function uncheckAll() {
    var inputs = document.querySelectorAll("#checkbox");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].checked = false;
    }
}

function initInfoButton() {
    let setlistDetailBtn = document.querySelectorAll("#setlist-info-button");
    for (let i = 0; i < setlistDetailBtn.length; i++) {
        setlistDetailBtn[i].addEventListener("click", showSetlistDetail);
    }
}
/**
     * Beim Klick auf den Infobutton einer Setliste wird die Setliste im Detail angezeigt (alle einzelnen Songs, die enthalten sind)
     * vorherige Kindelemente werden in der Klasse SetlistDetailView gelöscht
     */
function showSetlistDetail() {
    Template.showSetlistDetailTemplate();
    let element = this,
        id = element.getAttribute("setlistId"),
        setlists = allSetlists,
        setlistDetailView;

    for (let i = 0; i < setlists.length; i++) {
        if (setlists[i].id === id) {
            setlistDetailView = new SetlistDetailView(setlists[i]);
        }
    }
    allDetailViews.push(setlistDetailView);

}

export default SetlistInput;
