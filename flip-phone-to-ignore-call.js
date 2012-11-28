/**
 * flip-phone-to-ignore-call.js
 * ignore call when
 */
var ignoreCall = function() {
    var prevMode = device.audio.ringerMode;
    device.audio.ringerMode = 'silent';
    // set back to normal state timer to 30 seconds
    device.scheduler.setTimer(
    {
        name: 'rejectCall' + new Date().toString(),
        time: new Date().getTime() + 30000,
        repeat: false,
        exact: true
    },
    function () {
        console.log('reverting ringer mode after flip ignored call to ' + prevMode);
        device.audio.ringerMode = prevMode;
    });
}

device.telephony.on('incomingCall', function() {
	device.gestures.on('flipDown', function() {
		console.log("phone flipped during incoming call, ignoring call.");
		ignoreCall();
		device.gestures.cancelDetection();
	});
	device.gestures.startDetection(10000);
});