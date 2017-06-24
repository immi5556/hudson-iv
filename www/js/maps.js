var map = (function(){

    function getInfowindow(prjdata){
        var contents = document.createElement("div");
          //contents.appendChild(document.createTextNode("Change the backgroundColor"));
          var occup = document.createElement("div");
          if ((prjdata.occupied || 0) > 80){
            occup.style.cssText = "background-color:red;width:100%;";
          }
          else if ((prjdata.occupied || 0) > 40){
            occup.style.cssText = "background-color:orange;width:100%;";
          }
          else if ((prjdata.occupied || 0) >= 0){
            occup.style.cssText = "background-color:green;width:100%;";
          }
          occup.appendChild(document.createTextNode("Occupied : " + (prjdata.occupied || 30) + "%" ));
          //occup.style.cssText = "background-color:red;width:" + (prjdata.occupied || 30) + "px;";
          contents.appendChild(occup);

          contents.appendChild(document.createElement("br"));

          var button = document.createElement("button");
          button.appendChild(document.createTextNode("Register"));
          contents.appendChild(button);
          button.addEventListener("click", function() {
            //alert('');
            util.loadRegister("Clicked...");
          });
          htmlInfoWindow.setContent(contents);
    }

    function onMarkerClick() {
      var marker = this;
      //var iconData = marker.get("iconData");

      // Change the marker icon
      //marker.setIcon(iconData);
      //marker.showInfoWindow();
      var prjData = marker.get("project");
      //getInfowindow(prjData);
      //htmlInfoWindow.open(marker);
      util.loadRegister(prjData);
      //alert(prjData);
      //$(".inf-bx").show();
      ///$(".inf-avl").width((prjData.occupied || "60") + "%");
    }

    function addMarkers(lmap, data, callback) {
      var markers = [];
      //alert(data.length);
      function onMarkerAdded(marker) {
        markers.push(marker);

        // If you click on a marker, the marker's icon will be changed.
        marker.on(plugin.google.maps.event.MARKER_CLICK, onMarkerClick);
        marker.on(plugin.google.maps.event.INFO_CLICK, onMarkerClick);

        if (markers.length === data.length) {
          callback(markers);
        }
      }
      data.forEach(function(markerOptions) {
        lmap.addMarker(markerOptions, onMarkerAdded);
      });
    }

    var htmlInfoWindow;
    var onMapReady = function(){
        htmlInfoWindow = new plugin.google.maps.HtmlInfoWindow();
        if (!myposn){
            myposn = { lat: -36.84895963360477, lng: 174.76415634155273 };
        }
        lmap.animateCamera({
            target: myposn,
            zoom: 8,
            //tilt: 60,
            bearing: 140,
            duration: 5000
          }, function() {
            // Add a maker 
            lmap.addMarker({
              position: myposn,
              icon: { 
                url:"www/img/sp1.png",
                size: {
                    width: 44,
                    height: 44
                  }
              },
              title: "Its you..!",
              animation: plugin.google.maps.Animation.BOUNCE
            });
          });
        //Add other projs
        //alert(sitedata.projects.length);
        addMarkers(lmap, sitedata.projects, function(markers) {
            //alert(sitedata.projects.length);
            var bounds = [];
            for(var i = 0; i < markers.length; i++) {
              bounds.push(markers[i].getPosition());
            }

            lmap.moveCamera({
              target: bounds
            });

      });
    }
    var lmap, myposn;
    var Init = function(posn){
        myposn = posn;
        var div = document.getElementById("map-canvas");
          // Initialize the map view 
          lmap = plugin.google.maps.Map.getMap(div);
          // Wait until the map is ready status. 
          lmap.one(plugin.google.maps.event.MAP_READY, onMapReady);
          //alert('');
    }

    return {
        initMap: Init
    }
})();