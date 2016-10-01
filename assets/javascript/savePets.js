console.log("savePets.js is loaded");
$('footer').hide;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

        $("button").on('click', "#saveAnimal", function() {
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
                // notes: "",
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
        // At the initial load, get a snapshot of the current data.

firebase.database().ref().on("child_added", function(dataSnapshot) {

// data snapshot variables
    var recUID = dataSnapshot.val().uid;
    var recSpecies = dataSnapshot.val().animalSpecies;
    var recName = dataSnapshot.val().animalName;
    var recPhone = dataSnapshot.val().animalPhone;
    var recLocation = dataSnapshot.val().animalLocationName;
    var recCityState = dataSnapshot.val().animalLocationCitystate;
    var recPic = dataSnapshot.val().animapPic;
    // var notes = dataSnapshot.val().notes;


//console log the data snapshot variables
console.log("recUID: " + recUID);
console.log("recSpecies: " + recSpecies);
console.log("animalPhone: " + animalPhone);
console.log("recName " + recName);
console.log("recLocation: " + recLocation);
console.log("recCityState " + recCityState);
console.log("recPic: " + recPic);
console.log("current userID: " + user.uid);


if(recUserID == userID){

// append to dashboard
$("#saved").append(
    '<td id="recName">' 
    + recName
    + ' </td><td id="recPic">' 
    + recPic
    + '</td></h5><p><td id="recSpecies">' 
    + recSpecies
    + '</td><td id="recPhone">'
    + recPhone
    + '</td><td id="location">'
    + recLocation
    + '</td><td id="cityState">'
    + recCityState
    + '</td>');

// if recUserID == userID closing bracket
}

// data snapshot closing bracket
});

// if user !== null closing bracket
// }

// auth state listener closing bracket
});

    })
});
