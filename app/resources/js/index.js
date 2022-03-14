/* eslint-env browser */

import Logger from "../Utils/Logger.js";
import DBConnector from "../DB/DBConnector.js";
import Template from "../Template/Template.js";
import OSMDupload from "../Uploads/fileSelectAndLoadOSMD.js";
import PlaySong from "../Song/PlaySong.js";
import SongInput from "../Song/SongInput.js";
import SongInformation from "../Song/SongInformation.js";
import SongEdit from "../Song/SongEdit.js";
import DeleteSongs from "../Song/DeleteSongs.js";
import SetlistEdit from "../Setlist/SetlistEdit.js";
import DeleteSetlists from "../Setlist/DeleteSetlists.js";
import SetlistInput from "../Setlist/SetlistInput.js";
import PlaySetlist from "../Setlist/PlaySetlist.js";
import { getSingleSetlist } from "../Setlist/SetlistDetailView.js";
import { initInfoButtons } from "../Song/Song.js";
import { initBreadcrumbsButtons } from "../Breadcrumbs/Breadcrumbs.js";
import { showSetlistTemplate } from "../Template/Template.js";
import { showSongTemplate } from "../Template/Template.js";
import { changeTheme } from "../Properties/Theme.js";

var db;

function init() {
	Logger.enable();
	initDatabase();
}

function initDatabase() {
	db = new DBConnector(DBConnector.INDEXED_DB_STRATEGY);
	return new Promise(function (resolve, reject) {
		db.open(true).then(function () {
			db.getSongs().then(function (result) {
				/* lädt die bisher gespeicherten Songs aus der Datenbank 
				 * übergibt sie in dem Modul Song-Input der Liste aller songs*/
				SongInput.getSongsFromDatabase(result);
				resolve(result);
			});
			db.getSetlists().then(function (result) {
				/* lädt die bisher gespeicherten Setlisten aus der Datenbank 
				 * übergibt sie in dem Modul Setlist-Input der Liste aller Setlisten*/
				SetlistInput.getSetlistsFromDatabase(result);
				initUI();
				resolve(result);
			});
		}).catch(function (error) {
			reject(error);
		});
	});
}

function initUI() {
	changeTheme();
	SongInput.createViewsFromDB();
	SetlistInput.createViewsFromDB();
	initButtons();
	initInfoButtons();
	// File-Upload wird initialisiert
	document.getElementById("files").addEventListener("change", OSMDupload.handleFileSelect, false);
}

function initButtons() {
	//Button zum Speichern der eingegebenen Songinformationen wird initialisiert.
	let saveBtn = document.querySelector("#save-button"),
		saveSetlistBtn = document.querySelector("#save-setlist-button"),
		themeInput = document.querySelector("#theme-input"),
		deleteBtnSongDetailInfo = document.querySelector("#delete-btn-song-detail-info"),
		deleteBtnSetlistDetailInfo = document.querySelector("#delete-setlist-btn-setlist-detail-info"),
		songEditBtn = document.querySelector("#song-edit-btn"),
		updateSongBtnSubmit = document.querySelector("#update-btn"),
		setlistEditBtn = document.querySelector("#setlist-edit-btn"),
		submitUpdatesOnSetlist = document.querySelector("#save-setlist-button-update"),
		deleteSetlistsBtn = document.querySelector("#delete-setlist-button"),
		deleteSongsBtn = document.querySelector("#delete-songs-button");

	initBreadcrumbsButtons();
	Template.initTemplates();
	PlaySong.initPlayBtn();
	PlaySetlist.initPlayBtns();
	saveBtn.addEventListener("click", saveSong);
	// wird der Button geklickt, werden die eingegebenen Daten gespeichert
	saveSetlistBtn.addEventListener("click", saveSetlist);
	deleteBtnSongDetailInfo.addEventListener("click", deleteSingleSong);
	themeInput.addEventListener("change", changeTheme);
	deleteBtnSetlistDetailInfo.addEventListener("click", deleteSingleSetlist);
	songEditBtn.addEventListener("click", SongEdit.editSingleSong);
	updateSongBtnSubmit.addEventListener("click", updateSong);
	setlistEditBtn.addEventListener("click", SetlistEdit.editSingleSetlist);
	submitUpdatesOnSetlist.addEventListener("click", updateSetlist);
	deleteSetlistsBtn.addEventListener("click", deleteSetlists);
	deleteSongsBtn.addEventListener("click", deleteSongs);

}

