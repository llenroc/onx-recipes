/**
 * launch-music-when-headphone-plugged.js
 * launches app when headphone is plugged in
 */
var app = 'com.google.android.music';
device.audio.on('headsetConnected', function(signal) {
    console.log("headset connected, launching " + app);
    device.applications.launchPackage(app, {}, function(err) {
        if(typeof err !== 'undefined') {
            console.log(err);
        }
    });
});