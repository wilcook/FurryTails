    console.log("logout.js is loaded");

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $("#logout").on('click', function() {
                console.log("logout click recognized");

                firebase.auth().signOut().then(function() {
                    // Sign-out successful.
                    console.log("signed out");

                }, function(error) {
                    // variables to hold error messages
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    // console log the error codes
                    console.log("errorCode: " + errorCode);
                    console.log("errorMessage: " + errorMessage);
                });
                // logout close
            });



        }
    });
