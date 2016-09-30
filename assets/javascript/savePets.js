console.log("savePets.js is loaded");
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

        $("#saveAnimal").on('click', function() {
            console.log("saveAnimal click funciton recognized");

            database.ref().push({
                animalSpecies: animalName.animalSpecies,
                animalName: animalName.animalName,
                animalBreed: animalName.animalBreed,
                animalGeneralAge: animalName.animalGeneralAge,
                animalSex: animalName.animalSex,
                animalPic: animalName.animalPictures[0].urlSecureFullsize,
                animmalPhone: animalName.locationPhone,
                animalLocationName: animalName.locationName,
                animalCityState: animalName.animalLocationCitystate,
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


        // if argument closing brackets
    }
    // firebase auth check closing brackets
    // 

    $("#savedPets").on('click', function() {
        console.log("savedPets click funciton recognized");

    })
});
