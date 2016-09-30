//GLOBAL VARIABLES
var breedInput;
var zipInput;
//initializing the variable for the google map
var map;

//When user presses submit button, stores user input in a variable and 
$('#submitBtn').on('click', function() {
    breedInput = $('#breedInput').val().trim();
    zipInput = $('#zipInput').val().trim();

    //make an API call to youtube for a video with the breedInput as query keyword
    youtubeQuery();
    //make an API call to geocod.io with to translate the user's zip code into latitude & longitude co-ordinates
    userZipCodeQuery();
    //make an API call to rescuegroups.org with user's zip code (zipInput)
    rescueGroupsQuery();
});


//Places an ajax call to youtube API
function youtubeQuery() {
    //breedInput is user's entry in the text field
    var animalBreed = breedInput;
    var APIkey = "AIzaSyBF2-UAzVkNHsKCPjqK91XBV4slMveK4Gs";
    var baseURL = "https://www.googleapis.com/youtube/v3/search?";
    var queryURL = baseURL + 'part=snippet&key=' + APIkey + '&q=' + animalBreed + '%20heartwarming';

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        //see below for desc
        displayYoutube(response);
    });
}

//Places youtube iframe vid in the HTML
function displayYoutube(data) {
    $('.youtube').html('');

    //randomize selection of video
    var itemsIndex = Math.floor(Math.random() * 5);
    var firstVidId = data.items[itemsIndex].id.videoId;

    // console.log(firstVidId);
    //display youtube video in HTML
    var iframeURL = 'https://youtube.com/embed/' + firstVidId;
    console.log('video url: ' + iframeURL);
    var youtubeVid = $('<iframe>');
    youtubeVid.attr('width', 420);
    youtubeVid.attr('height', 315);
    youtubeVid.attr('frameborder', 0);
    youtubeVid.attr('src', iframeURL);
    $('.youtube').append(youtubeVid);
}

function userZipCodeQuery() {
    var userZip = zipInput;
    //Geocodio API
    var APIkey = '8e4e51c5c74dfc7cf55e8e7788c7fce46c55e5d';
    var baseURL = 'https://api.geocod.io/v1/geocode?api_key=';
    var queryURL = baseURL + APIkey + '&q=' + userZip;

    var latitude = '';
    var longitude = '';

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response) {
        latitude = response.results[0].location.lat;
        longitude = response.results[0].location.lng;

        //calls function that displays google map
        initMap(latitude, longitude);
    });
}

//This function is called by rescueGroupsQuery()
//convert city & state of each pet into an object containg lat and long
function petZipCodeQuery(petinfo) {

    var animalAddress = petinfo.location;
    //Geocodio API
    var APIkey = '8e4e51c5c74dfc7cf55e8e7788c7fce46c55e5d';
    var baseURL = 'https://api.geocod.io/v1/geocode?api_key=';
    var queryURL = baseURL + APIkey + '&q=' + animalAddress;

    var latitude = '';
    var longitude = '';

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response) {
        latitude = response.results[0].location.lat;
        longitude = response.results[0].location.lng;

        //creates an object with latitude and longitude
        var latAndLng = {
            'lat': latitude,
            'lng': longitude
        }

        addMarker(latAndLng, petinfo);

    });
}

