//Alex's Google Places API Key -->   AIzaSyBsvkO6imt_7IYVXjmEBFOH_Cf0QCzUleI
const APIKey = 'AIzaSyBsvkO6imt_7IYVXjmEBFOH_Cf0QCzUleI'

// json : json object of a row from the data
// return : true if success, false if failed
function apiaddOrUpdateRow(json) {
    const url = '/addOrUpdateRow/?' + Object.entries(json).map(e => e.join('=')).join('&');
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = handle_add;
    xhr.open("GET", url);
    xhr.send();
    console.log("sent the add");
}

function handle_add() {
    console.log("start of handle add")
    if (this.readyState != 4) {
        console.log("ready state of post is not 4")
        return;
    }
    if (this.status != 200) {
        // error! 
    }
    console.log("RESPONSE IS");
    console.log(this.responseText);
    const resp = JSON.parse(this.responseText);
    return resp.name === 'success'
}

// json : json object containing name ({'name':'name1'})
// return : void, calls cb(json object row from dataset from server)
function apigetObjByName(json, cb) {
    const url = '/getObjByName/?name=' + json.name;
    console.log(url)
    let xhr = new XMLHttpRequest();
    let call = cb;
    console.log("cb fn: " + cb.toString())
    xhr.onreadystatechange = function () {
        handle_res(call, xhr);
    }.bind(call);
    xhr.open("GET", url);
    xhr.send();
    console.log("sent")
}

function handle_res(cb, x) {
    console.log("start of handle_res(cb)")
    console.log("cb fn: " + cb.toString())
    if (x.readyState !== 4) {
        console.log("ready state is not 4")
        return;
    }
    if (x.status !== 200) {
        console.log("status is not 200")
        // error! 
    }
    console.log("we in here")
    console.log("cb fn: " + cb.toString())
    console.log(x.responseText)
    const resp = JSON.parse(x.responseText);
    console.log(resp.type);
    cb(resp);
}

// var express = require('express');
// var app = express();
//
// // Add headers
// app.use(function (req, res, next) {
//
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
//
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//
//     // Pass to next layer of middleware
//     next();
// });

function getGooglePlaces(location) {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    let request = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://maps.googleapis.com/maps/api/place/textsearch/xml?query=' +
        location + '&key=' + APIKey, true);

    request.onload = function () {
        // Begin accessing JSON data here
    }

    // Send request
    request.send();
}

//Defining the structure of the JSON
// {
//     "type": "party",
//     "area": "tropical"
//     "activity_level": "low"
//     "cuisine": "yes"
//     "cost": "low"
// }

//Global strings
let BALI = {
    "location": "bali",
    "value": 0
};

let LONDON = {
    "location": "london",
    "value": 0
};

let PARIS = {
    "location": "paris",
    "value": 0
};

let ROME = {
    "location": "rome",
    "value": 0
};

let NYC = {
    "location": "new york city",
    "value": 0
};

let CRETE = {
    "location": "crete",
    "value": 0
};

let BARCELONA = {
    "location": "barcelona",
    "value": 0
};

let SIEM_REAP = {
    "location": "siem reap",
    "value": 0
};

let PRAGUE = {
    "location": "prague",
    "value": 0
};

let PHUKET = {
    "location": "phuket",
    "value": 0
};

let CUSCO = {
    "location": "cusco",
    "value": 0
};

let allLocations = [BALI, LONDON, PARIS, ROME, NYC, CRETE, BARCELONA, SIEM_REAP, PRAGUE, PHUKET, CUSCO];

//Array indices correspond to columns in the matrix
const PARTY_STRING = "party";
const SIGHT_SEEING_STRING = "sightSeeing";
const CULTURAL_STRING = "cultural";
const TROPICAL_STRING = "tropical";
const COASTAL_STRING = "coastal";
const CITY_STRING = "city";
const MOUNTAINS_STRING = "mountains";
const ACTIVITY_LOW_STRING = "activityLow";
const ACTIVITY_MED_STRING = "activityMed";
const ACTIVITY_HIGH_STRING = "activityHigh";
const CUISINE_YES_STRING = "cuisineYes";
const CUISINE_NO_STRING = "cuisineNo";
const COST_LOW_STRING = "costLow";
const COST_MED_STRING = "costMed";
const COST_HIGH_STRING = "costHigh";

const answerTypes = [
    PARTY_STRING,
    SIGHT_SEEING_STRING,
    CULTURAL_STRING,
    TROPICAL_STRING,
    COASTAL_STRING,
    CITY_STRING,
    MOUNTAINS_STRING,
    ACTIVITY_LOW_STRING,
    ACTIVITY_MED_STRING,
    ACTIVITY_HIGH_STRING,
    CUISINE_YES_STRING,
    CUISINE_NO_STRING,
    COST_LOW_STRING,
    COST_MED_STRING,
    COST_HIGH_STRING
];

//..........
const locationDataMatrix = [
    [LONDON, PARIS, NYC, BARCELONA, PRAGUE, PHUKET, CUSCO],
    [BALI, PARIS, ROME, NYC, CRETE, BARCELONA, SIEM_REAP, PHUKET, CUSCO],
    [BALI, PARIS, BARCELONA, SIEM_REAP, PRAGUE, PHUKET, CUSCO],
    [BALI, PHUKET],
    [BALI, CRETE, BARCELONA, PHUKET],
    [LONDON, PARIS, ROME, NYC, BARCELONA, SIEM_REAP, PRAGUE],
    [CUSCO],
    [BALI, CRETE, PHUKET],
    [LONDON, PARIS, ROME, NYC, BARCELONA, SIEM_REAP, PRAGUE],
    [CUSCO],
    [PARIS, ROME, CRETE, BARCELONA, SIEM_REAP, PHUKET],
    [BALI, LONDON, NYC, PRAGUE, CUSCO],
    [PARIS, ROME, NYC, CRETE, BARCELONA],
    [LONDON, PRAGUE, CUSCO],
    [BALI, SIEM_REAP, PHUKET]
];

//Algorithm to
function generateUserResult(quizResults) {
    const LOG_TAG = 'algorithm: ';

    console.log(LOG_TAG + '!!started!!');

    //Parse over the five questions in the quiz
    for (let j = 0; j < quizResults.length; j++) {
        let answer = quizResults[j];

        //Get the users answer to the quiz
        for (let k = 0; k < answerTypes.length; k++) {
            let answerType = answerTypes[k];

            //If answer matches one of the pre-defined answers...
            if (answer === answerType) {
                //Then get the locations associated to that answer and for each location associated to the answer
                //  add one to it's accumulatedValues value
                let locations = locationDataMatrix[k];

                for (let l = 0; l < locations.length; l++) locations[l].value += 1;
            }
        }
    }

    console.log(LOG_TAG + 'Starting to analyse data');

    let highestScoreLocation;
    let currLocation;

    for (let i = 0; i < allLocations.length; i++) {
        currLocation = allLocations[i];

        if (i === 0) {
            highestScoreLocation = allLocations[i];
            continue;
        }
        if (currLocation.value > highestScoreLocation.value) {
            highestScoreLocation = currLocation;
        }
    }

    console.log(LOG_TAG + 'highestScoreLocation: ' + highestScoreLocation.location +
        ', value: ' + highestScoreLocation.value);

    return highestScoreLocation.location;
}