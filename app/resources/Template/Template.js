/* eslint-env browser*/

class Template {
    static initTemplates() {
        let deleteSongsTrashBtn = document.querySelector("#delete-songs-btn-trash-icon"),
            deleteSetlistsTrashBtn = document.querySelector("#delete-setlists-btn-trash-icon"),
            addSongIconBtn = document.querySelector("#add-songs-btn-icon"),
            addSetlistIconBtn = document.querySelector("#add-setlist-btn-icon"),
            songMenuBtn = document.querySelector("#song-menu"),
            setlistMenuBtn = document.querySelector("#setlist-menu"),
            propertyMenuBtn = document.querySelector("#property-menu");
            
        deleteSongsTrashBtn.addEventListener("click", showSongsDeleteTemplate);
        deleteSetlistsTrashBtn.addEventListener("click", showSetlistsDeleteTemplate);
        songMenuBtn.addEventListener("click", showSongTemplate);
        addSongIconBtn.addEventListener("click", showSongEntryTemplate);
        addSetlistIconBtn.addEventListener("click", showSetlistEntryTemplate);
        setlistMenuBtn.addEventListener("click", showSetlistTemplate);
        propertyMenuBtn.addEventListener("click", showPropertyTemplate);
       
    }

    static showSetlistDetailTemplate() {
        document.getElementById("setlist-detail-template").style.display = "block";
        document.getElementById("songinformation-template").style.display = "none";
        document.getElementById("song-entry-template").style.display = "none";
        document.getElementById("songlist-template").style.display = "none";
        document.getElementById("song-delete-template").style.display = "none";
        document.getElementById("song-update-template").style.display = "none";
        document.getElementById("setlist-template").style.display = "none";
        document.getElementById("property-template").style.display = "none";
        document.getElementById("delete-setlist-template").style.display = "none";
        document.getElementById("create-setlist-template").style.display = "none";
        document.getElementById("update-setlist-template").style.display = "none";
        document.getElementById("play-song-template").style.display = "none";
        document.getElementById("play-setlist-template").style.display = "none";
    }

    static showSongDetailTemplates() {
        document.getElementById("songinformation-template").style.display = "block";
        document.getElementById("song-entry-template").style.display = "none";
        document.getElementById("songlist-template").style.display = "none";
        document.getElementById("song-delete-template").style.display = "none";
        document.getElementById("song-update-template").style.display = "none";
        document.getElementById("setlist-template").style.display = "none";
        document.getElementById("property-template").style.display = "none";
        document.getElementById("delete-setlist-template").style.display = "none";
        document.getElementById("create-setlist-template").style.display = "none";
        document.getElementById("setlist-detail-template").style.display = "none";
        document.getElementById("update-setlist-template").style.display = "none";
        document.getElementById("play-song-template").style.display = "none";
        document.getElementById("play-setlist-template").style.display = "none";

    }

    static showSongUpdateTemplate() {
        document.getElementById("song-update-template").style.display = "block";
        document.getElementById("song-entry-template").style.display = "none";
        document.getElementById("songlist-template").style.display = "none";
        document.getElementById("song-delete-template").style.display = "none";
        document.getElementById("songinformation-template").style.display = "none";
        document.getElementById("setlist-template").style.display = "none";
        document.getElementById("property-template").style.display = "none";
        document.getElementById("delete-setlist-template").style.display = "none";
        document.getElementById("create-setlist-template").style.display = "none";
        document.getElementById("setlist-detail-template").style.display = "none";
        document.getElementById("update-setlist-template").style.display = "none";
        document.getElementById("play-song-template").style.display = "none";
        document.getElementById("play-setlist-template").style.display = "none";
    }

