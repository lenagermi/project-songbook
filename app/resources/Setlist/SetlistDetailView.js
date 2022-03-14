/* eslint-env browser */

var currentSetlist;
// ist für die Darstellung der Songs einer Setliste zuständig
class SetlistDetailView {

    constructor(setlist) {
        this.setlist = setlist;
        SetlistDetailView.createSetlistDetail(this.setlist);
    }

    // Einzelner Song wird in das Songeintrag-Template einer Setliste eingetragen, welches anschließend geklont wird
    static createSetlistDetail(setlist) {
        // löscht die bisherigen Kindelemente, also die Songs einer vorherigen playlist
        document.querySelector("#setlist-detail").innerHTML = "";
        document.querySelector("#setlist-name").innerHTML = setlist.title;
        document.querySelector("#setlistname-breadcrumb").innerHTML = setlist.title;

        let template = document.querySelector("#setlist-entry-detail"),
            clone,
            setlists;

        currentSetlist = setlist;

        // erstellt für alle Songelemente einer Setlist eine Detailansicht
        for (let i = 0; i < setlist.songs.length; i++) {
            template.content.querySelector("#song-title-detail").innerHTML = setlist.songs[i].title;
            template.content.querySelector("#song-detail").innerHTML = setlist.songs[i].interpret + " | " + setlist.songs[i].genre + " | " + setlist.songs[i].category + " | " + setlist.songs[i].bpm;

            clone = template.content.cloneNode(true);
            setlists = document.querySelector("#setlist-detail");
            setlists.appendChild(clone);
        }
    }

}
//Gibt die Setliste in der aktuellen Detailansicht zurück
function getSingleSetlist() {
    return currentSetlist;
}

export default SetlistDetailView;
export { getSingleSetlist };