window.fbAsyncInit = function () {
    FB.init({
        appId: '1235046306522295',
        xfbml: true,
        version: 'v2.4'
    });
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

FB.getLoginStatus(function (response) {
    if (response.status === 'connected') {
        console.log(response.authResponse.accessToken);
    }
});


FB.api('/me', function (response) {
    console.log(JSON.stringify(response));
});

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
          'Thanks for logging in, ' + response.name + '!';
    });
}