    static showSetlistUpdateTemplate() {
        document.getElementById("update-setlist-template").style.display = "block";
        document.getElementById("song-update-template").style.display = "none";
        document.getElementById("song-entry-template").style.display = "none";
        document.getElementById("songlist-template").style.display = "none";
        document.getElementById("song-delete-template").style.display = "none";
        document.getElementById("songinformation-template").style.display = "none";
        document.getElementById("setlist-template").style.display = "none";
        document.getElementById("property-template").style.display = "none";
        document.getElementById("delete-setlist-template").style.display = "none";
        document.getElementById("create-setlist-template").style.display = "none";
        document.getElementById("setlist-detail-template").style.display = "none";
        document.getElementById("play-song-template").style.display = "none";
        document.getElementById("play-setlist-template").style.display = "none";
    }
    
    static showPlaySongTemplate() {
        document.getElementById("play-song-template").style.display = "block";
        document.getElementById("create-setlist-template").style.display = "none";
        document.getElementById("delete-setlist-template").style.display = "none";
        document.getElementById("property-template").style.display = "none";
        document.getElementById("setlist-template").style.display = "none";
        document.getElementById("song-entry-template").style.display = "none";
        document.getElementById("songlist-template").style.display = "none";
        document.getElementById("song-delete-template").style.display = "none";
        document.getElementById("songinformation-template").style.display = "none";
        document.getElementById("song-update-template").style.display = "none";
        document.getElementById("setlist-detail-template").style.display = "none";
        document.getElementById("update-setlist-template").style.display = "none";
        document.getElementById("play-setlist-template").style.display = "none";
    }

    static showPlaySetlistTemplate() {
        document.getElementById("play-song-template").style.display = "none";
        document.getElementById("create-setlist-template").style.display = "none";
        document.getElementById("delete-setlist-template").style.display = "none";
        document.getElementById("property-template").style.display = "none";
        document.getElementById("setlist-template").style.display = "none";
        document.getElementById("song-entry-template").style.display = "none";
        document.getElementById("songlist-template").style.display = "none";
        document.getElementById("song-delete-template").style.display = "none";
        document.getElementById("songinformation-template").style.display = "none";
        document.getElementById("song-update-template").style.display = "none";
        document.getElementById("setlist-detail-template").style.display = "none";
        document.getElementById("update-setlist-template").style.display = "none";
        document.getElementById("play-setlist-template").style.display = "block";
    }
}

function showSongsDeleteTemplate() {
    document.getElementById("song-delete-template").style.display = "block";
    document.getElementById("songlist-template").style.display = "none";
    document.getElementById("song-entry-template").style.display = "none";
    document.getElementById("songinformation-template").style.display = "none";
    document.getElementById("song-update-template").style.display = "none";
    document.getElementById("setlist-template").style.display = "none";
    document.getElementById("property-template").style.display = "none";
    document.getElementById("delete-setlist-template").style.display = "none";
    document.getElementById("create-setlist-template").style.display = "none";
    document.getElementById("setlist-detail-template").style.display = "none";
    document.getElementById("update-setlist-template").style.display = "none";
    document.getElementById("play-song-template").style.display = "none";
    document.getElementById("play-setlist-template").style.display = "none";

}

function showSongTemplate() {
    document.getElementById("songlist-template").style.display = "block";
    document.getElementById("song-delete-template").style.display = "none";
    document.getElementById("song-entry-template").style.display = "none";
    document.getElementById("songinformation-template").style.display = "none";
    document.getElementById("song-update-template").style.display = "none";
    document.getElementById("setlist-template").style.display = "none";
    document.getElementById("property-template").style.display = "none";
    document.getElementById("delete-setlist-template").style.display = "none";
    document.getElementById("create-setlist-template").style.display = "none";
    document.getElementById("setlist-detail-template").style.display = "none";
    document.getElementById("update-setlist-template").style.display = "none";
    document.getElementById("play-song-template").style.display = "none";
    document.getElementById("play-setlist-template").style.display = "none";
}

