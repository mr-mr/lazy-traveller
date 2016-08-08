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

loadJSON("https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr/Status?detail=False&app_id=2a97af33&app_key=9850b4c32b20ab40726bc8ef92d9573b", function(underground) {
  underground.forEach( function(tube){
    // window.data = data;
    // var line = document.getElementsByClassName('lines')[0];
    var div = document.createElement('div');
    div.innerHTML = tube.name + ' - ' + tube.lineStatuses[0].statusSeverityDescription;
    div.classList.add(tube.id);
    document.body.appendChild(div);
  });

loadJSON("https://api.tfl.gov.uk/Line/Mode/national-rail/Status?detail=False&app_id=2a97af33&app_key=9850b4c32b20ab40726bc8ef92d9573b", function(train){
  // train.forEach( function(thameslink){})
  window.data = train;
  document.getElementsByClassName('thameslink')[0].innerHTML = train[22].name + ' - ' + train[22].lineStatuses[0].statusSeverityDescription;
})

loadJSON("https://api.tfl.gov.uk/StopPoint/490013818H/arrivals?detail=False&app_id=2a97af33&app_key=9850b4c32b20ab40726bc8ef92d9573b", function(buses){
  var sortBus = buses.sort( function(a,b){
    return a.timeToStation - b.timeToStation;
  });

  console.log(sortBus);

  sortBus.forEach( function(bus){
    var div = document.createElement('div');
    var busName = bus.lineName;
    var busTime = Math.floor(bus.timeToStation / 60);
    if(busTime < 2){
        busTime = "Due";
    };

    div.innerHTML = busName + ' - ' + busTime;
    div.classList.add(bus.modeName);
    document.body.appendChild(div);
  })
})
});

//https://api.tfl.gov.uk/line/51/arrivals
