        console.log("fbaseAuthObserver is loaded");

        // check for already logged in user
        var user = firebase.auth().currentUser;
        console.log("user: " + user);

        var name, email, photoUrl, uid;

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
            	$("#item1").html('<li><a  id="savedPets" href="#!">Saved Pets</a></li>');
            	$("#item2").html('<li><a  id="logout" href="#!">Logout</a></li>');

                // User is signed in.
                console.log(user + " is signed in.");
                userName = user.displayName;
                email = user.email;
                photoUrl = user.photoURL;
                uid = user.uid;
                loggedOn = true;

                console.log("loggedOn: " + loggedOn);
                console.log("userName: " + userName);
                console.log("uid: " + uid);

            } else {
            	$("#item1").html('<li><a  id="login" href="#!">Login</a></li>');
            	$("#item2").html('<li><a id="register" href="#!">Register</a></li>');
                console.log("No one is signed in.")
            }
        });
