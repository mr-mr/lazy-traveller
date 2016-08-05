function loadJSON(path, success, error){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

loadJSON("https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr/Status?detail=False&app_id=2a97af33&app_key=9850b4c32b20ab40726bc8ef92d9573b", function(data) {
  data.forEach( function(tube){
    // window.data = data;
    // var line = document.getElementsByClassName('lines')[0];
    var div = document.createElement('div');
    div.innerHTML = tube.name + ' - ' + tube.lineStatuses[0].statusSeverityDescription;
    div.classList.add(tube.id);
    document.body.appendChild(div);
  });
});
