$(function(){
	$(".inf-bx").hide();
	$("#cls-reg").on("click", function(){
		$(".inf-bx").hide();
	});
	$("#register").on("click", function(){
		$(".inf-bx").hide();
	});
	document.addEventListener("deviceready", function() {
		var tt = util.checkInternet();
		if ("Unknown connection No network connection Uknown Error".indexOf(tt) > -1){
		 	util.toaster("No internet, Please connect after connection.");
		 	 setTimeout(function(){
		 	 	util.exitapp();
		 	 }, 3000)
		 	util.toaster(tt);
		 	return;
		} else {
		 	util.toaster(tt);
		}

		cordova.plugins.diagnostic.isLocationEnabled(function(enabled){
		    console.log("Location setting is " + (enabled ? "enabled" : "disabled"));
		    if (!enabled){
		    	cordova.plugins.diagnostic.switchToLocationSettings();
		    } else {
		    	action.checkLocationState();
		    }
		}, function(error){
		    console.error("The following error occurred: "+error);
		});
	});
	document.addEventListener("backbutton", util.onBackKeyDown, false);
	document.addEventListener('resume', action.checkLocationState, false);
	document.addEventListener("offline", action.offOffline, false);
    document.addEventListener("online", action.onOffline, false);
});