/* eslint-env browser */

// ist für die Darstellung der Songs in der UI zuständig
class SongView {

    constructor(song) {
        this.song = song;
        SongView.createSongElement(this.song);
    }

    // Informationen eines Song-Objekts werden in ein das Songlist Template eingetragen welches anschließend geklont wird
    static createSongElement(song) {
        let template = document.querySelector("#song-entry"),
            clone, 
            songlist, 
            button;

        template.content.querySelector("#song-entry-title").innerHTML = song.title;
        template.content.querySelector("#song-entry-container").setAttribute("songId", song.id);
        template.content.querySelector("#song-entry-information").innerHTML = song.interpret + " | " + song.genre + " | " + song.category;
        button = template.content.querySelector("#info-button");
        button.setAttribute("songId", song.id);
  
        clone = template.content.cloneNode(true);
        songlist = document.querySelector("#songlist");
        songlist.appendChild(clone);
    }
}

export default SongView;