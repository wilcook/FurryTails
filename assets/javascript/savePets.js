console.log("savePets.js is loaded");
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

        $(".iw_title").on('click', function() {

            $(".iw_content").append('<p>Save this record?</p><br><button id="yesSave">Yes</button><button id="noSave">No</button>');

            $("#yesSave").on('click', function() {
                console.log("yesSave click funciton recognized");

                database.ref().push({
                	animalSpecies: animalSpecies,
                	animalName: animalName,
                	animalBreed: animalBreed,
                	animalSex: animalSex,
                	animalPic: animalPictures[0].urlSecureFullsize,
                	animmalPhone: locationPhone,
                	animalLocationName: locationName,
                	animalAddress: locationAddress,
                	animalCityState: animalLocationCitystate,
                    uid: user.uid,
                    time_stamp: dbTimeStamp
                });

                console.log("========================================");
                console.log("uid: " + user.uid);
                console.log("animalName: " + animalName);
                console.log("animalBreed: " + animalBreed);
                console.log("animalSex: " + animalSex);
                console.log("animapPic: " + animalPictures[0].urlSecureFullsize)
                console.log("animalLocationName: " + locationName);
                console.log("animalAddress: " + locationAddress);
                console.log("animalCityState: " + animalLocationCitystate);
                console.log("animalPhone: " + locationPhone);
                console.log("========================================")

                return false;
            })

            // on pet info map tag click function closing bracket
        });

        // if argument closing brackets
    }
    // firebase auth check closing brackets
    // 

    $("#savedPets").on('click', function() {
        console.log("savedPets click funciton recognized");

    })
});
