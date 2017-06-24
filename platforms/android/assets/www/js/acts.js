var action = (function(){

	var locationEnabled;
	function CheckLocationState(){
	    cordova.plugins.diagnostic.isLocationEnabled(function(enabled){
	        locationEnabled = enabled;
	        if (enabled){
	        	navigator.geolocation.getCurrentPosition(function(position){
	        		map.initMap({ lat: position.coords.latitude, lng: position.coords.longitude });
	        		console.log(position);
	        		util.toaster("Psotion: " + position.coords.latitude + ", " + position.coords.longitude);
	        	}, function(err){
	        		console.log("Location Eror : " + err.message);
	        		util.toaster("location error disabled.");
	        		map.initMap();
	        	});
	        }else {
	        	util.toaster("Your current location disabled.");
	        	map.initMap();
	        }
	    }, function(err){ 
	    	console.log("loc error " + err.message); 
	    	util.toaster("location error disabled.");
	    	map.initMap();
	    });
	}
	var GetLocationStatus = function() {  return locationEnabled; }

	var internetEnabled = false;
	var OnOffline = function () {
	    util.toaster("Your internet is back.")
	    internetEnabled = false;
	}
	var OffOffline = function(){
		util.toaster("Your internet seems unstable.")
		internetEnabled = true;
	}
	var GetInternetStatus = function() { return internetEnabled; }

	return {
		checkLocationState: CheckLocationState,
		getLocationStatus: GetLocationStatus,
		getInternetStatus: GetInternetStatus,
		offOffline: OffOffline,
		onOffline: OnOffline
	}
})();

var sitedata = {
	projects: [
		{
            position:  { 
            	lat: -37.87485339352927,
            	lng:  176.06689453125
            },
            title: "",
            icon: { 
                url:"www/img/six.png",
                size: {
                    width: 30,
                    height: 30
                  }
              },
            //icon: "www/img/sp1.png",
            project: {
                name: "Project-IV",
                title: "Omanawa",
                details: "1331 Omanawa Rd, Omanawa 3171, New Zealand",
                budget: "$2000",
                occupied: 70
            }
        },
		{
            position:  { 
            	lat: -41.2901576,
            	lng:  174.77308370000003
            },
            title: "",
            icon: { 
                url:"www/img/five.png",
                size: {
                    width: 30,
                    height: 30
                  }
              },
            //icon: "www/img/sp1.png",
            project: {
                name: "Project-IV",
                title: "Dixon Street Flats",
                details: "134 Dixon St, Te Aro, Wellington 6011, New Zealand",
                budget: "$2000",
                occupied: 40
            }
        },
		{
            position:  { 
            	lat: -36.86894388026203,
            	lng: 174.7985315322876
            },
            title: "",
            icon: { 
                url:"www/img/four.png",
                size: {
                    width: 30,
                    height: 30
                  }
              },
            project: {
                name: "Project-IV",
                title: "Remuera",
                details: "204A Victoria Ave, Remuera, Auckland 1050",
                budget: "$2000",
                occupied: 90
            }
        },
        {
        	position:  { 
            	lat: -41.11246878918085,
            	lng: 172.55126953125
            },
            title: "",
            icon: { 
                url:"www/img/three.png",
                size: {
                    width: 30,
                    height: 30
                  }
              },
            project: {
                name: "Project-III",
                title: "Eighty Eight Valley",
                details: "Wantwood Rd, Eighty Eight Valley 7095, New Zealand",
                budget: "$5000",
                occupied: 80
            }
        },
        {
            position:  { 
            	lat: -43.707593504052944,
            	lng: 172.50732421875
            },
            title: "",
            icon: {
		      url: "www/img/two.png",
		      size: {
		        	width: 30,
		        	height: 30
		    	}
		    },
            project: {
                name: "Project-II",
                title: "Lincoln",
                details: "99 Davidsons Rd, Lincoln 7674, New Zealand",
                budget: "$5000",
                occupied: 50
            }
        },
        {
            position:  { 
            	lat: -45.33670190996811,
            	lng: 170.0244140625
            },
            title: "",
            icon: { 
                url:"www/img/one.png",
                size: {
                    width: 30,
                    height: 30
                  }
              },
            project: {
                name: "Project-I",
                title: "Paerau",
                details: "Lusher Rd, Paerau 9398, New Zealand",
                budget: "$5000",
                occupied: 30
            }
        }
	]
};