function rescueGroupsQuery() {
    //User input for zipcode
    zipInput = $('#zipInput').val().trim();
    breedInput = $('#breedInput').val().trim();

    var thing = {
        "apikey": "2mV1s2Z2",
        "objectType": "animals",
        "objectAction": "publicSearch",
        "search": {
            "calcFoundRows": "Yes",
            "resultStart": 0,
            "resultLimit": 50,
            //Properties of each pet that the query returns
            "fields": ["animalName",
                "animalSpecies",
                "animalPictures",
                "animalLocationPublic",
                "animalSizeCurrent",
                "animalLocationCitystate",
                "animalStatus",
                "animalLocationZipcode",
                "animalBreed",
                "animalSex",
                "animalHousetrained",
                "animalGeneralAge",
                "animalDescription",
                "animalNotes",
                "animalObedienceTraining",
                "animalOKWithAdults",
                "animalAdoptionPending",
                "animalPrimaryBreed",
                "animalSizeCurrent",
                "animalSummary",
                "ownerAddress",
                "locationAddress",
                "locationAnimals",
                "contactCompany",
                "locationPhone",
                "locationName",
                "animalColor"
            ],

            // SEARCH PARAMETERS for query
            "filters": [{
                        "fieldName": "animalSpecies",
                        "operation": "equals",
                        "criteria": "dog"
                    },

                    {
                        "fieldName": "animalBreed",
                        "operation": "contains",
                        "criteria": breedInput
                    },
                    // {"fieldName":"animalBreed","operation":"equals","criteria": breedInput},
                    {
                        "fieldName": "animalLocationDistance",
                        "operation": "radius",
                        "criteria": "100"
                    },

                    {
                        "fieldName": "animalLocation",
                        "operation": "equals",
                        "criteria": zipInput
                    },

                    {
                        "fieldName": "animalStatus",
                        "operation": "equals",
                        "criteria": "Available"
                    },

                    {
                        "fieldName": "locationAddress",
                        "operation": "notblank",
                        "criteria": "true"
                    },

                    {
                        "fieldName": "locationPhone",
                        "operation": "notblank",
                        "criteria": "true"
                    },

                    // {"fieldName": "animalHousetrained", 
                    // "operation": "notblank", 
                    // "criteria": "true"}
                ] //END filters array
        } //END 'search' object 
    }; //END 'thing' object
    var encoded = JSON.stringify(thing);

    // console.log("https://api.rescuegroups.org/http/json/?data=" + encoded)

    $.ajax({
        url: "https://api.rescuegroups.org/http/json/?data=" + encoded,
        dataType: "jsonp",
        success: function(data) {
            if (data.foundRows) {
                document.getElementById('adoptedPetsCount').innerHTML = 'Pets available for adoption: ' + data.foundRows;
            }
            // console.log(data);
            // USE LO DASH " _. " TO TRANSFORM AN OBJECT TO AN ARRAY
            var animalName = _.toArray(data.data);
            // console.log(animalName);
            var location;

            for (var i = 0; i < animalName.length; i++) {
                //fetches the City and State of each pet from the API call
                location = animalName[i].animalLocationCitystate;
                location = location.toString();


                var petphoto = animalName[i].animalPictures[0].urlInsecureThumbnail;
                var petname = animalName[i].animalName;
                var petphone = animalName[i].locationPhone;
                var petspecies = animalName[i].animalSpecies;

                var petinfo = {
                    location: location,
                    name: petname,
                    petphoto: petphoto,
                    petphone: petphone
                };

                petZipCodeQuery(petinfo);
            }

        },
        error: function(xhr, status, error) {
            console.log('error');
        }
    });
} //END rescueGroupsQuery()


////GOOGLE MAPS CODE
//initialize event listener. not sure if it works.
// google.maps.event.addDomList ener(window, 'load', initMap);


//This function is called by zipCodeQuery(), which supplies the parameters here.
//Center the map with user's zipcode. 
function initMap(latitude, longitude) {
    console.log("initMap runs");

    var myLatLng = { lat: latitude, lng: longitude };
    var googleMapOptions = {
        zoom: 8,
        center: myLatLng,
        draggable: true,
        styles: [{ "featureType": "administrative", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] }, { "featureType": "landscape.man_made", "elementType": "all", "stylers": [{ "visibility": "on" }] }, { "featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "hue": "#ffb300" }, { "saturation": "32" }, { "lightness": "0" }] }, { "featureType": "landscape.natural", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "hue": "#ffb800" }, { "saturation": "54" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }, { "visibility": "on" }] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "hue": "#ffb800" }, { "saturation": "29" }, { "lightness": "64" }, { "gamma": "1" }] }, { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffda7b" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "on" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.highway", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffda7b" }] }, { "featureType": "road.highway", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffda7b" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "transit", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.station.bus", "elementType": "labels.icon", "stylers": [{ "visibility": "on" }] }, { "featureType": "transit.station.rail", "elementType": "labels.icon", "stylers": [{ "visibility": "on" }] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "visibility": "on" }, { "saturation": "-60" }, { "color": "#d5cdb6" }] }]
    };

    map = new google.maps.Map(document.getElementById("map"), googleMapOptions);

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Dog Paw',
          animation: google.maps.Animation.DROP,
          icon: dogPaw,
          draggable: false});

}


//Called by petZipCodeQuery()
//used to populate a marker for each pet
function addMarker(location, petinfo) {
    // map =  google.maps.Map(document.getElementById("map")); don't need this?
    // var mytext = 'Infowindow contents in HTML'
    // var myinfowindow = new google.maps.InfoWindow({
    // 	content: mytext
    // });

    //Places a pawprint marker for each pet on the map
    var myLatLng = { lat: location.lat, lng: location.lng };
    console.log('location: ' + location.lat + ' ' + location.lng);
    // alert('hi'); this works
    var contentString = '<img width="100px" src = "' +
        petinfo.petphoto + '">' +
        '<p>' + petinfo.name + '</p>' +
        '<p>' + petinfo.petphone + '</p>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: test,
        title: "pet info",
        animation: google.maps.Animation.DROP,
        draggable: true
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}
