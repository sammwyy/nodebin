const app = {
	name: "Nodebin"
}

function setNewUrl (url) {
	if (url == null ||url == "index.html" || url == "/"  || url == " ")
		window.history.pushState("/", "", "/");
	else
		window.history.pushState(url, "", url);
}

function setNewTitle (title) {
	if (title == null)
		document.title = `${app.name}`;
	else
		document.title = `${app.name} - ${title}`;
}

function showError (error) {
	$("#error-message").html(error);
	$("#error-modal").modal("toggle");
}

function init () {
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

function goHome() {
	setNewUrl("/");
	setNewTitle(app.name);
	init();
}

window.addEventListener('popstate', function(event) {
	clearFields();
	init();
});

function clearFields () {
	$("#title").val("");
	$("#description").val("");
	$("#content").val("");
	$('#entry-title').html("");
	$('#entry-description').html("");
	$('#entry-content').html("");
}

function about () {
	setNewUrl("/about");
	init();
}