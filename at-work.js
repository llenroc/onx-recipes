/**
 * at-work.js
 * when arriving to work, turn on wifi, silence phone
 * when leaving work, turn off wifi, restore ringer
 */

var location = { name : "work", latitude : "36.139036", longitude : "-86.8189" };

// sets the volume
var setonx = function(message) {
    device.applications.launch("setonx", message, function(error) { console.log(error); });
};

// create a geo region for the trigger to take place at
var region = device.regions.createRegion({
    latitude: parseFloat(location.latitude, 10),
    longitude: parseFloat(location.longitude, 10),
    name: location.name,
    radius: 1000
});

// arrived at work
region.on("enter", function () {

    console.log("entering work profile");

    // show toast
    setonx({ message: 'toast', text: 'Entering work profile' });

    // silences phone
    setonx({ message: 'audio', volume: 'silent', vibrate: 'true' });
    
    // turn on wifi
    device.network.wifiEnabled = true;
});

// left work
region.on("exit", function() {
	
    console.log("leaving work profile");

    // show toast
    setonx({ message: 'toast', text: 'Leaving work profile' });

    // silences phone
    setonx({ message: 'audio', volume: 'normal', vibrate: 'false' });

    device.network.wifiEnabled = false;
    
});

// start monitoring the region
device.regions.startMonitoring(region);