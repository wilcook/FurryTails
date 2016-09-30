$('document').ready(function() {


    console.log("searchAnimal.js loaded");

    $("#leftPanel").hide();


    $("#dog").on('click', function() {
        console.log("dog click recognized");
        animalSpecies = 'dog';
        console.log("animalSpecies: " + animalSpecies);
        $("#leftPanel").show();
    });

    $("#cat").on('click', function() {
        console.log("cat click recognized");
        animalSpecies = 'cat';
        console.log("animalSpecies: " + animalSpecies);
        $("#leftPanel").show();
    });


    //When user presses submit button, stores user input in a variable and 
    $('#submitBtn').on('click', function() {
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


    // ////////////////////////////////////////////////////////
    // rescue API javascript
    // /////////////////////////////////////////////////////////

    function rescueGroupsQuery() {
        //User input for zipcode
        // zipInput = $('#zipInput').val().trim();
        // breedInput = $('#breedInput').val().trim();

        var thing = {
            "apikey": "2mV1s2Z2",
            "objectType": "animals",
            "objectAction": "publicSearch",
            "search": {
                "calcFoundRows": "Yes",
                "resultStart": 0,
                "resultLimit": 10,
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
                        // {"fieldName":"animalBreed","operation":"equals","criteria": breedInput},
                        {
                            "fieldName": "animalLocationDistance",
                            "operation": "radius",
                            "criteria": "100"
                        },

                        {
                            "fieldName": "animalLocation",
                            "operation": "equals",
                            "criteria": '07024'
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

                        {
                            "fieldName": "animalHousetrained",
                            "operation": "notblank",
                            "criteria": "true"
                        }
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

                    petZipCodeQuery(location);
                }

            },
            error: function(xhr, status, error) {
                console.log('error');
            }
        });
    }
    //END rescueGroupsQuery()




    // document ready function closing brackets
})
