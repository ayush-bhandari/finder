'use strict';
angular
    .module('nav')
    .controller('NavController', navController);

function navController(navService,$mdSidenav) {
	var vm = this;
	
	vm.buildToggler = function(componentId){
		return function() {
        $mdSidenav(componentId).toggle();
      }
	}
	vm.toggleSideNav = vm.buildToggler('left');
	
	vm.search = function(searchType){
		var map;
		var infowindow;
		var myCenter = {lat: navService.getValue().currentPos.lat,lng: navService.getValue().currentPos.lng};
		
		map = navService.getValue().currentMap;
		infowindow = new google.maps.InfoWindow();
		
		var service = new google.maps.places.PlacesService(map);
  		service.nearbySearch({
    		location: myCenter,
    		radius: 600,
    		type: [searchType]
  		}, callback);

		function callback(results, status) {
		  if (status === google.maps.places.PlacesServiceStatus.OK) {
		    for (var i = 0; i < results.length; i++) {
		      createMarker(results[i]);
		    }
		  }
		}

		function createMarker(p) {

			var marker = new google.maps.Marker({
		    	map: map,
		    	position: p.geometry.location
		  	});
		  	
		  	google.maps.event.addListener(marker, 'click', function() {
		  		//var place = null;
		  		//var place.photos = null;
				service.getDetails({placeId: p.place_id}, response);
				function response(plc, status) {
					 if (status == google.maps.places.PlacesServiceStatus.OK){
						//console.log("OK");
						// console.log(plc);
						//place = plc;
						fireInfoWindow(plc);
					 }
				  }
				  function fireInfoWindow(place){
			  		// console.log(place);
			  		if (place.photos != null){
			  			var image = place.photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200}) ;
				  	}else{
				  		var image = null;
				  	}
				  	if (place.opening_hours) {
					  	if (place.opening_hours.open_now){
					  		var openStatus = "Open Now";
					  	}else{
					  		var openStatus = "Closed Now";
					  	}
					 }
				
		  		var contentString = '<h3><strong><mark>'+place.name+'</mark></strong></h3>';
		  
            if (!!place.formatted_address) contentString += '<p><strong>Address: </strong>'+place.formatted_address+'</p>';
            if (!!image) contentString += '<img src="'+image+'" style="min-height:200px; min-width: 200px;">';
            if (!!place.international_phone_number) contentString += '<p><strong>Phone no: </strong>'+place.international_phone_number+'</p>';
            if (!!place.opening_hours) contentString += '<p><strong>Opening Hours: </strong>'+openStatus+'</p>';
            if (!!place.rating) contentString += '<p><strong>Rating: </strong>'+place.rating+'</p>';
            if (!!place.website) contentString += '<p><strong>Website : </strong><a target="_blank" href="'+place.website+'">'+place.website+'</a></p>';
            

		    	infowindow.setContent(contentString);}
		    	infowindow.open(map, this);
		  	});
		}
	}
}

