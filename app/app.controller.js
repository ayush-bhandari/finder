'use strict';
angular
    .module('app')
    .controller('AppController', appController);

function appController(appService) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var map = new google.maps.Map(document.getElementById('map'), {
                center: pos,
                zoom: 16,
                scrollwheel: false,
                styles:[{"featureType":"all","elementType":"all","stylers":[{"saturation":-100},{"gamma":0.5}]}],
                mapTypeId: google.maps.MapTypeId.ROADMAP,

            });
            var infowindow = new google.maps.InfoWindow({
                content:"You're Here"
            });
            var myCity = new google.maps.Circle({
                center: pos,
                radius: 600,
                strokeColor: "#0040ff",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#ffff66",
                fillOpacity: 0.3
            });
            myCity.setMap(map);
            var marker = new google.maps.Marker({
                map: map,
                position: pos,
                //icon: 'images/positionMarker.png',
                animation:google.maps.Animation.BOUNCE
            });   
            infowindow.open(map,marker);
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map,marker);
            });
            appService.setValue(pos,map);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
          // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
    }
}