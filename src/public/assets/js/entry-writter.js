function sendNewEntry () {
	const entry = {
		"title": $("#title").val(),
		"description": $("#description").val(),
		"content": $("#content").val()
	};

	const xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const response = JSON.parse(this.responseText);

			if (response.status == "OK") {
				const url = "/" + response.id;
				redirection(url);
				clearFields();
			} else {
				showError(response.error);
			}
		}
	}

	xhttp.open("POST", "/api/add");
	xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhttp.send(JSON.stringify(entry));
}

function redirection (url) {
	setNewUrl(url.replace(window.location.origin, ""));
	init();
}