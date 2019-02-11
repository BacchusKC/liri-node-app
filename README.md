# liri-node-app

## Overview

* This is a node based bot that can search for various things based on user input.

1. This app uses:

    * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

    * [Axios](https://www.npmjs.com/package/axios)

    * [Moment](https://www.npmjs.com/package/moment)

    * [DotEnv](https://www.npmjs.com/package/dotenv)

    * [OMDB API](http://www.omdbapi.com)

    * [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

2. Image/gif of app in use:

    * [Screenshot](assets/screenshot.png)

    * [Gif](assets/inUse.gif)

3. The commands to use this app are:

    * movie-this: Uses Axios to get data from OMDB. Ex: `node liri.js movie-this pulp fiction`

    * spotify-this-song: Uses Node-Spotify-API to get song information using hidden keys in an .env file. Ex: `node liri.js spotify-this-song the less i know the better`

    * concert-this: Uses Axios to get data from Bands In Town API and uses Moment to format times of concerts. Ex: `node liri.js concert-this elton john`

    * do-what-it-say: Uses `fs` to read the contents of random.txt and complete the search. Ex: `node liri.js do-what-it-says`

