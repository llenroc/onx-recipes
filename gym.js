// Initializing variables 
var location = {
    name : "Health Plus",
    latitude : "36.14515",
    longitude : "-86.807898"
};
var timePeriod = "3";
var timePeriodUnit = "1" /* days */;

// End of variables initializing 

console.log('Started script: Remind me to visit ' + location.name + ' if I haven\'t been there for a while');
// create a geo region for the trigger to take place at
var region = device.regions.createRegion({
    latitude: parseFloat(location.latitude, 10),
    longitude: parseFloat(location.longitude, 10),
    name: location.name,
    radius: 1000
});

// Check if we have ever entered the place
var storedVisit = device.localStorage.getItem('lastVisit');
if (!storedVisit) {
    device.localStorage.setItem('lastVisit', new Date().getTime());
}

// assign the callback when entering the region
region.on('enter', function () {
    // store the current visit time
    device.localStorage.setItem('lastVisit', (new Date()).getTime());
});

// start monitoring the region
device.regions.startMonitoring(region);

// create a scheduled task
var scheduledTask = function () {
    // get the last visit time
    var lastVisit = new Date(parseInt(device.localStorage.getItem('lastVisit'), 10));
    var today = new Date();
    var totalDiff = today.getTime() - lastVisit.getTime();
    var daysDiff = Math.floor(totalDiff / 1000 / 60 / 60 / 24);
    var timePeriodTotal = parseInt(timePeriod, 10) * parseInt(timePeriodUnit, 10);
    if (daysDiff >= timePeriodTotal) {
	console.log('Last visit: '  + lastVisit);
	var notification = device.notifications.createNotification('It\'s about time to go to ' + location.name );
	notification.content = 'Your last visit was on ' + lastVisit;
	notification.show();
    }
};

// time to start the scheduled task is today at 12:00:00
var time = new Date();
time.setMinutes(0);
time.setHours(12);
time.setMilliseconds(0);
time.setSeconds(0);

device.scheduler.setTimer({
    name: 'reminderTimer',
    time: time.getTime(),
    interval: 'day',
    repeat: true,
    exact: true
},
scheduledTask);
console.log('Completed script: Remind me to visit ' + location.name + ' if I  haven\'t been there for a while');