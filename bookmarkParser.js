// container = 'var bookmarkData = [';

container = "---\n title: Test Landing\n layout: default\n---\n<ul>";

var i = 0;
var json_length = Object.keys(json_data).length;
console.log(json_length)

function getMeta(container) {
    console.log(json_data);
    
    //fetch metadata
    for (jd in json_data) {
        console.log(json_data[jd]['url'])
        jdUrl = json_data[jd]['url'];
        jdTitle = json_data[jd]['title'];
        jdTime = json_data[jd]['dateAdded'];
        jdImg = '';
        jdDescription = '';
        if (jdUrl) {
            jdUrl = jdUrl.replace(/"/g, '\\"');
            jdTitle = jdTitle.replace(/"/g, '\\"');
            jdTime = jdTime.replace(/"/g, '\\"');
            var url = encodeURIComponent(jdUrl);
            fetchMeta(url, jdTitle, jdUrl, i);
        }else{
            i++
        }
    }
};

function fetchMeta(url, jdTitle, jdUrl) {
    var myHeaders = new Headers();
    var myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };
    fetch('https://opengraph.io/api/1.0/site/' + url + '?app_id=5935ae0ea6d549f93f3effe2', myInit).then((resp) => resp.json()).then(function(data) {
        // console.log(data)
        i++;
        if (i === (json_length)) {
            waitMeta(container)
        }
        jdImg = data.hybridGraph.image;
        jdDescription = data.hybridGraph.description;
        jdImg = jdImg.replace(/"/g, '\\"');
        jdDescription = jdDescription.replace(/"/g, '\\"');
        jdDescription = jdDescription.replace(/\s+/g, " ");

        // container = container + '{"title": "' + jdTitle + '","url": "' + jdUrl + '","image": "' + jdImg + '","description": "' + jdDescription + '"},';

        if((jdImg!=='undefined')&&(jdImg.length>0)){
        container =  container + '<li><a href="'+jdUrl+'" target="_blank">'+jdTitle+'</a><img src="'+jdImg+'" width="100"><p>'+jdDescription+'</p></li>';
        }else{
            container =  container + '<li><a href="'+jdUrl+'" target="_blank">'+jdTitle+'</a><p>'+jdDescription+'</p></li>';
        }
        console.log(i)
    })
}

function waitMeta(container) {
    console.log('METAMETAMETAMETAMETA')
    //create downloadble file
    // container = container.replace(/\s+/g, " ");
    // container = container + '];'
    var textFileAsBlob = new Blob([container], {
        type: 'text/plain'
    });
    var downloadLink = document.createElement("a");
    // downloadLink.download = 'bookmarks.json';
    downloadLink.download = 'bookmarks.md';
    downloadLink.innerHTML = "Download File";
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    document.getElementById('container').appendChild(downloadLink)
}
getMeta(container);
// window.onload = waitMeta();