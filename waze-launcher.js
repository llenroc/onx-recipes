// launch application when driving
var currentModeOfTravel, app2Launch='waze', apps = device.applications;

// sample for mode of travel change every 3 minutes
device.modeOfTransport.samplingInterval = 180000;

// when mode of transport changes
device.modeOfTransport.on('changed', function (signal) {
    console.log("Mode of travel went from '" + currentModeOfTravel + "' to '" + signal.current + "'");
    if (signal.current !== currentModeOfTravel) {
	currentModeOfTravel = signal.current;
	if(currentModeOfTravel === 'driving') {
	    var appRunning=false;
	    for(var i=0; i < apps.runningApps.length; i++) {
		if(apps.runningApps[i].name === app2Launch) {
		   appRunning = true; 
		}
	    }
	    if(! appRunning ) {
		console.log("Launching " + app2Launch);
		apps.launch(app2Launch);
	    } else {
		console.log("Not launching " + app2Launch + ", the app is already running.");
	    }
	}
    }
});
