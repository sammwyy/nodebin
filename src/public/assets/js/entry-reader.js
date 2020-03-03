function readEntry (id) {
	if (id.startsWith("/")) id = id.slice(1);

	var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
    	if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {

    		const response = JSON.parse(this.responseText);

    		if (response == null) {
    			showError("Backend error, Empty response")
    		}

            else if (response.error == null) {
    			const title = response.title;
    			const description = response.description;
    			const content = response.content;

    			$("#entry-title").html(title);
    			$("#entry-description").html(description);
    			$("#entry-content").html(`<pre>${content}</pre>`);

                setNewTitle(title);
            } else {
                setNewTitle("Error!");
                showError(response.error);
            }
    	} else if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
    		const response = JSON.parse(this.responseText);
            if (response.error != null)
    		    showError(response.error);
            else
                showError("Backend error, 404 response");

            setNewTitle("Error!");
    	}
    }

    xmlHttp.open("GET", "/api/get/" + id, true);
    xmlHttp.send(null);
}