// neuer Song wird hinzugefügt
function saveSong() {
	let newSong = SongInput.saveSongInput();
	// Button in der Songliste für jeden einzelnen Song wird mit Eventlistner belegt
	initInfoButtons();
	db.createSong(newSong);
	showSongTemplate();
}

// neuer Setlist wird hinzugefügt
function saveSetlist() {
	let newSetlist = SetlistInput.saveSetlistInput();
	db.createSetlist(newSetlist);
	showSetlistTemplate();
}

// Ein Song und all seine Referenzen werden gelöscht
function deleteSingleSong() {
	// alert der Nachfragt, ob Song wirklich gelöscht werden soll
	// eslint-disable-next-line no-alert
	let confirmAction = confirm("Willst du diesen Song wirklich löschen?"),
		song = SongInformation.getSingleSong(),
		setlists = SetlistInput.getAllSetlists();
	if (confirmAction) {
		for (let i = 0; i < setlists.length; i++) {
			for (let j = 0; j < setlists[i].songs.length; j++) {
				if (setlists[i].songs[j].id === song.id) {
					setlists[i].removeSong(song.id);
					db.updateSetlist(setlists[i]);
				}
			}
		}
		db.removeSong(song);
		// eslint-disable-next-line no-alert
		alert("Song wurde erfolgreich gelöscht");
		location.reload();
	} else {
		// eslint-disable-next-line no-alert
		alert("Song wurde nicht gelöscht");
	}
}

function deleteSongs() {
	// eslint-disable-next-line no-alert
	let confirmAction = confirm("Willst du diese Songs wirklich löschen?"),
		songsOnDelete = DeleteSongs.getAllSongsOnDelete(),
		setlistsToUpdate = DeleteSongs.getAllSetlistsToUpdate();

	if (confirmAction) {
		for (let i = 0; i < songsOnDelete.length; i++) {
			db.removeSong(songsOnDelete[i]);
		}
		for (let i = 0; i < setlistsToUpdate.length; i++) {
			db.updateSetlist(setlistsToUpdate[i]);
		}
		location.reload();
		// eslint-disable-next-line no-alert
		alert("Songs wurden erfolgreich gelöscht");
	} else {
		// eslint-disable-next-line no-alert
		alert("Songs wurden nicht gelöscht");
	}

}

function deleteSingleSetlist() {
	// eslint-disable-next-line no-alert
	let confirmAction = confirm("Willst du diese Setliste wirklich löschen?"),
		setlist = getSingleSetlist(),
		songs = SongInput.getAllSongs();
	if (confirmAction) {
		for (let i = 0; i < songs.length; i++) {
			for (let j = 0; j < songs[i].setlists.length; j++) {
				if (songs[i].setlists[j].id === setlist.id) {
					songs[i].removeSetlistId(setlist.id);
					db.updateSong(songs[i]);
				}
			}
		}
		db.removeSetlist(setlist);
		// eslint-disable-next-line no-alert
		alert("Setliste wurde erfolgreich gelöscht");
		location.reload();
	} else {
		// eslint-disable-next-line no-alert
		alert("Setliste wurde nicht gelöscht");
	}
}

function deleteSetlists() {
	// eslint-disable-next-line no-alert
	let confirmAction = confirm("Willst du diese Setlisten wirklich löschen?"),
		setlistsOnDelete = DeleteSetlists.getAllSetlistsOnDelete(),
		songsToUpdate = DeleteSetlists.getAllSongsToUpdate();

	if (confirmAction) {
		for (let i = 0; i < setlistsOnDelete.length; i++) {
			db.removeSetlist(setlistsOnDelete[i]);
		}
		for (let i = 0; i < songsToUpdate.length; i++) {
			db.updateSong(songsToUpdate[i]);
		}
		location.reload();
		// eslint-disable-next-line no-alert
		alert("Setlisten wurden erfolgreich gelöscht");
	} else {
		// eslint-disable-next-line no-alert
		alert("Setlisten wurden nicht gelöscht");
	}
}

function updateSong() {
	let updatedSong = SongEdit.getEditedSongInformation(),
		updatedSetlists = SongEdit.getUpdatedSetlists(updatedSong);
	db.updateSong(updatedSong);
	for (let i = 0; i < updatedSetlists.length; i++) {
		db.updateSetlist(updatedSetlists[i]);
	}
	location.reload();
}

function updateSetlist() {
	let editedSetlist = SetlistEdit.getEditedSetlistInformation(),
		updatedSongs = SetlistEdit.getUpdatedSongs();
	db.updateSetlist(editedSetlist);
	for (let i = 0; i < updatedSongs.length; i++) {
		db.updateSong(updatedSongs[i]);
	}
	location.reload();
}

init();