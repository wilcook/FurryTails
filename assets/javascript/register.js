$('document').ready(function() {

    //console log that index is calling register.js
    console.log("register.js is loaded")
        //////////////////////////////////////////////////////////////////////////////////////////////////////
        // hides registration box 
    $("#regBox").hide();

    //////////////////////////////////////////////////////////////
    // register and log on to firebase
    function createAccount(email, password) {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            console.log("initiated firebase.auth().createUserWithEmailAndPassword");

            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            $(".card-title").html(errorMessage);
            // ...

            //firebase registration closing brackets
        });
    }

    ////////////////////////////////////////////////////////////////
    ///authlistener function
    //////////////////////////////////////////////////////////////
    // check for already logged in user
    function checkAuth() {
        var user = firebase.auth().currentUser;
        console.log("user: " + user);

        var name, email, uid;

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                loggedOn = true;
                console.log("somebody is signed in");
            } else {
                console.log("No one is signed in.")
            }
        });
    }

    //////////////////////////////////////////////////////////////
    // update display name
    // /////////////////////////////////////////////////////////

    function updateAccount() {

        user.updateProfile({
            displayName: uName,
        }).then(function() {
            // Update successful.
            console.log("displayName: " + firebase.auth().currentUser.displayName);
        }, function(error) {})
    }


    //////////////////////////////////////////////////////////
    ///register button click
    //////////////////////////////////////////////////////////

    $("#register").on('click', function() {
        console.log("register click recognized");
        $("#loginBox").hide();
        $("#regBox").show();


        //closing brackets for register menu item on click event 
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // on click event for regBtn button
    $("#regBtn").on('click', function() {

        // console log click event
        console.log("regBtn button click recognized");

        // grabs registration form fields
        var fName = $("#fName").val().trim().toString();
        var lName = $("#lName").val().trim().toString();
        var uName = $("#uName").val().trim().toString();
        var email = $("#email").val().trim().toString();
        var password = $("#password").val().trim().toString();
        var anyCriteria = [];

        // pushes field input holding variables to array anyCriteria
        anyCriteria.push(fName, lName, uName, email, password);

        // console log variablees to hold user input
        console.log("fName: " + fName)
        console.log("lName: " + lName);
        console.log("uName: " + uName);
        console.log("email: " + email);
        console.log("password: " + password);
        console.log("anyCriteria: " + anyCriteria);
        ///////////////////////////////////////////////////////////////////////////

        for (var i = 0; i <= anyCriteria.length; i++) {
            if (anyCriteria[i] == false) {
                $(".card-title").html("Please complete all fields.");
                return;
            }
            // for loop closing bracket
        }
        createAccount(email, password);
        $.when(createAccount).done(checkAuth());
        $.when(checkAuth).done(updateAccount(uName));
        return false;
        $("#regBox").hide();
        // regBtn on click closing brackets
    });

    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////


    //document ready function closing brackets 
});
