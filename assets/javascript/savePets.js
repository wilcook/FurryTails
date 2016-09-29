console.log("savePets.js is loaded");
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

        $(".iw_title").on('click', function() {

            $(".iw_content").append('<p>Save this record?</p><br><button id="yesSave">Yes</button><button id="noSave">No</button>');

            $("#yesSave").on('click', function() {
             	console.log("yesSave click funciton recognized");

                database.ref().push({
                    // species: ,
                    // name: ,
                    // record: ,
                    uid: user.uid,
                    time_stamp: dbTimeStamp
                });

                console.log("uid: " + user.uid);

                return false;
            })

            // on pet info map tag click function closing bracket
        });

        // if argument closing brackets
    }
    // firebase auth check closing brackets
    // 
 
 	$("#savedPets").on('click', function (){
 		console.log("savedPets click funciton recognized");

 	})
});
