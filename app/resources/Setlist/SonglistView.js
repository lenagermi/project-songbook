/* eslint-env browser */

// ist für die Darstellung der Liste aller Songs bei der Erstellung einer Setliste zuständig
class SonglistView {
    constructor(song) {
        this.song = song;
        SonglistView.createSongListElement(this.song);
    }

    // Informationen eines Song-Objekts werden in ein Songlist-Template eingetragen welches anschließend geklont wird
    static createSongListElement(song) {
        let template = document.querySelector("#song-entry-table"),
            clone,
            songlistTable,
            detailButton,
            checkbox;

        template.content.querySelector("#title-table").innerHTML = song.title;
        template.content.querySelector("#interpret-table").innerHTML = song.interpret;
        template.content.querySelector("#genre-table").innerHTML = song.genre;
        template.content.querySelector("#song-entry-container-table").setAttribute("songId", song.id);

        detailButton = template.content.querySelector("#detail-button");
        detailButton.setAttribute("songId", song.id);

        checkbox = template.content.querySelector("#checkbox");
        checkbox.setAttribute("songId", song.id);

        clone = template.content.cloneNode(true);
        songlistTable = document.querySelector("#songlist-table");
        songlistTable.appendChild(clone);
    }
}

export default SonglistView;