window.fbAsyncInit = function () {
    FB.init({
        appId: '1235046306522295',
        xfbml: true,
        version: 'v2.5'
    });

    if (typeof facebookInit == 'function') {
        facebookInit();
    }
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.com/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


FB.login(function (response) {
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
    }
});
//FB.login(function (response) { 
//    // handle the response
//}, { scope: 'public_profile,email' });

function getLoginStatus() {
    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            // the user is logged in and has authenticated your
            // app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed
            // request, and the time the access token 
            // and signed request each expire
            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;            
            var data = uid + "#" + accessToken;
            checkValidId(data);
        } else if (response.status === 'not_authorized') {
            console.log("The user is logged in to Facebook, but has not authenticated your app");
        } else {
            console.log("The user is not logged in to Facebook.");
        }
    });
}

//**********AJAX POZIV PREMA CONTROLLER-u***********
function checkValidId(data) {
    $.ajax({
        url: 'api/UserInfo',
        type: 'GET',
        contentType: 'application/json;',
        //data: JSON.stringify({ id: data }),
        success: function (valid) {
            if (valid) {
                console.log("HURAAAAY!!!");
            } else {
                console.log("juhu!");
            }
        }
    });
}
//***************************************************

FB.api('/me', function (response) {
    console.log(JSON.stringify(response));
});

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name.split(" ")[0]);
        document.getElementById("zamolba").innerHTML =
          '<br /><br /><center>Hvala na prijavi, ' + response.name.split(" ")[0] + '!</center>';
        document.getElementById("zamolba").visibility = 'visible';
    });
    //getLoginStatus();
}

function checkLoginState() {
        FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
    });
}

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        //var uid = response.authResponse.userID;
        //var accessToken = response.authResponse.accessToken;
        //var userID = response.authResponse.userID;
        //console.log(accessToken + "  " + userID);
        // Logged into your app and Facebook.
        testAPI();
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('UserPicture').innerHTML = '';
        document.getElementById('UserData').innerHTML = '';
        document.getElementById('UserMovies').innerHTML = '';
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('UserPicture').innerHTML = '';
        document.getElementById('UserData').innerHTML = '';
        document.getElementById('UserMovies').innerHTML = '';
    }
}

function showFourth() {
    document.getElementById("dbFetchResult").innerHTML = '<li>Valentino Munda<\li>';
}

function showData() {

    FB.api('/me/picture?height=300&width=300', function (response) {
        document.getElementById("UserPicture").innerHTML = '<br><br><img src="'+response.data.url+'">';
    });
    
    
    FB.api('/me', { fields: 'first_name,last_name,hometown,birthday,relationship_status' }, function (response) {
        document.getElementById("UserData").innerHTML =
        '<br><br>' +
        response.first_name + ' '+
        response.last_name + '<br>' +
        response.hometown.name + '<br>'+
        response.birthday + '<br>'+
        response.relationship_status + '<br>'+'<br><br>' 
        ;
    });

    FB.api('/me/movies', function (response) {
        response.data.forEach(function (entry) {
            var a = entry.id;
            FB.api(a + '/picture?width=100&height=100', function (response) {
                var element = document.getElementById("UserMovies");
                var url = response.data.url;

                FB.api(a, { fields: 'link' }, function (response) {
                    element.innerHTML = element.innerHTML + '<a href="'+response.link+'"> <img src=' + url + ' alt="' + entry.name + 'hspace="3px" vspace="3px" > </a>';
                });
            });
        });
    });

    FB.api(a + '/picture?width=100&height=100', function (response) {
        console.log(response);
    });
}