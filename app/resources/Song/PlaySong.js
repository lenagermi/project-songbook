/* eslint-env browser */
import Template from "../Template/Template.js";
import SongInformation from "../Song/SongInformation.js";
import Render from "../Uploads/Render.js";

const SCROLL_VELOCITY = 5000;
var el, totalLyricsHeight, pause;
class PlaySong {

    static initPlayBtn() {
        let playMenuBtn = document.querySelector("#song-play-btn"),
            playCurrentSongBtn = document.querySelector("#play-current-song-btn"),
            stopBtn = document.getElementById("stop-current-song-btn"),
            pauseBtn = document.getElementById("pause-current-song-btn");
        playMenuBtn.addEventListener("click", initPlaySongUI);
        playCurrentSongBtn.addEventListener("click", playSong);
        stopBtn.addEventListener("click", stopSong);
        pauseBtn.addEventListener("click", pauseSong);
    }
}

function initPlaySongUI() {
    let song = SongInformation.getSingleSong();
    if (song.lyrics !== undefined) {
        Render.renderFile(song.lyrics, "osmdCanvasPlay");
    }
    Template.showPlaySongTemplate();
}

function playSong() {
    pause = false;
    el = document.getElementById("scrollable-div");
    let currentSong = SongInformation.getSingleSong(),
        bpm = currentSong.bpm;
    totalLyricsHeight = document.getElementById("osmdCanvasPlay").offsetHeight;
    smoothScrollTo(el, el.scrollTop + totalLyricsHeight, (SCROLL_VELOCITY * totalLyricsHeight) / bpm);
}

function stopSong() {
    el.scrollTop = 0;
}

function pauseSong() {
    let pausePosition = el.scrollTop;
    pause = true;
    el.scrollTop = pausePosition;
}

/*Sanftes Scrollen des Elements zum angegebenen Ziel (element.scrollTop)
für die angegebene Dauer

Gibt ein Promise zurück, das erfüllt wird, wenn es fertig ist
von https://stackoverflow.com/questions/15615552/get-div-height-with-plain-javascript?rq=1
*/
function smoothScrollTo(element, targetStart, durationStart) {
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

    // von http://en.wikipedia.org/wiki/Smoothstep
    smoothStep = function (start, end, point) {
        if (point <= start) { return 0; }
        if (point >= end) { return 1; }
        let x = (point - start) / (end - start); // interpolation
        return x * x * (3 - 2 * x);
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

                /*wenn nicht mehr gescrollt werden kann, ist der Song bis zum Ende gescrollt worden
                 * Methode stop-Song wird aufgerufen, wodurch der Song auf die Startposition zurückgesetzt wird
                 */
                if (element.scrollTop === previousTop
                    && element.scrollTop !== frameTop) {
                    stopSong();
                    resolve();
                    return;
                }
                previousTop = element.scrollTop;

                // den nächsten Frame für die Ausführung planen
                setTimeout(scrollFrame
                    , 0);
            };

        // den Animationsprozess ankurbeln
        setTimeout(scrollFrame
            , 0);
    });
}

export default PlaySong;