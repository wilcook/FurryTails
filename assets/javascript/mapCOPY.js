var map;
var infoWindow;

console.log("map.js is loaded")

function userZipCodeQuery(){

  var userZip = zipInput;
  //Geocodio API
  var APIkey = '8e4e51c5c74dfc7cf55e8e7788c7fce46c55e5d';
  var baseURL = 'https://api.geocod.io/v1/geocode?api_key=';
  var queryURL = baseURL+ APIkey + '&q=' + userZip;

  var latitude = '';
  var longitude = '';

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(response){ 
    latitude = response.results[0].location.lat;
    longitude = response.results[0].location.lng;
    //testing
    // console.log(response.results[0].location.lat);   
    // console.log(response.results[0].location.lng); 

    //calls function that displays google map
    initMap(latitude, longitude);
    // testMarker();
  });
}


      function initMap() {
        var myLatLng = { lat: 40.785095, lng: -73.9664 };

        var dogPaw = {
          path: 'm 1,1 c -1.39e-4,-1.887243 0.253657,-1.991333 1.081067,-0.443379 0.866614,1.621304 0.820039,2.095065 -0.204492,2.08008 -0.876451,-0.01282 -0.876451,-0.01282 -0.876575,-1.636701 z m -6.537706,1.013066 c 0.425588,-2.413857 1.6251,-3.249815 1.633028,-1.13808 0.0066,1.748895 0.0066,1.748895 -0.867305,1.750193 -0.873871,0.0013 -0.873871,0.0013 -0.765723,-0.612113 z m 12.196826,9.597276 c -0.192379,-0.0803 -0.530741,-0.1046 -0.751915,-0.054 -0.34802,0.0796 -0.390262,0.0361 -0.313909,-0.32268 0.04852,-0.22804 0.177609,-0.98543 0.286855,-1.68307 0.120487,-0.76944 0.268252,-1.22543 0.375605,-1.15908 0.360134,0.22258 1.012108,1.92436 1.013769,2.64614 0.0018,0.77544 -0.03714,0.81196 -0.610405,0.57271 z m -16.825794,-0.554 c 0.0031,-1.40651 1.119503,-3.30656 1.298278,-2.20969 0.05139,0.31529 0.173415,1.04023 0.271171,1.61099 0.09776,0.57075 0.177738,1.04885 0.177738,1.06245 0,0.0136 -0.255776,0.0231 -0.568391,0.0211 -0.312615,-0.002 -0.706117,0.0595 -0.874447,0.13676 -0.266252,0.12214 -0.305835,0.0413 -0.304349,-0.62159 z m 10.961563,1.88921 c -1.130246,-0.63468 -1.886343,-3.31364 -1.568856,-5.55867 0.696255,-4.923364 4.156541,-4.848995 5.092131,0.10944 0.639033,3.38675 -1.447981,6.6146 -3.523275,5.44923 z m -6.213881,-0.10493 c -2.887566,-1.42933 -2.192173,-9.254849 0.822406,-9.254849 2.941752,0 3.488615,8.350389 0.618331,9.441669 -0.610369,0.23206 -0.588859,0.23485 -1.440737,-0.18682 z m -4.603359,7.8406 c -2.061748,-1.39738 -1.844466,-6.07981 0.376766,-8.1194 2.777243,-2.55013 4.611978,4.52416 2.030342,7.8285 -0.591992,0.75771 -1.54791,0.87324 -2.407108,0.2909 z m 15.357944,0.24376 c -2.115265,-1.05649 -2.542836,-7.23438 -0.589281,-8.5144 2.652026,-1.73767 5.220649,5.20663 2.902476,7.84688 -0.699481,0.79667 -1.558376,1.04451 -2.313195,0.66752 z m -11.638214,6.96736 c -2.869055,-1.29299 -2.846114,-5.28936 0.04319,-7.52419 1.299402,-1.00507 1.407117,-1.142 1.995188,-2.53637 1.623648,-3.84982 3.910313,-3.82574 5.604093,0.059 0.542121,1.24337 0.693502,1.42876 1.916933,2.34768 4.701196,3.53105 1.816007,9.72572 -3.289004,7.06168 -1.450068,-0.75671 -1.450068,-0.75671 -2.905507,-0.029 -1.655777,0.82789 -2.542866,0.99165 -3.364896,0.62118 z',
          fillColor: 'black',
          fillOpacity: 1,
          scale: 1,
          strokeColor: 'black',
          strokeWeight: 0.25
        };

        var map = new google.maps.Map(document.getElementById('map'), {
          center: myLatLng,
          zoom: 15,
          styles:[{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#ffb300"},{"saturation":"32"},{"lightness":"0"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"simplified"},{"hue":"#ffb800"},{"saturation":"54"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"on"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#ffb800"},{"saturation":"29"},{"lightness":"64"},{"gamma":"1"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#ffda7b"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#ffda7b"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"color":"#ffda7b"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.bus","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"transit.station.rail","elementType":"labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"saturation":"-60"},{"color":"#d5cdb6"}]}]
        });
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Dog Paw',
          animation: google.maps.Animation.DROP,
          icon: dogPaw,
          draggable: false});
      }

// This function will iterate over markersData array
// creating markers with createMarker function
function displayMarkers(){

   // this variable sets the map bounds according to markers position
   var bounds = new google.maps.LatLngBounds();
   
   // for loop traverses markersData array calling createMarker function for each marker 
   for (var i = 0; i < markersData.length; i++){

      var latlng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
      var name = markersData[i].name;
      var address1 = markersData[i].address1;
      var address2 = markersData[i].address2;
      var postalCode = markersData[i].postalCode;

      createMarker(latlng, name, address1, address2);

      // marker position is added to bounds variable
      bounds.extend(latlng);  
   }

   // Finally the bounds variable is used to set the map bounds
   // with fitBounds() function
   map.fitBounds(bounds);
}

// This function creates each marker and it sets their Info Window content
function createMarker(latlng, name, address1, address2){
   var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      title: name
   });

   // This event expects a click on a marker
   // When this event is fired the Info Window content is created
   // and the Info Window is opened.
   google.maps.event.addListener(marker, 'click', function() {
      
      // Creating the content to be inserted in the infowindow
      var iwContent = '<div id="iw_container">' +
            '<div class="iw_title">' + name + '</div>' +
         '<div class="iw_content">' + address1 + '<br />' +
         address2 + '<br />' +
         '</div></div>';
      
      // including content to the Info Window.
      infoWindow.setContent(iwContent);

      // opening the Info Window in the current map and at the current marker location.
      infoWindow.open(map, marker);
   });
}

//Called by petZipCodeQuery()
//used to populate a marker for each pet
function addMarker(location) {
  // map =  google.maps.Map(document.getElementById("map")); don't need this?
  // var mytext = 'Infowindow contents in HTML'
  // var myinfowindow = new google.maps.InfoWindow({
  //  content: mytext
  // });

  //Places a pawprint marker for each pet on the map
  var myLatLng = {lat: location.lat, lng: location.lng};
  console.log('location: ' + location.lat + ' ' +location.lng); 
  // alert('hi'); this works
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: dogPaw,
        title: "blah"
        // infowindow: myinfowindow,
        // animation: google.maps.Animation.DROP,
        // draggable: true
    });
    }