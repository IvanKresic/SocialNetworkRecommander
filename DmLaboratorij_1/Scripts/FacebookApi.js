window.fbAsyncInit = function () {
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
function checkValidId(data) {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: 'api/UserInfo',
        type: 'POST',
        contentType: 'application/json;',
        data: JSON.stringify(data),
        success: function (valid) {
            if (valid) {
                console.log("HURAAAsddadasdaAY!!!");
            } else {
                console.log("juhu!");
            }
        }
    });

    //*********** AJAX CONTROLLER CALL GET ***********
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: 'api/UserInfo/' + data.Facebook_ID,
        type: 'GET',
        contentType: 'application/json;',
        //data: JSON.stringify(data.Facebook_ID),
        success: function (valid) {
            if (valid) {
                console.log(valid);
            } else {
                console.log("GET JUHU" + valid);
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
        console.log("HAHAHAHAHAHHAHAHAHA");
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


function showData() {

    var userInfo =
            {
                Facebook_ID:"",
                Ime:"",
                Prezime:"",
                Email:"",
                DatumRodjenja:"",
                Hometown:"",
                ProfilePictureLink: "",
                Movies:""
            }

    FB.api('/me/picture?height=300&width=300', function (response) {
        document.getElementById("UserPicture").innerHTML = '<br><br><img id=ProfilePic src="' + response.data.url + '">';
        userInfo.ProfilePictureLink += response.data.url;
        getMovieInfo();
    });

    /*
    FB.api('/me/movies', function (response) {        
        response.data.forEach(function (entry) {         
            userInfo.Movies += entry.id+'#';
            console.log(userInfo.Movies);
            var a = entry.id;
            FB.api(a + '/picture?width=100&height=100', function (response) {
                var element = document.getElementById("UserMovies");
                var url = response.data.url;              

                FB.api(a, { fields: 'link' }, function (response) {
                    element.innerHTML = element.innerHTML + '<div class="FilmItem"><a href="' + response.link +
                        '"> <img class="FilmPicture" src=' + url + ' alt="' + entry.name + 'hspace="3px" vspace="3px" > </a><div class="NaslovIOpis" ><div class="Naslov">' + entry.name + '</div><div class="Opis">Lorem ipsum et domen</div></div></div>';
                    
                });
            });
        });
    });*/

    function convertToSlug(Text) {
        return Text
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '')
        ;
    }

    function trailerify(Text) {
        return Text.replace(" ", "%20");
    }

    function getMovieInfo() {
        var movieList = "The Shawshank Redemption*1994|The Godfather*1972|The Godfather: Part II*1974|The Dark Knight*2008|12 Angry Men*1957|Star Wars: The Force Awakens*2015|Schindler's List*1993|Pulp Fiction*1994|The Lord of the Rings: The Return of the King*2003|The Good, the Bad and the Ugly*1966|Fight Club*1999|The Lord of the Rings: The Fellowship of the Ring*2001|Inception*2010|Star Wars: Episode V - The Empire Strikes Back*1980|Forrest Gump*1994|The Lord of the Rings: The Two Towers*2002|One Flew Over the Cuckoo's Nest*1975|Seven Samurai*1954|The Matrix*1999|Goodfellas*1990|Star Wars*1977|Baahubali: The Beginning*2015|City of God*2002|Interstellar*2014|Se7en*1995|It's a Wonderful Life*1946|The Usual Suspects*1995|Life Is Beautiful*1997|The Silence of the Lambs*1991|Leon: The Professional*1994|Once Upon a Time in the West*1968|City Lights*1931|Spirited Away*2001|The Intouchables*2011|Casablanca*1942|Saving Private Ryan*1998|American History X*1998|Modern Times*1936|Psycho*1960|Raiders of the Lost Ark*1981|Rear Window*1954|The Green Mile*1999|Whiplash*2014|The Pianist*2002|Terminator 2: Judgment Day*1991|Gladiator*2000|The Departed*2006|Sunset Blvd.*1950|Back to the Future*1985|Memento*2000|Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb*1964|Apocalypse Now*1979|Cinema Paradiso*1988|The Prestige*2006|The Dark Knight Rises*2012|The Great Dictator*1940|The Lion King*1994|The Lives of Others*2006|Alien*1979|Paths of Glory*1957|Grave of the Fireflies*1988|Django Unchained*2012|3 Idiots*2009|The Shining*1980|Witness for the Prosecution*1957|WALL·E*2008|Princess Mononoke*1997|Das Boot*1981|M*1931|American Beauty*1999|Queen*2014|Once Upon a Time in America*1984|Oldboy*2003|Citizen Kane*1941|Aliens*1986|North by Northwest*1959|A Separation*2011|Amelie*2001|Vertigo*1958|Star Wars: Episode VI - Return of the Jedi*1983|Double Indemnity*1944|Sunrise*1927|Braveheart*1995|Chakde! India*2007|Requiem for a Dream*2000|To Kill a Mockingbird*1962|Lawrence of Arabia*1962|A Clockwork Orange*1971|Toy Story 3*2010|Reservoir Dogs*1992|The Kid*1921|Bicycle Thieves*1948|Inside Out*2015|Eternal Sunshine of the Spotless Mind*2004|Taxi Driver*1976|Singin' in the Rain*1952|Bhaag Milkha Bhaag*2013|All About Eve*1950|Gangs of Wasseypur*2012|The Sting*1973|Amadeus*1984|Yojimbo*1961|Rashomon*1950|Haider*2014|Full Metal Jacket*1987|The Treasure of the Sierra Madre*1948|Monty Python and the Holy Grail*1975|The Apartment*1960|2001: A Space Odyssey*1968|Ikiru*1952|Snatch.*2000|Metropolis*1927|For a Few Dollars More*1965|The Third Man*1949|Scarface*1983|Inglourious Basterds*2009|Some Like It Hot*1959|L.A. Confidential*1997|Toy Story*1995|PK*2014|Batman Begins*2005|Swades*2004|The Hunt*2012|Dilwale Dulhania Le Jayenge*1995|Indiana Jones and the Last Crusade*1989|Unforgiven*1992|Mr. Smith Goes to Washington*1939|Downfall*2004|Up*2009|The Great Escape*1963|On the Waterfront*1954|Raging Bull*1980|Ran*1985|The General*1926|The Gold Rush*1925|Good Will Hunting*1997|Wild Strawberries*1957|My Neighbor Totoro*1988|Chinatown*1974|Judgment at Nuremberg*1961|Heat*1995|The Seventh Seal*1957|Die Hard*1988|Pan's Labyrinth*2006|The Secret in Their Eyes*2009|Kahaani*2012|The Bridge on the River Kwai*1957|Howl's Moving Castle*2004|Blade Runner*1982|Warrior*2011|The Wages of Fear*1953|Incendies*2010|The Elephant Man*1980|Lock, Stock and Two Smoking Barrels*1998|The Wolf of Wall Street*2013|Rebecca*1940|Barfi!*2012|V for Vendetta*2005|It Happened One Night*1934|Casino*1995|Gone with the Wind*1939|Mad Max: Fury Road*2015|Bajrangi Bhaijaan*2015|Cool Hand Luke*1967|The Big Lebowski*1998|A Beautiful Mind*2001|The Martian*2015|How to Train Your Dragon*2010|Lagaan: Once Upon a Time in India*2001|Gran Torino*2008|Mary and Max*2009|Dial M for Murder*1954|The Deer Hunter*1978|Into the Wild*2007|The Best Years of Our Lives*1946|My Sassy Girl*2001|Trainspotting*1996|Rush*2013|Persona*1966|The Maltese Falcon*1941|Hachi: A Dog's Tale*2009|The 400 Blows*1959|Wild Tales*2014|Stalker*1979|Fargo*1996|Gone Girl*2014|Tae Guk Gi: The Brotherhood of War*2004|The Thing*1982|Diabolique*1955|The Battle of Algiers*1966|Throne of Blood*1957|The Sixth Sense*1999|Finding Nemo*2003|Touch of Evil*1958|Network*1976|Hotel Rwanda*2004|The Princess Bride*1987|Life of Brian*1979|The Grapes of Wrath*1940|No Country for Old Men*2007|Butch Cassidy and the Sundance Kid*1969|Fanny and Alexander*1982|Nausicaa of the Valley of the Wind*1984|The Legend of 1900*1998|Underground*1995|Kill Bill: Vol. 1*2003|Baby*2015|Platoon*1986|Black Cat, White Cat*1998|The Avengers*2012|In the Name of the Father*1993|There Will Be Blood*2007|Straight Outta Compton*2015|Stand by Me*1986|Amores Perros*2000|8½*1963|What Ever Happened to Baby Jane?*1962|The Last Picture Show*1971|Ben-Hur*1959|Le Samourai*1967|12 Years a Slave*2013|Laura*1944|The Grand Budapest Hotel*2014|Annie Hall*1977|Memories of Murder*2003|Departures*2008|Zindagi Na Milegi Dobara*2011|Shutter Island*2010|Infernal Affairs*2002|Chungking Express*1994|Million Dollar Baby*2004|Harry Potter and the Deathly Hallows: Part 2*2011|Donnie Darko*2001|Gandhi*1982|Before Sunrise*1995|3-Iron*2004|Solaris*1972|Cat on a Hot Tin Roof*1958|Barry Lyndon*1975|Guardians of the Galaxy*2014|La Haine*1995|Strangers on a Train*1951|Who's Afraid of Virginia Woolf?*1966|La Strada*1954|The Cabinet of Dr. Caligari*1920|Spring, Summer, Fall, Winter... and Spring*2003|La Dolce Vita*1960|Paris, Texas*1984|The Wizard of Oz*1939|The Celebration*1998|Sleuth*1972|Elite Squad: The Enemy Within*2010|The Bourne Ultimatum*2007|Sin City*2005|Ip Man*2008|Castle in the Sky*1986|Three Colors: Red*1994|Wings of Desire*1987|The Imitation Game*2014|Jurassic Park*1993|In the Mood for Love*2000|High Noon*1952|Anatomy of a Murder*1959|Roman Holiday*1953|The Man Who Shot Liberty Valance*1962|Elite Squad*2007|Notorious*1946|The Philadelphia Story*1940|The Night of the Hunter*1955|The Help*2011|Arsenic and Old Lace*1944|Stalag 17*1953|Rocky*1976|Harvey*1950|Akira*1988|The Sea Inside*2004|Twelve Monkeys*1995|A Christmas Story*1983|Monsters, Inc.*2001|The Hustler*1961|Groundhog Day*1993|The Big Sleep*1946|Rio Bravo*1959|Papillon*1973|Jaws*1975|The Truman Show*1998|Pirates of the Caribbean: The Curse of the Black Pearl*2003|The Terminator*1984|Dog Day Afternoon*1975|The Killing*1956|A Streetcar Named Desire*1951|A Fistful of Dollars*1964|All Quiet on the Western Front*1930|Prisoners*2013|Kal Ho Naa Ho*2003|Dogville*2003|Young Frankenstein*1974|The King's Speech*2010|Before Sunset*2004|X-Men: Days of Future Past*2014|Sling Blade*1996|The Diving Bell and the Butterfly*2007|Persepolis*2007|Pink Floyd The Wall*1982|The Wild Bunch*1969|Harold and Maude*1971|Beauty and the Beast*1991|His Girl Friday*1940|The Perks of Being a Wallflower*2012|The Manchurian Candidate*1962|The Nightmare Before Christmas*1993|Rope*1948|The Graduate*1967|Blood Diamond*2006|East of Eden*1955|Sicario*2015|This Is Spinal Tap*1984|Big Fish*2003|The Raid 2*2014|Magnolia*1999|Duck Soup*1933|Bringing Up Baby*1938|Patton*1970|Crimes and Misdemeanors*1989|JFK*1991|Aguirre, the Wrath of God*1972|The Exorcist*1973|The Straight Story*1999|Catch Me If You Can*2002|The Return*2003|Manhattan*1979|Star Trek*2009|Slumdog Millionaire*2008|Dead Poets Society*1989|Rain Man*1988|Jab We Met*2007|Brazil*1985|Waltz with Bashir*2008|Being There*1979|Talk to Her*2002|The Adventures of Robin Hood*1938|Nosferatu*1922|Short Term 12*2013|Central Station*1998|Charade*1963|Whisper of the Heart*1995|Doctor Zhivago*1965|Dances with Wolves*1990|Ratatouille*2007|Dawn of the Dead*1978|Ghost in the Shell*1995|All the President's Men*1976|Cinderella Man*2005|Dancer in the Dark*2000|Battleship Potemkin*1925|The Searchers*1956|In the Heat of the Night*1967|Boyhood*2014|Aladdin*1992|Her*2013|Secrets & Lies*1996|Black Swan*2010|Shadow of a Doubt*1943|No Man's Land*2001|The Sound of Music*1965|Dallas Buyers Club*2013|Kill Bill: Vol. 2*2004|Days of Heaven*1978|C.R.A.Z.Y.*2005|Fiddler on the Roof*1971|District 9*2009|Head-On*2004|Scent of a Woman*1992|Life of Pi*2012|Three Colors: Blue*1993|Rosemary's Baby*1968|Shaun of the Dead*2004|Casino Royale*2006|The Iron Giant*1999|Frankenstein*1931|Hannah and Her Sisters*1986|Amarcord*1973|The Lady Vanishes*1938|Mystic River*2003|Let the Right One In*2008|Planet of the Apes*1968|The Artist*2011|Special 26*2013|The Discreet Charm of the Bourgeoisie*1972|Serenity*2005|The Incredibles*2004|Mulholland Dr.*2001|Night of the Living Dead*1968|True Romance*1993|Breathless*1960|King Kong*1933|In Bruges*2008|The Man from Earth*2007|Moon*2009|Edward Scissorhands*1990|Freaks*1932|The Untouchables*1987|Spartacus*1960|The Pursuit of Happyness*2006|My Name Is Khan*2010|The Hobbit: An Unexpected Journey*2012|The Blues Brothers*1980|Letters from Iwo Jima*2006|The Hobbit: The Desolation of Smaug*2013|Before Midnight*2013|Almost Famous*2000|The Conversation*1974|Midnight Cowboy*1969|The Breakfast Club*1985|Glory*1989|The Remains of the Day*1993|The African Queen*1951|Hero*2002|Edge of Tomorrow*2014|Bridge of Spies*2015|The Bourne Identity*2002|The Notebook*2004|The Wrestler*2008|Key Largo*1948|Once*2007|Bride of Frankenstein*1935|The Quiet Man*1952|4 Months, 3 Weeks and 2 Days*2007|Nine Queens*2000|The Chaser*2008|Cowboy Bebop: The Movie*2001|Toy Story 2*1999|The Killing Fields*1984|The Killer*1989|The Outlaw Josey Wales*1976|Hard Boiled*1992|Bonnie and Clyde*1967|Ninja Scroll*1993|Children of Men*2006|All About My Mother*1999|A Prophet*2009|Badlands*1973|Do the Right Thing*1989|Breaking the Waves*1996|The Man Who Would Be King*1975|Stagecoach*1939|How to Train Your Dragon 2*2014|Ed Wood*1994|G.O.R.A.*2004|The Fall*2006|The Insider*1999|Crouching Tiger, Hidden Dragon*2000|The Right Stuff*1983|Carlito's Way*1993|Iron Man*2008|The Chorus*2004|Mr. Nobody*2009|The Double Life of Veronique*1991|Walk the Line*2005|My Fair Lady*1964|The Boondock Saints*1999|Jules and Jim*1962|Lilya 4-Ever*2002|Shrek*2001|Big Hero 6*2014|The Past*2013|The Ten Commandments*1956|The Fault in Our Stars*2014|Avatar*2009|Crash*2004|Nightcrawler*2014|Miracle on 34th Street*1947|Boogie Nights*1997|Miller's Crossing*1990|My Left Foot*1989|The Edge of Heaven*2007|The Fighter*2010|Halloween*1978|Gravity*2013|Captain Phillips*2013|Cabaret*1972|Kiki's Delivery Service*1989|The Man from Nowhere*2010|Taken*2008|The Girl Who Leapt Through Time*2006|Hot Fuzz*2007|Little Miss Sunshine*2006|The World's Fastest Indian*2005|Ferris Bueller's Day Off*1986|Down by Law*1986|Blue Is the Warmest Color*2013|Amour*2012|Veer-Zaara*2004|E.T. the Extra-Terrestrial*1982|Batman: Mask of the Phantasm*1993|Clerks*1994|The Girl with the Dragon Tattoo*2011|Glengarry Glen Ross*1992|The 39 Steps*1935|Me and Earl and the Dying Girl*2015|Predator*1987|Tombstone*1993|Adam's Apples*2005|The Girl with the Dragon Tattoo*2009|Ordinary People*1980|The Day of the Jackal*1973|I Saw the Devil*2010|Withnail & I*1987|The Best Offer*2013|The Motorcycle Diaries*2004|The Triplets of Belleville*2003|Evil*2003|The Day the Earth Stood Still*1951|Mississippi Burning*1988|Misery*1990|Hamlet*1996|Black Book*2006|Evil Dead II*1987|The Magnificent Seven*1960|Mother*2009|Drive*2011|Tangled*2010|Guess Who's Coming to Dinner*1967|Kuch Kuch Hota Hai*1998|About Time*2013|Back to the Future Part II*1989|Office Space*1999|Open Your Eyes*1997|Birdman or (The Unexpected Virtue of Ignorance)*2014|Fantasia*1940|American Gangster*2007|Willy Wonka & the Chocolate Factory*1971|The Wind Rises*2013|Silver Linings Playbook*2012|Fantastic Mr. Fox*2009|Star Trek Into Darkness*2013|Gattaca*1997|Belle de Jour*1967|October Sky*1999|Waking Life*2001|The Boy in the Striped Pajamas*2008|Love and Death*1975|Empire of the Sun*1987|Porco Rosso*1992|Moonrise Kingdom*2012|Blue Velvet*1986|Ghostbusters*1984|Pride & Prejudice*2005|The White Ribbon*2009|Zelig*1983|In America*2002|The French Connection*1971|Repulsion*1965|Apocalypto*2006|Rebel Without a Cause*1955|The Last of the Mohicans*1992|The Curious Case of Benjamin Button*2008|Dirty Harry*1971|The Lego Movie*2014|Happiness*1998|Hedwig and the Angry Inch*2001|The Lunchbox*2013|Harry Potter and the Prisoner of Azkaban*2004|Kingsman: The Secret Service*2014|The Dirty Dozen*1967|Zulu*1964|Atonement*2007|Invasion of the Body Snatchers*1956|Airplane!*1980|O Brother, Where Art Thou?*2000|The Fugitive*1993|The Goonies*1985|Captain America: The Winter Soldier*2014|Night on Earth*1991|Wreck-It Ralph*2012|The Longest Day*1962|The Color Purple*1985|The Hangover*2009|X-Men: First Class*2011|The Last Emperor*1987|South Park: Bigger Longer & Uncut*1999|Mary Poppins*1964|Lost in Translation*2003|Kung Fu Hustle*2004|The Tenant*1976|Boyz n the Hood*1991|The Game*1997|Run Lola Run*1998|Lucky Number Slevin*2006|From Here to Eternity*1953|Being John Malkovich*1999|Pride*2014|The Experiment*2001|Blazing Saddles*1974|Donnie Brasco*1997|Breakfast at Tiffany's*1961|What's Eating Gilbert Grape*1993|Skyfall*2012|Serpico*1973|Awakenings*1990|The Name of the Rose*1986|The Broken Circle Breakdown*2012|Goldfinger*1964|Changeling*2008|Finding Neverland*2004|The Sandlot*1993|The Bourne Supremacy*2004|(500) Days of Summer*2009|Argo*2012|3:10 to Yuma*2007|Kramer vs. Kramer*1979|A Bronx Tale*1993|Ocean's Eleven*2001|Nebraska*2013|The Social Network*2010|The Purple Rose of Cairo*1985|Remember the Titans*2000|The King of Comedy*1982|Ray*2004|Control*2007|Deliverance*1972|As Good as It Gets*1997|The Birds*1963|300*2006|Good Bye Lenin!*2003|Man on Fire*2004|The Red Violin*1998|Battle Royale*2000|Sabrina*1954|Star Trek II: The Wrath of Khan*1982|The Count of Monte Cristo*2002|A Hard Day's Night*1964|Flipped*2010|The Theory of Everything*2014|Road to Perdition*2002|The Machinist*2004|Rushmore*1998|Detachment*2011|Dark City*1998|Paprika*2006|Adaptation.*2002|Barton Fink*1991|Black Hawk Down*2001|Short Cuts*1993|21 Grams*2003|Dead Man's Shoes*2004|A Very Long Engagement*2004|The Last Samurai*2003|Cast Away*2000|The Great Beauty*2013|Enter the Dragon*1973|The Last King of Scotland*2006|Titanic*1997|Love Me If You Dare*2003|Mysterious Skin*2004|Delicatessen*1991|50/50*2011|Ex Machina*2015|Frost/Nixon*2008|Stardust*2007|Despicable Me*2010|Dead Man*1995|Fear and Loathing in Las Vegas*1998|Malcolm X*1992|Training Day*2001|Kick-Ass*2010|Brokeback Mountain*2005|Sympathy for Mr. Vengeance*2002|Giant*1956|Ponyo*2008|The Station Agent*2003|Zombieland*2009|25th Hour*2002|Harry Potter and the Deathly Hallows: Part 1*2010|Shine*1996|The Sweet Hereafter*1997|The Dinner Game*1998|Forbidden Planet*1956|Billy Elliot*2000|Gone Baby Gone*2007|Philadelphia*1993|The Butterfly Effect*2004|The Blind Side*2009|Primal Fear*1996|Close Encounters of the Third Kind*1977|Three Colors: White*1994|The Warriors*1979|Match Point*2005|The Producers*1967|This Is England*2006|Sense and Sensibility*1995|The Visitor*2007|After Hours*1985|Where Eagles Dare*1968|Love Actually*2003|The City of Lost Children*1995|Sophie's Choice*1982|Coraline*2009|Boy A*2007|Dazed and Confused*1993|Fearless*2006|Blood Simple.*1984|Show Me Love*1998|Who Framed Roger Rabbit*1988|Shane*1953|Saw*2004|Dangerous Liaisons*1988|Midnight in Paris*2011|The Muppet Christmas Carol*1992|Eastern Promises*2007|True Grit*2010|Snow White and the Seven Dwarfs*1937|Cell 211*2009|Blow-Up*1966|Lolita*1962|Zodiac*2007|First Blood*1982|Leviathan*2014|In a Better World*2010|Little Big Man*1970|The Secret World of Arrietty*2010|Sympathy for Lady Vengeance*2005|Star Wars: Episode III - Revenge of the Sith*2005|Minority Report*2002|La Vie en Rose*2007|Y Tu Mama Tambien*2001|End of Watch*2012|Seven Pounds*2008|Midnight Express*1978|Spellbound*1945|The Player*1992|Lost Highway*1997|The Big Blue*1988|Dawn of the Planet of the Apes*2014|The Fifth Element*1997|Kelly's Heroes*1970|Moulin Rouge!*2001|Traffic*2000|Grindhouse*2007|MASH*1970|Kiss Kiss Bang Bang*2005|Inside Man*2006|Watchmen*2009|Whale Rider*2002|I Am Sam*2001|Fried Green Tomatoes*1991|Stranger Than Fiction*2006|Philomena*2013|Harry Potter and the Goblet of Fire*2005|The Royal Tenenbaums*2001|The Wicker Man*1973|A Few Good Men*1992|The Hunger Games: Catching Fire*2013|Mad Max 2: The Road Warrior*1981|The Thin Red Line*1998|The Illusionist*2006|The Haunting*1963|High Plains Drifter*1973|Les Miserables*2012|The Jungle Book*1967|127 Hours*2010|Lethal Weapon*1987|The Flowers of War*2011|United 93*2006|The Skin I Live In*2011|Milk*2008|When Harry Met Sally...*1989|Blow*2001|28 Days Later...*2002|The Godfather: Part III*1990|Sherlock Holmes*2009|Thank You for Smoking*2005|The Kite Runner*2007|Ghost in the Shell 2: Innocence*2004|The Legend of Drunken Master*1994|House of Sand and Fog*2003|American Psycho*2000|Lord of War*2005|Superbad*2007|Munich*2005|Dracula*1931|The Crow*1994|Avengers: Age of Ultron*2015|The Raid: Redemption*2011|The Naked Gun: From the Files of Police Squad!*1988|The Others*2001|Volver*2006|Frozen*2013|Animal House*1978|Army of Darkness*1992|The Walk*2015|Man Bites Dog*1992|West Side Story*1961|Apollo 13*1995|The Party*1968|The Hurt Locker*2008|The Last Temptation of Christ*1988|The Hunt for Red October*1990|13 Assassins*2010|Escape from Alcatraz*1979|Zatoichi*2003|The Counterfeiters*2007|A Fish Called Wanda*1988|The Impossible*2012|Fury*2014|A Royal Affair*2012|Kung Fu Panda*2008|The Man Who Wasn't There*2001|Enemy at the Gates*2001|Indiana Jones and the Temple of Doom*1984|Following*1998|Funny Games*1997|The Time Machine*1960|Falling Down*1993|Hunger*2008|The Abyss*1989|It's a Mad, Mad, Mad, Mad World*1963|The Guns of Navarone*1961|Ip Man 2*2010|Lust, Caution*2007|The Little Mermaid*1989|Robin Hood*1973|The Piano*1993|Moneyball*2011|The Wave*2008|Secondhand Lions*2003|The Secret of NIMH*1982|Garden State*2004|Die Hard: With a Vengeance*1995|The Reader*2008|An American Werewolf in London*1981|Hoosiers*1986|Interview with the Vampire: The Vampire Chronicles*1994|The Great Debaters*2007|The Meaning of Life*1983|Mesrine Part 1: Killer Instinct*2008|The Omen*1976|Midnight Run*1988|Lone Survivor*2013|The Book Thief*2013|Dead Alive*1992|Dead Man Walking*1995|Little Children*2006|A Single Man*2009|Disconnect*2012|Ice Age*2002|Tucker and Dale vs. Evil*2010|The Town*2010|Rise of the Planet of the Apes*2011|Leaving Las Vegas*1995|Boys Don't Cry*1999|Collateral*2004|The Evil Dead*1981|Chaplin*1992|Tell No One*2006|Headhunters*2011|High Fidelity*2000|The Hours*2002|Batman*1989|The Fisher King*1991|Of Mice and Men*1992|Sideways*2004|Planes, Trains & Automobiles*1987|House of Flying Daggers*2004|Hugo*2011|Field of Dreams*1989|Christmas Vacation*1989|Hair*1979|Star Trek: First Contact*1996|The Hurricane*1999|What We Do in the Shadows*2014|The Damned United*2009|The Assassination of Jesse James by the Coward Robert Ford*2007|Ghost Dog: The Way of the Samurai*1999|The Natural*1984|August Rush*2007|The Edukators*2004|Sleepers*1996|Bullets Over Broadway*1994|Rudy*1993|The Cook, the Thief, His Wife & Her Lover*1989|Good Night, and Good Luck.*2005|Gangs of New York*2002|The Life of David Gale*2003|RoboCop*1987|Keith*2008|Jacob's Ladder*1990|Juno*2007|The Wind That Shakes the Barley*2006|42*2013|The Class*2008|Menace II Society*1993|Equilibrium*2002|Elizabeth*1998|The Bridges of Madison County*1995|Straw Dogs*1971|Green Street Hooligans*2005|Saving Mr. Banks*2013|Perfume: The Story of a Murderer*2006|Life as a House*2001|Quiz Show*1994|A Simple Plan*1998|Jackie Brown*1997|Reign Over Me*2007|The Curse of the Were-Rabbit*2005|The Painted Veil*2006|A Perfect World*1993|The Fly*1986|The Illusionist*2010|American Splendor*2003|Mission: Impossible - Rogue Nation*2015|Maria Full of Grace*2004|Southpaw*2015|The Man Who Knew Too Much*1956|Pleasantville*1998|Marathon Man*1976|American Graffiti*1973|Miracle*2004|Mulan*1998|Cloud Atlas*2012|Scott Pilgrim vs. the World*2010|Sherlock Holmes: A Game of Shadows*2011|The Conjuring*2013|Gallipoli*1981|Doubt*2008|We Need to Talk About Kevin*2011|Legends of the Fall*1994|Pinocchio*1940|Three Days of the Condor*1975|Freedom Writers*2007|A Nightmare on Elm Street*1984|Malena*2000|My Cousin Vinny*1992|Despicable Me 2*2013|The Ice Storm*1997|Selma*2014|The Orphanage*2007|Rust and Bone*2012|Harry Potter and the Half-Blood Prince*2009|Ant-Man*2015|Everything Is Illuminated*2005|Best in Show*2000|Total Recall*1990|[Rec]*2007|The Devil's Advocate*1997|Felon*2008|To Catch a Thief*1955|X2*2003|Harry Potter and the Sorcerer's Stone*2001|The Texas Chain Saw Massacre*1974|Buffalo '66*1998|The Aviator*2004|Fruitvale Station*2013|A History of Violence*2005|The Constant Gardener*2005|Source Code*2011|Pi*1998|Frenzy*1972|Open Range*2003|Biutiful*2010|The Adventures of Priscilla, Queen of the Desert*1994|The Devil's Backbone*2001|Still Alice*2014|From Russia with Love*1963|The Hobbit: The Battle of the Five Armies*2014|Babel*2006|Thesis*1996|In the Bedroom*2001|In the Loop*2009|Dracula*1992|Bad Education*2004|Bullitt*1968|The Mission*1986|The Three Burials of Melquiades Estrada*2005|2046*2004|Harry Potter and the Order of the Phoenix*2007|Suspiria*1977|Transamerica*2005|Trading Places*1983|Witness*1985|Beetlejuice*1988|The Proposition*2005|Heavenly Creatures*1994|Up in the Air*2009|Begin Again*2013|Looper*2012|Home Alone*1990|Ghost World*2001|Running Scared*2006|Sweeney Todd: The Demon Barber of Fleet Street*2007|Far from Heaven*2002|Inside Llewyn Davis*2013|Man on the Moon*1999|Mud*2012|Notes on a Scandal*2006|Alice in Wonderland*1951|Mean Streets*1973|Take Shelter*2011|X-Men*2000|Back to the Future Part III*1990";
        var movieArray = movieList.split("|");
        //http://www.omdbapi.com/?t=It's+a+Wonderful+Life&y=1946&plot=short&r=json

        var index;
        var name;
        var year;
        for (index = 0; index < movieArray.length; index++) {
            var dataArray = movieArray[index].split("*");
            name = dataArray[0];
            year = dataArray[1];

            Console.log(index+" "+name+" "+year);
            /*$.getJSON("http://www.omdbapi.com/?t=" + convertToSlug(entry.name) + "&y=&plot=short&r=json&tomatoes=true", function (OMDBresponse) {
                element.innerHTML = element.innerHTML + '<div class="FilmItem"></div>';
            });*/
        }
    }


    
    
    FB.api('/me', { fields: 'first_name,last_name,hometown,birthday,relationship_status' }, function (response) {
        document.getElementById("UserData").innerHTML =
        '<br><br>' +
        response.first_name + ' '+
        response.last_name + '<br>' +
        response.hometown.name + '<br>'+
        response.birthday + '<br>'+
        response.relationship_status + '<br>'+'<br><br>' 
        ;
        
        userInfo.Facebook_ID += response.id;
        userInfo.Ime += response.first_name;
        userInfo.Prezime += response.last_name;
        userInfo.Email += response.Email;
        userInfo.DatumRodjenja += response.birthday;
        userInfo.Hometown += response.hometown.name;


        console.log(userInfo);
        checkValidId(userInfo);        
    });

    FB.api(a + '/picture?width=100&height=100', function (response) {
        console.log(response);
    });
}