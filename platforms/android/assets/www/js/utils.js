var util = (function(){
    var CheckInternet = function(){
        var networkState = navigator.connection.type;
        var states = {};
        //alert(typeof(navigator.connection));
        if (typeof(Connection) != "undefined"){
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';
        }
        else {
            return 'Uknown Error';
        }
        console.log('Connection type: ' + states[networkState]);
        return states[networkState];
    };
    var ChkLoc = function(retres, retrej){
        return new Promise(function(retres, retrej){
            cordova.plugins.diagnostic.isLocationAvailable(retres, retrej);
        });
    }
    var CheckLocation = function(){
        /*alert('0');
        ChkLoc(function(){
            alert('1');
        }, function(){
            alert('2');
        }).then(function (available) {
            if (available){
                cordova.plugins.locationAccuracy.request(retres, retrej, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
            }
        });*/

        cordova.plugins.diagnostic.isLocationAvailable(function(available){
            //console.log("Location is " + (available ? "available" : "not available"));
            //alert('6');
            if (available){
                function onRequestSuccess(success){
                    console.log("Successfully requested accuracy: "+success.message);
                    //alert('7');
                }

                function onRequestFailure(error){
                    console.error("Accuracy request failed: error code="+error.code+"; error message="+error.message);
                    //alert('8');
                    if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
                        if(window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
                            cordova.plugins.diagnostic.switchToLocationSettings();
                        }
                    }
                }

                //cordova.plugins.locationAccuracy.request(onRequestSuccess, onRequestFailure, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
            } else {
                //alert('5');
                cordova.plugins.diagnostic.switchToLocationSettings();
            }
        }, function(error){
            //console.error("The following error occurred: "+error);
            Toaster("Location Error.");
        });
    }

    var Toaster = function(msg){
        console.log(msg + 'wewewew');
        $(".toast").html(msg).stop().fadeIn(400).delay(3000).fadeOut(400);
    };

    var LoadRegister = function(prjdata){
        $(".titl").text(prjdata.title);
        if ((prjdata.occupied || 0) > 80){
            $(".inf-avl").css("background-color","red");
        }
        else if ((prjdata.occupied || 0) > 40){
            $(".inf-avl").css("background-color","orange");
        }
        else if ((prjdata.occupied || 0) >= 0){
            $(".inf-avl").css("background-color","green");
        }
        $(".inf-avl").text("occupied : " + (prjdata.occupied) + "%");
        $(".inf-det").text(prjdata.details);
        $("#tfn").val("");
        $("#twag").val("");
        $("#twly").val("");
        $("#teth").val("");
        $("#toccp").val("");
        $("#seljt").val("0");
        $("#twlk").val("");
        $("#tlsb").val("");
        $("#tiwi").val("");
        $(".inf-bx").show();
    };

    var ExitApp = function(){
        navigator.app.exitApp();
    }

    var OnBackKeyDown = function () {
        if ($(".inf-bx").is(":visible")){
            $(".inf-bx").hide();
        } else {
            navigator.app.exitApp();
        }
    }

    return {
        checkInternet: CheckInternet,
        toaster: Toaster,
        exitapp: ExitApp,
        checkLocation: CheckLocation,
        loadRegister: LoadRegister,
        onBackKeyDown: OnBackKeyDown
    }
})();