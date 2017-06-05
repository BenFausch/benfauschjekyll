function getMeta() {
    var container = '';
    console.log(json_data);
    var myHeaders = new Headers();
    var myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };
    container = 'var bookmarkData = [';
    //fetch metadata
    for (jd in json_data) {
        // console.log(json_data[jd]['url'])
        jdUrl = json_data[jd]['url'];
        jdTitle = json_data[jd]['title'];
        jdTime = json_data[jd]['dateAdded'];
        jdImg = '';
        jdDescription = '';
        if (jdUrl) {
            var url = encodeURIComponent(jdUrl);
            fetch('https://opengraph.io/api/1.0/site/' + url + '?app_id=5935ae0ea6d559f93f3effe2', myInit).then((resp) => resp.json()).then(function(data) {
                // console.log(data)
                jdImg = data.hybridGraph.image;
                jdDescription = data.hybridGraph.description;
                container+='{"title": "'+jdTitle+'","url": "'+jdUrl+'","image": "'+jdImg+'","description": "'+jdDescription+'"},';
                 // console.log(container)
            })
            // console.log(container)
        }
    }
    
    console.log('done')
    return container;
};


async function waitMeta(){
var theMeta = await getMeta();
console.log('METAMETAMETAMETAMETA')

console.log(theMeta)



    //create downloadble file
    var textFileAsBlob = new Blob([container], {
        type: 'text/plain'
    });

    var downloadLink = document.createElement("a");
    downloadLink.download = 'bookmarks.json';
    downloadLink.innerHTML = "Download File";
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    document.getElementById('container').appendChild(downloadLink)
}
waitMeta();
// window.onload = waitMeta();








