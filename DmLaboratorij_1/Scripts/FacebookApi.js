﻿window.fbAsyncInit = function () {
    FB.init({
        appId: '1235046306522295',
        xfbml: true,
        version: 'v2.5'
    });
    

    if (typeof facebookInit == 'function') {
        facebookInit();
    }

    FB.login(function (response) {
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            showData();
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
        }
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.com/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);    
}(document, 'script', 'facebook-jssdk'));





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
            //console.log(response);
            //checkValidId(response);
        } else if (response.status === 'not_authorized') {
            console.log("The user is logged in to Facebook, but has not authenticated your app");
        } else {
            console.log("The user is not logged in to Facebook.");
        }
    });
}

//**********AJAX CONTROLLER CALL POST ***********
function checkValidId(data, url, id) {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: url,
        type: 'POST',
        contentType: 'application/json;',
        data: JSON.stringify(data),
        success: function (valid) {
            if (valid) {
            } else {
            }
        }
    });

    //*********** AJAX CONTROLLER CALL GET ***********
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: url + id,
        type: 'GET',
        contentType: 'application/json;',
        //data: JSON.stringify(data.Facebook_ID),
        success: function (valid) {
            if (valid) {
            } else {
            }
        }
    });
}
//***************************************************

FB.api('/me', function (response) {
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

function userData() {
    if (document.getElementById('UserData').style.display == "none") {
        document.getElementById('UserData').style.display = 'block';


        FB.api('/me/picture?height=80&width=80', function (pictureResponse) {
            document.getElementById("UserData").innerHTML =
            '<img src="' + pictureResponse.data.url + '"></br><center>' +
            userInfo.Ime + ' ' +
            userInfo.Prezime + '<br>' +
            userInfo.Hometown + '<br>' +
            userInfo.DatumRodjenja + '<br>' +
            ' ' + '<br></center></br>';
        });
    }
    else {
        document.getElementById('UserData').style.display = 'none';
    }
}

function showData() {
    
    var movie;
    var userUrl = 'api/UserInfo/';
    var movieUrl = 'api/MovieInfo/';
    var genreUrl = 'api/Genres/';

    var userInfo =
            {
                Facebook_ID:"",
                Ime:"",
                Prezime:"",
                Email:"",
                DatumRodjenja:"",
                Hometown:"",
                ProfilePictureLink: "",
            }

    var movieInfo =
        {
            themoviedb_id:"",
            original_title: "",
            genreIDs:"",
            overview:"",
            release_date:"",
            vote_average: "",
            cast: "",
            crew: "",
            trailer:""
        }

    FB.api('/me', { fields: 'first_name,last_name,hometown,birthday,relationship_status' }, function (response) {

        var status;
        if (response.relationship_status == "undefined") {
            status += " ";
        }
        else {
            status += response.relationship_status;
        }
        
        userInfo.Facebook_ID += response.id;
        userInfo.Ime += response.first_name;
        userInfo.Prezime += response.last_name;
        userInfo.Email += response.Email;
        userInfo.DatumRodjenja += response.birthday;
        userInfo.Hometown += response.hometown.name;


        userInfo.Movies = {};
        var allMovies = {};
        var i = 0;
        FB.api('/me/movies', function (response) {
            
            response.data.forEach(function (entry)
            {
                userInfo.Movies[i] = { Title: entry.name };
                i++;
            })
            i = 0;
            console.log("\n\n\n\n ovo su svi filmovi:");
            console.log(userInfo.Movies);
            console.log(userInfo);
            checkValidId(userInfo, userUrl, userInfo.Facebook_ID);
        });
        
      
});

    giveMeMyMovies();

    FB.api('/me/picture?height=30&width=30', function (response) {
        document.getElementById("UserPicture").innerHTML = '<br><br><img id=ProfilePic src="' + response.data.url + '">';
        userInfo.ProfilePictureLink += response.data.url;
    });



    //*****
    //****

    var genre = { genre_id: "", genre_type: "" };
    $.getJSON('http://api.themoviedb.org/3/genre/movie/list?api_key=dbe4d58f24fb7262fd2fd134e6e21ea1', { format: "json" })
        .done(function (genreList)
        {
            genreList.genres.forEach(function (entry) {
                resetGenreInfo();
                genre.genre_id += entry.id;
                genre.genre_type += entry.name;
                //console.log(genre);
                checkValidId(genre, genreUrl, entry.id);
            })
        })
    
 //******Popunjavanje baze filmovima*******
 //   results = []
 //   for (i = 200; i <= 210; i++) {
 //       $.getJSON('http://api.themoviedb.org/3/movie/top_rated?api_key=dbe4d58f24fb7262fd2fd134e6e21ea1&page=' + i.toString(), { format: "json" }).done(function (obj) {
 //           results.push(obj);
 //           //console.log(obj.results);            
 //           obj.results.forEach(function (entry)
 //           {
 //               var detailMovieInfoUrl = 'http://api.themoviedb.org/3/' + 'movie/' + entry.id + '/credits' + '?api_key=dbe4d58f24fb7262fd2fd134e6e21ea1';
 //               $.getJSON(detailMovieInfoUrl, { format: "json" })
 //               .done(function (detailInfo) {
 //
 //               resetMovieInfo();
 //               movieInfo.themoviedb_id += entry.id;
 //               movieInfo.genreIDs += '{' + entry.genre_ids + '}';
 //               movieInfo.original_title += entry.original_title;
 //               movieInfo.overview += entry.overview;
 //               movieInfo.release_date += entry.release_date;
 //               movieInfo.vote_average += entry.vote_average;
 //               movieInfo.cast += detailInfo.cast[0].name + ", " + detailInfo.cast[1].name + ", " + detailInfo.cast[2].name;
 //               movieInfo.crew += detailInfo.crew[0].name + ", " + detailInfo.crew[1].name + ", " + detailInfo.crew[2].name;
 //               movieInfo.trailer += "";
 //               checkValidId(movieInfo, movieUrl, movieInfo.themoviedb_id);
 //
 //               })
 //           })
 //       })
 //   }


    FB.api('/me/movies', function (response) {        
        response.data.forEach(function (entry) {         
            //userInfo.Movies += entry.id+'#';
            var a = entry.id;
            FB.api(a + '/picture?width=130&height=200', function (response) {
                var element = document.getElementById("UserMovies");
                var myurl = response.data.url;

                FB.api(a, { fields: 'link' }, function (response) {
                    //**************
                    var url = 'http://api.themoviedb.org/3/',
                    mode = 'search/movie?query=',
                    input,
                    movieName,
                    key = '&api_key=dbe4d58f24fb7262fd2fd134e6e21ea1';
                    var input = entry.name,
                    movieName = encodeURI(input);
                    var finalUrl = url + mode + movieName + key;
                    var youTubeKey = 'AIzaSyAVUHIT23VFvUNSfVDcblA5opQZkQ7SE94';
                    
                    //*************
                    
                    $.getJSON(finalUrl, { format: "json" })
                        .done(function (data) {                            
                            var detailMovieInfoUrl = url + 'movie/' + data.results[0].id + '/credits' + '?api_key=dbe4d58f24fb7262fd2fd134e6e21ea1';
                            $.getJSON(detailMovieInfoUrl, { format: "json" })
                            .done(function (detailInfo) {
                                var movieTrailerUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&key=AIzaSyAVUHIT23VFvUNSfVDcblA5opQZkQ7SE94&q=' + movieName;
                                $.getJSON(movieTrailerUrl, { format: "json" })
                            .done(function (movieTrailer)
                            {
                            //   resetMovieInfo();
                            //   movieInfo.themoviedb_id += data.results[0].id;
                            //   movieInfo.genreIDs += '{' + data.results[0].genre_ids + '}';
                            //   movieInfo.original_title += data.results[0].original_title;
                            //   movieInfo.overview += data.results[0].overview;
                            //   movieInfo.release_date += data.results[0].release_date;
                            //   movieInfo.vote_average += data.results[0].vote_average;
                            //   movieInfo.cast += detailInfo.cast[0].name + ", " + detailInfo.cast[1].name + ", " + detailInfo.cast[2].name;
                            //   movieInfo.crew += detailInfo.crew[0].name + ", " + detailInfo.crew[1].name + ", " + detailInfo.crew[2].name;
                            //   movieInfo.trailer += movieTrailer.items[0].id.videoId;                             
                            //   checkValidId(movieInfo, movieUrl, movieInfo.themoviedb_id);                               
                                
                            //    element.innerHTML = element.innerHTML + '<div class="sve"><div class="FilmItem">' +
                            //                                                '<div class="Infomation">' +
                            //                                                       '<div class="posterFilm">' +
                            //                                                            '<a href="' + response.link + '"> <img src=' + myurl + ' alt="' + entry.name + 'hspace="3px" vspace="3px"  style="width:150px;height:220px;"></a>' +
                            //                                                       '</div>' +
                            //                                                       '<div class="NaslovIOpis" >' +
                            //                                                            '<div class="Naslov"> Title: ' + entry.name +
                            //                                                            '</div>' +
                            //                                                            '<div class="releaseDate"><b>Release date:</b> ' + data.results[0].release_date +
                            //                                                            '</div>' +
                            //                                                            '<div class="cast"><b>Cast:</b> ' + movieInfo.cast +
                            //                                                            '</div>' +
                            //                                                            '<div class="Opis"></br><b>Overwiev:</b></br> ' + data.results[0].overview +
                            //                                                            '</div>' +
                            //                                                        '</div>' +
                            //                                                        '<div class="rating" style="float:left;margin-right:10px;margin-top:10px;"><img src="/Content/IMDb.png" style="width:50px; height:30px;margin-top:-1.5px;">' + data.results[0].vote_average +
                            //                                                        '<img src="/Content/youtube.png" style="width:35px;height:22px;margin-top:-2px;margin-left:15px;border-right:1px solid black;"><button type="button" style="background-color:#e64a41;border:none;color:white;" onclick="toggleOnOff(' + movieInfo.themoviedb_id + ')">Watch Trailer!</button></div></div>' +
                            //                                                 
                            //                                            '</div><div class="Trailer" id="' + movieInfo.themoviedb_id + '"><iframe display:block title="YouTube video player" class="youtube-player" type="text/html" width="540" height="390" src=http://www.youtube.com/embed/' + movieInfo.trailer + ' frameborder="0" allowFullScreen></iframe></div></div>';
                            //    
                            })
                            })
                        })
                    })
                });
            });
    });
    


    function giveMeMyMovies()
    {
        var movieUrl = 'api/MovieInfo/';
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: movieUrl,
            type: 'GET',
            contentType: 'application/json;',
            //data: JSON.stringify(data.Facebook_ID),
            success: function (valid) {
                if (valid) {
                    JSON.stringify(valid);
                    console.log(valid);
                    console.log("ASLASDA");
                } else {
                }
            }
        });

    }

    function getFromDataBase(url)
    {
       
    }
    



    resetMovieInfo = function()
    {
        movieInfo.themoviedb_id = "";
        movieInfo.original_title = "";
        movieInfo.overview = "";
        movieInfo.release_date = "";
        movieInfo.vote_average = "";
        movieInfo.cast = "";
        movieInfo.crew = "";
        movieInfo.trailer = "";
        movieInfo.genreIDs = "";
    }

    resetGenreInfo = function()
    {
        genre.genre_id = "";
        genre.genre_type = "";
    }

    waitMe = function () {
        if (document.getElementById('wait').style.display == "none")
        {
            document.getElementById('wait').style.display = 'block';
            document.getElementById('start').style.display = 'block';
        }
        setTimeout(
       function () {
           
           document.getElementById('wait').style.display = 'none';
           document.getElementById('start').style.display = 'none';
       }, 10000);
    }
    
    toggleOnOff = function(id)
    {
        if(document.getElementById(id).style.display == "none")
        {
            document.getElementById(id).style.display = 'block';
        }
        else
        {
            document.getElementById(id).style.display = 'none';
        }
    }
    //
    waitMe();
        //
    FB.api(a + '/picture?width=100&height=100', function (response) {
        //console.log(response);
    });
}

