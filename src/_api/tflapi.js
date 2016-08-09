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

loadJSON("https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr/Status?detail=False&app_id=2a97af33&app_key=9850b4c32b20ab40726bc8ef92d9573b", function(tubes) {

  // var sliceTube = tubes.splice(2,8);
  var sliceTube = [tubes[2], tubes[11]];
  var tubeStatus = tubes[0].lineStatuses[0].statusSeverityDescription;
  var tubeTick = tubeStatus.replace("Good Service","<i class='fa fa-check tick'></i>");
  var tubeWarning = tubeStatus.replace("Good Service","<i class='fa fa-warning tick'></i>");
  console.log("Tube status - " + tubeStatus);

  sliceTube.forEach( function(tube){
    var div = document.createElement('div');
    if(tubeStatus === "Minor Delays"){
        div.innerHTML = tube.name + tubeWarning;
    }else{
      div.innerHTML = tube.name + tubeTick;
    }
    // div.innerHTML = tube.name + tubeTick;
    div.classList.add(tube.id);
    document.body.appendChild(div);
  });

loadJSON("https://api.tfl.gov.uk/Line/Mode/national-rail/Status?detail=False&app_id=2a97af33&app_key=9850b4c32b20ab40726bc8ef92d9573b", function(trains){
  var sliceTrains = [trains[22], trains[19]];
  var trainStatus = sliceTrains[0].lineStatuses[0].statusSeverityDescription;
  var trainTick = trainStatus.replace("Good Service","<i class='fa fa-check tick'></i>");
  var trainWarning = trainStatus.replace("Minor Delays","<i class='fa fa-warning tick'></i>");

  console.log("Train status - " + trainStatus);

  sliceTrains.forEach( function(train){
    var div = document.createElement('div');
    var trainName = train.name;
    // var trainStatus = train.lineStatuses[0].statusSeverityDescription;
    // console.log(trainStatus);
    if(trainStatus === "Minor Delays"){
        div.innerHTML = trainName + trainWarning;
    }else{
      div.innerHTML = trainName + trainTick;
    }
    div.classList.add(train.id);
    document.body.appendChild(div);
  });
})

loadJSON("https://api.tfl.gov.uk/StopPoint/490013818H/arrivals?detail=False&app_id=2a97af33&app_key=9850b4c32b20ab40726bc8ef92d9573b", function(buses){
  var sortBus = buses.sort( function(a,b){
    return a.timeToStation - b.timeToStation;
  });

  var sliceBus = sortBus.slice(0,8);

  sliceBus.forEach( function(bus){
    var div = document.createElement('div');
    var busName = bus.lineName;
    var busTime = Math.floor(bus.timeToStation / 60);
    if(busTime < 1){
        busTime = "Due" + "<i class='fa fa-bus tick'></i>";
    }else{
      busTime = busTime + "<i class='fa fa-bus tick faded'></i>";
    }
    document.getElementsByClassName('headline').innerHTML = "Buses";
    div.innerHTML = busName + ' - ' + busTime;
    div.classList.add(bus.modeName);
    div.classList.add(bus.timeToStation);
    document.body.appendChild(div);
  })
})
});

//https://api.tfl.gov.uk/line/51/arrivals
