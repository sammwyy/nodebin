import { readEntry } from "./entry-reader";
import { $ } from "./no-build-this";

const app = {
	name: "Nodebin"
}

function setNewUrl (url: string): void {
	if (url == null ||url == "index.html" || url == "/"  || url == " ")
		window.history.pushState("/", "", "/");
	else
		window.history.pushState(url, "", url);
}

function setNewTitle (title: string): void {
	if (title == null)
		document.title = `${app.name}`;
	else
		document.title = `${app.name} - ${title}`;
}

function showError (error: string): void {
	$("#error-message").html(error);
	$("#error-modal").modal("toggle");
}

function init ():void {
	const path = window.location.pathname;

	$("#new-entry-form").css("display", "none");
	$("#read-entry").css("display", "none");
	$("#about").css("display", "none");

	if (path == null || path == "/") {
		$("#new-entry-form").css("display", "block");
		setNewTitle(null);
	} else if (path == "/about") {
		$("#about").css("display", "block");
		setNewTitle("About");
	} else {
		$("#read-entry").css("display", "block");
		readEntry(path);
	}
}

function goHome(): void {
	setNewUrl("/");
	setNewTitle(app.name);
	init();
}

window.addEventListener('popstate', function(event) {
	clearFields();
	init();
});

function clearFields (): void {
	$("#title").val("");
	$("#description").val("");
	$("#content").val("");
	$('#entry-title').html("");
	$('#entry-description').html("");
	$('#entry-content').html("");
}

function about (): void {
	setNewUrl("/about");
	init();
}

export { setNewTitle, showError, setNewUrl, init, clearFields };