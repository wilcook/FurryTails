$('document').ready(function() {
    console.log("login.js loaded");

    $("#loginBox").hide();

    // var callbacks = $.Callbacks();
    // callbacks.add(showLogin);

    $("#login").on('click', function() {
        console.log("login click recognized");
        $("#regBox").hide();
        $("#leftPanel").hide();
        $("#loginBox").show();

       // login on click closing bracket
    });


    $("#loginBtn").on('click', function() {
        // var email = $("#email").val();
        // var password = $("#password").val();
        var email = 'dog@gmail.com';
        var password = 'password';

        //console log click event 
        console.log("////////////////////////");
        // console.log("email: " + email);
        // console.log("password: " + password);
        //console log click event 
        console.log("login Btn click recognized");
        // variables 


        //console log click event 
        console.log("////////////////////////");
        console.log("email: " + email);
        console.log("password: " + password);

        // console.log("firebase.provider: " + firebase.provider);
        // console.log("firebase.auth().signInWithEmailAndPassword: " + firebase.auth().signInWithEmailAndPassword);


        // authentication
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            console.log("authentication function ran");

            // Handle Errors here.
            // variables to hold error messages
            var errorCode = error.code;
            var errorMessage = error.message;

            // console log the error codes
            console.log("errorCode: " + errorCode);
            console.log("errorMessage: " + errorMessage);

            if (errorCode === 'auth/wrong-password') {
                $(".cardMessage").html("<p><br>" + errorMessage + "</p>");
                // clear the input fields
                $("#email").val("");
                $("#password").val("");
            } else {
                // display the error message above the regular login message
                $(".cardMessage").html("<p><br>" + errorMessage + "</p>");

                // clear the input fields
                $("#email").val("");
                $("#password").val("");
            }

            // firbase email and password authentication closing brackets
        });



        // this.onAuth('onComplete', function(authData) {
        //     if (authData) {
        //         console.log("Authenticated with uid:", authData.uid);
        //     } else {
        //         console.log("Client unauthenticated.")
        //     }
        // });
        return false;

        // login on click closing brackets
    });

    // forgot password on click event
    $("#forgot").on('click', function() {
        console.log("forgot button click is recognized");

        var auth = firebase.auth();
        email = $("#email").val().trim();
        console.log("forgot email email: " + email);

        auth.sendPasswordResetEmail(email).then(function() {
            // Email sent.
        }, function(error) {
            // An error happened.
        });

        return false;

        //closing brackets for forgot password on click event 
    });

    var user = firebase.auth().currentUser;

    // event listener for authentication state change
    firebase.auth().onAuthStateChanged(function(user) {
        if (user !== null) {
            console.log('logged in!');
            console.log("user: " + user);

            // test authentication
            console.log("firebase.User.uid: " + firebase.auth().currentUser.uid);

            // console log the variables
            console.log("email: " + email);
        }

        // authentication listener closing brackets
    });


    //document ready closing brackets
})



// // authentication
//            firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {











// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//     }
// });
