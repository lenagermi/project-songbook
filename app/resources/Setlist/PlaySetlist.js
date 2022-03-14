/* eslint-env browser */
import Template from "../Template/Template.js";
import Render from "../Uploads/Render.js";
import { getSingleSetlist } from "./SetlistDetailView.js";

let VELOCITY_CONST = 5000,
    TIME_OUT = 2000,
    CONST_TWO = 2,
    CONST_THREE = 3;
var currentSetlist , songFiles, el, bpm, pause, pausePosition, pauseId;

class PlaySetlist {
    // alle Buttons des Templates werden initialisiert und Click-Listener registriert
    static initPlayBtns() {
        let playNavBtn = document.querySelector("#setlist-play-btn"),
            playSetlistBtn = document.querySelector("#play-current-setlist-btn"),
            skipLeftBtn = document.querySelector("#skip-left-current-setlist-btn"),
            pauseBtn = document.querySelector("#pause-current-setlist-btn"),
            skipRightBtn = document.querySelector("#skip-right-current-setlist-btn"),
            stopBtn = document.querySelector("#stop-current-setlist-btn");
        playNavBtn.addEventListener("click", initSetlistPlayUI);
        playSetlistBtn.addEventListener("click", startPlaySetlist);
        pauseBtn.addEventListener("click", pauseSetlist);
        stopBtn.addEventListener("click", stopSetlist);
        skipRightBtn.addEventListener("click", skipRight);
        skipLeftBtn.addEventListener("click", skipLeft);

    }
}
/* das richtige Template wird angezeigt mit Setlist + Songs
 * Array mit Songfiles für das Abspielen wird befüllt
 * bpm werden in zusätzlichen Array gespeichert, damit jeder Song in entsprechender Geschwindigkeit abgespielt werden kann
*/
function initSetlistPlayUI() {
    // Arrays werden geleert, dass bei einer neuen Setliste, diese Songs gespeichert werden können
    songFiles=[]; 
    // Geschwindigkeit des Songs
    bpm = [];
    pause = false;
    document.querySelector("#osmdCanvasSetlistPlay").innerHTML = "";
    document.getElementById("info-play-setlist").style.display = "block";
    Template.showPlaySetlistTemplate();
    createSongToPlayElement();
    for (let i = 0; i < currentSetlist.songs.length; i++) {
        songFiles.push(currentSetlist.songs[i].lyrics);
        bpm.push(currentSetlist.songs[i].bpm);
    }
    el = document.querySelector("#scrollable-setlist-play-div");

}
/**Template wird mit Songelement befüllt und angezeigt:
 * Übersicht mit Songs die abgespielt werden
 */
function createSongToPlayElement() {
    let template = document.querySelector("#song-to-play-template"),
        clone,
        songlistTable = document.querySelector("#songs-to-play");
    currentSetlist = getSingleSetlist();

    while (songlistTable.hasChildNodes()) {
        songlistTable.firstChild.remove();
    }

    for (let i = 0; i < currentSetlist.songs.length; i++) {
        let rank = i;
        template.content.querySelector("#song-to-play-rank").innerHTML = rank + 1 + ".";
        template.content.querySelector("#song-to-play-title").innerHTML = currentSetlist.songs[i].title;
        template.content.querySelector("#song-to-play-container-table").setAttribute("songId", currentSetlist.songs[i].id);

        clone = template.content.cloneNode(true);
        songlistTable.appendChild(clone);

    }

}
/**wird der Play-Button gedrückt, wird diese Methode aufgerufen
 * erster Song der Setliste wird abgespielt
 * wurde die Setliste pausiert, wird die aktuelle Position gespeichert und bei Klick auf dem Play-Button an dieser Stelle weiter abgespielt 
 */
function startPlaySetlist() {
    if (!pause) {
        pauseId = 0;
        renderAndScrollSong(0);
        
        if(document.getElementById("info-play-setlist").style.display !== null){
            document.getElementById("info-play-setlist").style.display = "none";
        }
        
    } else if (pause) {
        // eslint-disable-next-line no-loop-func
        pause = false;
        let totalLyricsHeight = document.getElementById("osmdCanvasSetlistPlay").offsetHeight,
            promise;
        el.scrollTop = pausePosition;
        promise = smoothScrollTo(el, el.scrollTop + totalLyricsHeight, (VELOCITY_CONST * totalLyricsHeight) / bpm[pauseId], pauseId + 1);
        console.log(promise, "Promise");
    }

}

