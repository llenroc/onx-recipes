/**
 * at-home.js
 * loads home profile
 */
var location = { name : "home", latitude : "35.9525049", longitude : "-86.7973721" };

// sets the volume
var setonx = function(message) {
    device.applications.launch("setonx", message, function(error) { console.log(error); });
};

// create a geo region for the trigger to take place at
var region = device.regions.createRegion({
    latitude: parseFloat(location.latitude, 10),
    longitude: parseFloat(location.longitude, 10),
    name: location.name,
    radius: 500
});

var toggle = function(msg, wifiEnabled) {
    return function() {
        console.log(msg);

        // show toast
        setonx({ message: 'toast', text: msg });

        // turn on wifi
        device.network.wifiEnabled = wifiEnabled;
    };
};

// arrived at home
region.on("enter", toggle("arrived home", true));

// left home
region.on("exit", toggle("left home", false));