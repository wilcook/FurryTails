//When user presses submit button, stores user input in a variable and 
$('#submitBtn').on('click', function(){
    breedInput = $('#breedInput').val().trim();
    zipInput = $('#zipInput').val().trim();

    // console.log(breedInput);
    // console.log(zipInput);
    //make an API call to youtube for a video with the breedInput as query keyword
    youtubeQuery();
    //make an API call to geocod.io with to translate the user's zip code into latitude & longitude co-ordinates
    userZipCodeQuery();
    //make an API call to rescuegroups.org with user's zip code (zipInput)
    rescueGroupsQuery();
});


//Places an ajax call to youtube API
function youtubeQuery(){
    //breedInput is user's entry in the text field
    var animalBreed = breedInput;
    var APIkey = "AIzaSyBF2-UAzVkNHsKCPjqK91XBV4slMveK4Gs";
    var baseURL = "https://www.googleapis.com/youtube/v3/search?";
    var queryURL = baseURL + 'part=snippet&key=' + APIkey + '&q=' + animalBreed + '%20heartwarming';

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        //see below for desc
        displayYoutube(response);
    });
}

//Places youtube iframe vid in the HTML
function displayYoutube(data){
    $('.youtube').html('');

    //randomize selection of video
    var itemsIndex = Math.floor(Math.random()*5);
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
    });
}

//This function is called within rescueGroupsQuery()
//convert city & state of each pet into an object containg lat and long
function petZipCodeQuery(location){

    var animalAddress = location;
    //Geocodio API
    var APIkey = '8e4e51c5c74dfc7cf55e8e7788c7fce46c55e5d';
    var baseURL = 'https://api.geocod.io/v1/geocode?api_key=';
    var queryURL = baseURL+ APIkey + '&q=' + animalAddress;

    var latitude = '';
    var longitude = '';

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response){ 
        latitude = response.results[0].location.lat;
        longitude = response.results[0].location.lng;

        //creates an object with latitude and longitude
        var latAndLng = {
            'lat': latitude,
            'lng': longitude
        }
        console.log(latAndLng);
        addMarker(latAndLng);

    });
}

function rescueGroupsQuery(){
    //User input for zipcode
    // zipInput = $('#zipInput').val().trim();
    // breedInput = $('#breedInput').val().trim();

    var thing = {
        "apikey":"2mV1s2Z2",
        "objectType":"animals",
        "objectAction":"publicSearch",
        "search":
            {
                "calcFoundRows":"Yes",
                "resultStart":0,
                "resultLimit":5,
                //Properties of each pet that the query returns
                "fields":
                    [   "animalName", 
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
                        "animalColor" ],

                // SEARCH PARAMETERS for query
                "filters":
                    [
                        {"fieldName":"animalSpecies",
                        "operation":"equals",
                        "criteria":"dog"},
    // {"fieldName":"animalBreed","operation":"equals","criteria": breedInput},
                        {"fieldName":"animalLocationDistance",
                        "operation":"radius",
                        "criteria":"90"},

                        {"fieldName":"animalLocation",
                        "operation":"equals",
                        "criteria":'07024'},

                        {"fieldName":"animalStatus",
                        "operation":"equals",
                        "criteria":"Available"},

                        {"fieldName": "locationAddress", 
                        "operation": "notblank", 
                        "criteria": "true"},

                        {"fieldName": "locationPhone", 
                        "operation": "notblank", 
                        "criteria": "true"},

                        {"fieldName": "animalHousetrained", 
                        "operation": "notblank", 
                        "criteria": "true"}
                    ]//END filters array
            }//END 'search' object 
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
            
            for(var i=0; i<animalName.length; i++) {
                //fetches the City and State of each pet from the API call
                location = animalName[i].animalLocationCitystate;
                location = location.toString();
                
                petZipCodeQuery(location);  
            }

      },
      error: function(xhr, status, error) {
        console.log('error');
      }
    }); 
} //END rescueGroupsQuery()


////GOOGLE MAPS CODE
//This function is called by zipCodeQuery(), which supplies the parameters here.
jQuery(function($) {
    // Asynchronously Load the map API 
    var script = document.createElement('script');
    script.src = "//maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
    document.body.appendChild(script);
});

function initMap(latitude, longitude) {
  var myLatLng = {lat: latitude, lng: longitude};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: myLatLng
  });
}

//used to populate a marker for each pet
function addMarker(location) {
    var myLatLng = {lat: location.lat, lng: location.lng};
    console.log('location: ' + location.lat + ' ' +location.lng);   
    // alert('hi'); this works
    marker = new google.maps.Marker({
        position: myLatLng,
        map: map
    });
}
