
import Template from "../Template/Template.js";
import { showSetlistTemplate } from "../Template/Template.js";
import { showSongTemplate } from "../Template/Template.js";

function initBreadcrumbsButtons() {
	let setlistBreadcrumbsBtns = document.querySelectorAll("#setlists-breadcrumbs"),
		songBreadcrumbsBtns = document.querySelectorAll("#songs-breadcrumbs"),
		songinfoBreadcrumbsBtns = document.querySelectorAll("#songinfo-breadcrumbs"),
		setlistinfoBreadcrumbsBtns = document.querySelectorAll("#setlistinfo-breadcrumbs");

	for (let i = 0; i < setlistBreadcrumbsBtns.length; i++) {
		setlistBreadcrumbsBtns[i].addEventListener("click", showSetlistTemplate);
	}
	for (let i = 0; i < songBreadcrumbsBtns.length; i++) {
		songBreadcrumbsBtns[i].addEventListener("click", showSongTemplate);
	}
	for (let i = 0; i < songinfoBreadcrumbsBtns.length; i++) {
		songinfoBreadcrumbsBtns[i].addEventListener("click", Template.showSongDetailTemplates);
	}
	for(let i = 0; i < setlistinfoBreadcrumbsBtns.length; i++){
		setlistinfoBreadcrumbsBtns[i].addEventListener("click", Template.showSetlistDetailTemplate);
	}

}export { initBreadcrumbsButtons };