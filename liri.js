require('dotenv').config()
var keys = require("./keys.js");
var moment = require('moment');
moment().format();
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var searchType = process.argv[2];
var searchString = process.argv.slice(3).join(" ");
var fs = require("fs");

if (searchType === "do-what-it-says") {
    fs.appendFile("log.txt", searchType + "\r\n", function (err) {
        if (err) {
            return console.log(err);
        };
    });
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        };
        data = data.split(",");
        searchType = data[0];
        searchString = data[1];
        liri();
    });

} else {
    liri();
}

function liri() {
    if (searchType === "concert-this") {
        axios.get("https://rest.bandsintown.com/artists/" + searchString + "/events?app_id=codingbootcamp")
            .then(function (response) {
                var concertHeader = "----------------------------------------------\nUpcoming concerts for " + response.data[0].lineup[0] + ":\n----------------------------------------------";
                console.log(concertHeader);
                fs.appendFile("log.txt", searchType + "\n" + concertHeader+"\n", function (err) {
                    if (err) {
                        return console.log(err);
                    };
                });
                for (i = 0; i < response.data.length; i++) {
                    console.log("Venue: " + response.data[i].venue.name);
                    if (response.data[i].venue.region === "") {
                        console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                        fs.appendFile("log.txt", "Venue: " + response.data[i].venue.name + "\nLocation: " + response.data[i].venue.city + ", " + response.data[i].venue.country, function (err) {
                            if (err) {
                                return console.log(err);
                            };
                        });
                    } else {
                        console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
                        fs.appendFile("log.txt", "Venue: " + response.data[i].venue.name + "\nLocation: " + response.data[i].venue.city + ", " + response.data[i].venue.region, function (err) {
                            if (err) {
                                return console.log(err);
                            };
                        });
                    }
                    var concertFooter = "- - - - - - - - - - - - - - - - - - - - - "; 
                    console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                    console.log(concertFooter);
                    fs.appendFile("log.txt", "\nDate: " + moment(response.data[i].datetime).format('MM/DD/YYYY')+"\n"+concertFooter+"\n", function (err) {
                        if (err) {
                            return console.log(err);
                        };
                    });
                };
            });
    }

    else if (searchType === "spotify-this-song") {
        if (searchString !== "") {
            spotify.search({ type: 'track', query: searchString }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                };
                var spotifyPrint = "----------------------------------------------\nResults for: " + searchString+"\n----------------------------------------------\nArtist: " + data.tracks.items[0].artists[0].name+"\nSong: " + data.tracks.items[0].name+"\nSong Link: " + data.tracks.items[0].external_urls.spotify+"\nAlbum: " + data.tracks.items[0].album.name;
                console.log(spotifyPrint);
                fs.appendFile("log.txt", "\n\n\n"+searchType+" - "+searchString+"\n"+spotifyPrint, function(err){
                    if (err) {
                        return console.log(err);
                    };
                });
            });
        } else {
            spotify.search({ type: 'track', query: "the sign" }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                };
                var spotifyPrint = "----------------------------------------------\nResults for: The Sign\n----------------------------------------------\nArtist: " + data.tracks.items[9].artists[0].name+"\nSong: " + data.tracks.items[9].name+"\nSong Link: " + data.tracks.items[9].external_urls.spotify+"\nAlbum: " + data.tracks.items[9].album.name;
                console.log(spotifyPrint);
                fs.appendFile("log.txt", "\n\n\n"+searchType+" - "+searchString+"\n"+spotifyPrint, function(err){
                    if (err) {
                        return console.log(err);
                    };
                });
            });
        };
    }

    else if (searchType === "movie-this") {
        if (searchString !== "") {
            axios.get("http://www.omdbapi.com/?t=" + searchString + "&y=&plot=short&apikey=trilogy")
                .then(function (response) {
                    var moviePrint1 = "----------------------------------------------\n"+response.data.Title+"\n----------------------------------------------\nYear Released: " + response.data.Year+"\nIMDB Rating: " + response.data.imdbRating;
                    var moviePrint2 = "Country: " + response.data.Country+"\nLanguage: " + response.data.Language+"\nPlot: " + response.data.Plot+"\nActors: " + response.data.Actors
                    console.log(moviePrint1);
                    fs.appendFile("log.txt", "\n\n\n"+searchType+" - "+searchString+"\n"+moviePrint1, function(err){
                        if (err) {
                            return console.log(err);
                        };
                    });
                    for (i = 0; i < response.data.Ratings.length; i++) {
                        if (response.data.Ratings[i].Source === "Rotten Tomatoes") {
                            console.log("Rotten Tomatoes: " + response.data.Ratings[i].Value);
                            fs.appendFile("log.txt", "\nRotten Tomatoes: " + response.data.Ratings[i].Value, function(err){
                                if (err) {
                                    return console.log(err);
                                };
                            });
                        };
                    };
                    console.log(moviePrint2);
                    fs.appendFile("log.txt", "\n"+moviePrint2, function(err){
                        if (err) {
                            return console.log(err);
                        };
                    });
                });

        } else {
            axios.get("http://www.omdbapi.com/?t=mr%20nobody&y=&plot=short&apikey=trilogy")
                .then(function (response) {
                    var moviePrint1 = "----------------------------------------------\n"+response.data.Title+"\n----------------------------------------------\nYear Released: " + response.data.Year+"\nIMDB Rating: " + response.data.imdbRating;
                    var moviePrint2 = "Country: " + response.data.Country+"\nLanguage: " + response.data.Language+"\nPlot: " + response.data.Plot+"\nActors: " + response.data.Actors
                    console.log(moviePrint1);
                    fs.appendFile("log.txt", "\n\n\n"+searchType+" - "+searchString+"\n"+moviePrint1, function(err){
                        if (err) {
                            return console.log(err);
                        };
                    });
                    for (i = 0; i < response.data.Ratings.length; i++) {
                        if (response.data.Ratings[i].Source === "Rotten Tomatoes") {
                            console.log("Rotten Tomatoes: " + response.data.Ratings[i].Value);
                            fs.appendFile("log.txt", "\nRotten Tomatoes: " + response.data.Ratings[i].Value, function(err){
                                if (err) {
                                    return console.log(err);
                                };
                            });
                        };
                    };
                    console.log(moviePrint2);
                    fs.appendFile("log.txt", "\n"+moviePrint2, function(err){
                        if (err) {
                            return console.log(err);
                        };
                    });
                });
        };
    };
};