function showSongEntryTemplate() {
    document.getElementById("song-entry-template").style.display = "block";
    document.getElementById("songlist-template").style.display = "none";
    document.getElementById("song-delete-template").style.display = "none";
    document.getElementById("songinformation-template").style.display = "none";
    document.getElementById("song-update-template").style.display = "none";
    document.getElementById("setlist-template").style.display = "none";
    document.getElementById("property-template").style.display = "none";
    document.getElementById("delete-setlist-template").style.display = "none";
    document.getElementById("create-setlist-template").style.display = "none";
    document.getElementById("setlist-detail-template").style.display = "none";
    document.getElementById("update-setlist-template").style.display = "none";
    document.getElementById("play-song-template").style.display = "none";
    document.getElementById("play-setlist-template").style.display = "none";
}

function showSetlistTemplate() {
    document.getElementById("setlist-template").style.display = "block";
    document.getElementById("song-entry-template").style.display = "none";
    document.getElementById("songlist-template").style.display = "none";
    document.getElementById("song-delete-template").style.display = "none";
    document.getElementById("songinformation-template").style.display = "none";
    document.getElementById("song-update-template").style.display = "none";
    document.getElementById("property-template").style.display = "none";
    document.getElementById("delete-setlist-template").style.display = "none";
    document.getElementById("create-setlist-template").style.display = "none";
    document.getElementById("setlist-detail-template").style.display = "none";
    document.getElementById("update-setlist-template").style.display = "none";
    document.getElementById("play-song-template").style.display = "none";
    document.getElementById("play-setlist-template").style.display = "none";
}

function showPropertyTemplate() {
    document.getElementById("property-template").style.display = "block";
    document.getElementById("setlist-template").style.display = "none";
    document.getElementById("song-entry-template").style.display = "none";
    document.getElementById("songlist-template").style.display = "none";
    document.getElementById("song-delete-template").style.display = "none";
    document.getElementById("songinformation-template").style.display = "none";
    document.getElementById("song-update-template").style.display = "none";
    document.getElementById("delete-setlist-template").style.display = "none";
    document.getElementById("create-setlist-template").style.display = "none";
    document.getElementById("setlist-detail-template").style.display = "none";
    document.getElementById("update-setlist-template").style.display = "none";
    document.getElementById("play-song-template").style.display = "none";
    document.getElementById("play-setlist-template").style.display = "none";

}

function showSetlistsDeleteTemplate() {
    document.getElementById("delete-setlist-template").style.display = "block";
    document.getElementById("property-template").style.display = "none";
    document.getElementById("setlist-template").style.display = "none";
    document.getElementById("song-entry-template").style.display = "none";
    document.getElementById("songlist-template").style.display = "none";
    document.getElementById("song-delete-template").style.display = "none";
    document.getElementById("songinformation-template").style.display = "none";
    document.getElementById("song-update-template").style.display = "none";
    document.getElementById("create-setlist-template").style.display = "none";
    document.getElementById("setlist-detail-template").style.display = "none";
    document.getElementById("update-setlist-template").style.display = "none";
    document.getElementById("play-song-template").style.display = "none";
    document.getElementById("play-setlist-template").style.display = "none";
}

function showSetlistEntryTemplate() {
    document.getElementById("create-setlist-template").style.display = "block";
    document.getElementById("delete-setlist-template").style.display = "none";
    document.getElementById("property-template").style.display = "none";
    document.getElementById("setlist-template").style.display = "none";
    document.getElementById("song-entry-template").style.display = "none";
    document.getElementById("songlist-template").style.display = "none";
    document.getElementById("song-delete-template").style.display = "none";
    document.getElementById("songinformation-template").style.display = "none";
    document.getElementById("song-update-template").style.display = "none";
    document.getElementById("setlist-detail-template").style.display = "none";
    document.getElementById("update-setlist-template").style.display = "none";
    document.getElementById("play-song-template").style.display = "none";
    document.getElementById("play-setlist-template").style.display = "none";
}

export default Template;
export { showSetlistTemplate };
export { showSongTemplate };