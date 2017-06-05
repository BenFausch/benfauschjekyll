window.onload = function() {
    var container = '';
    console.log(json_data);
    var myHeaders = new Headers();
    var myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };
    for (jd in json_data) {
        // console.log(json_data[jd]['url'])
        jdUrl = json_data[jd]['url'];
        jdTitle = json_data[jd]['title'];
        jdTime = json_data[jd]['dateAdded'];
        jdImg = '';
        jdDescription = '';
        if (jdUrl) {
            var url = encodeURIComponent(jdUrl);
            fetch('https://opengraph.io/api/1.0/site/' + url + '?app_id=5935ae0ea6d559f92f3effe2', myInit).then((resp) => resp.json()).then(function(data) {
                // console.log(data)
                jdImg = data.hybridGraph.image;
                jdDescription = data.hybridGraph.description;
            })
            container += '<li><a href="' + jdUrl + '">' + jdTitle + '</a><img src="' + jdImg + '" width="100"><p>' + jdDescription + '</p></li>';
        }
    }
    // console.log(container)
    ////
    var textFileAsBlob = new Blob([container], {
        type: 'text/plain'
    });

    var downloadLink = document.createElement("a");
    downloadLink.download = 'bookmarks.html';
    downloadLink.innerHTML = "Download File";
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    document.getElementById('container').appendChild(downloadLink)
};