/* eslint-env browser */

// ist für die Darstellung der Setlisten zuständig
class SetlistView {

    constructor(setlist) {
        this.setlist = setlist;
        SetlistView.createSetlistElement(this.setlist);

    }

    // Informationen eines Setlist-Objekts werden in ein das Setlist Template eingetragen welches anschließend geklont wird
    static createSetlistElement(setlist) {
        let template = document.querySelector("#setlist-entry"),
            clone,
            setlists,
            setlistSongsView,
            setlistInfoButton;

        setlistSongsView = template.content.querySelector("#setlist-songs");
        template.content.querySelector("#setlist-title").innerHTML = setlist.title;

        setlistInfoButton = template.content.querySelector("#setlist-info-button");
        setlistInfoButton.setAttribute("setlistId", setlist.id);

        // Hat der Setlist-Container bereits Songeinträge gespeichert, werden diese entfernt, bevor eine neue Setliste erstellt wird
        while (setlistSongsView.hasChildNodes()) {
            setlistSongsView.firstChild.remove();
        }

        // Alle Songs, die beim Erstellen der Setliste hinzugefügt werden, werden untereinander im Setlist-Container eingetragen
        for (let i = 0; i < setlist.songNames.length; i++) {
            let songEntry = document.createElement("p"),
                mybreak = document.createElement("br"),
                text = document.createTextNode(setlist.songNames[i]);

            setlistSongsView.appendChild(songEntry.appendChild(text));
            setlistSongsView.appendChild(songEntry.appendChild(mybreak));
        }
        clone = template.content.cloneNode(true);
        setlists = document.querySelector("#setlist");
        setlists.appendChild(clone);
    }
}

export default SetlistView;