// aktueller Song wird gerendert
function renderSong(id) {
    pauseId = id;
    renderAndScrollSong(id);
}

// Abspielen des aktuellen Songs wird an aktueller Stelle wird pausiert
function pauseSetlist() {
    pausePosition = el.scrollTop;
    pause = true;
    el.scrollTop = pausePosition;
}

// Abspiellen der Setliste wird gestoppt und der erste Song wird wieder angezeigt
function stopSetlist() {
    pauseId = 0;
    Render.renderFile(songFiles[0], "osmdCanvasSetlistPlay");
    pause = false;
}

// aktueller Song wird geskipt und nächster Song wird abgespielt
function skipRight() {
    pause = false;
    if (pauseId < songFiles.length - 1) {
        pauseId++;
    } else {
        pauseId = 0;
    }
    renderAndScrollSong(pauseId);
}

// aktueller Song wird geskippt und vorheriger wird nochmal abgespiellt
function skipLeft() {
    pause = false;
    if (pauseId > 0) {
        pauseId--;
    } else {
        pauseId = songFiles.length - 1;
    }
    renderAndScrollSong(pauseId);
}

// rendert den aktuellen Song und scrollt diesen in richtiger Geschwindigkeit
function renderAndScrollSong(id) {
    Render.renderFile(songFiles[id], "osmdCanvasSetlistPlay");
    // eslint-disable-next-line no-loop-func
    setTimeout(() => {
        let totalLyricsHeight = document.getElementById("osmdCanvasSetlistPlay").offsetHeight;
        smoothScrollTo(el, el.scrollTop + totalLyricsHeight, (VELOCITY_CONST * totalLyricsHeight) / bpm[id], id + 1);
    }, TIME_OUT);
}

// sanftes weiches Scrollen des Songs
function smoothScrollTo(element, targetStart, durationStart, id) {

    let target = Math.round(targetStart),
        duration = Math.round(durationStart),
        startTime = Date.now(),
        endTime = startTime + duration,
        startTop = element.scrollTop,
        distance = target - startTop,
        smoothStep;

    if (duration < 0) {
        return Promise.reject("bad duration");
    }
    if (duration === 0) {
        element.scrollTop = target;
        return Promise.resolve();
    }

    // basiert auf http://en.wikipedia.org/wiki/Smoothstep
    smoothStep = function (start, end, point) {
        if (point <= start) { return 0; }
        if (point >= end) { return 1; }
        let x = (point - start) / (end - start); // Interpolation
        return x * x * (CONST_THREE - CONST_TWO * x);
    };

    // eslint-disable-next-line no-unused-vars
    return new Promise(function (resolve, reject) {
        // Dies dient dazu, den Überblick darüber zu behalten, wo der scrollTop des Elements sein soll,
        // basierend auf dem, was wir gerade tun
        var previousTop = element.scrollTop,

            scrollFrame = function () {
                if (element.scrollTop !== previousTop) {
                    resolve();
                    return;
                }
                // scrollTop für diesen Rahmen festlegen
                let now = Date.now(),
                    point = smoothStep(startTime, endTime, now),
                    frameTop = Math.round(startTop + (distance * point));
                element.scrollTop = frameTop;

                if (pause) {
                    resolve();
                    return;
                }
                /**wenn nicht mehr gescrollt werden kann, ist der Song bis zum Ende gescrollt worden
                 * darauf wird der Methode renderSong eine neue id übergeben und der nächste Song wird gerendert und gescrollt
                   */
                if (element.scrollTop === previousTop
                    && element.scrollTop !== frameTop) {
                    if (id < songFiles.length) {
                        renderSong(id);
                    }
                    resolve();
                    return;

                }
                previousTop = element.scrollTop;

                // den nächsten Rahmen für die Ausführung planen
                setTimeout(scrollFrame
                    , 0);
            };

        // den Animationsprozess ankurbeln
        setTimeout(scrollFrame
            , 0);
    });
}

export default PlaySetlist;

