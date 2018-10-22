var http = require('http')
    , fs = require('fs')
    , url = require('url')
    , port = 8080;


// NOTE: your dataset can be as simple as the following, you need only implement
// functions for addition, deletion, and modification that are triggered by outside
// (i.e. client) actions, and made available to the front-end
// Format: Name (PKID), Type, Cuisine, Environment, Climate, Cost, Activities, Result (Calculated)
var data = [
    {
        'name': "name1", "type": "type1", "cuisine": "cuisine1", "environment": "env1", "climate": "climate1",
        "cost": "cost1", "activities": "activities1", "result": "result1"
    }
]

// Predetermined results based off data. Data determines which result gets calculated.
// Results are coordinates for use
var results = []

var server = http.createServer(function (req, res) {
    var uri = url.parse(req.url, true)

    switch (uri.pathname) {
        case '/':
            sendFile(res, 'public/index.html')
            break
        case '/index.html':
            sendFile(res, 'public/index.html')
            break
        case '/background.jpg':
            sendFile(res, 'public/images/planeBackground.jpg', 'image/jpeg')
            break
        case '/css/style.css':
            sendFile(res, 'public/css/style.css', 'text/css')
            break
        case '/js/scripts.js':
            sendFile(res, 'public/js/scripts.js', 'text/javascript')
            break
        case '/vue.js':
            sendFile(res, '/vue.js', 'text/javascript')
            break
        case '/addOrUpdateRow/': // must be a query in the form: /addOrUpdateRow/?name=stove&type=type&...&result=africa
            const query = url.parse(req.url, true).query
            if (addOrUpdateRow(query)) {
                // success
                res.end(JSON.stringify({'status': 'success'}));
            } else {
                // failure
                res.end(JSON.stringify({'status': 'failed', 'message': 'data not in correct format'}))
            }
            break
        case '/getObjByName/': // must be a query in the form: /getObjByName/?name=stove
            const query1 = url.parse(req.url, true).query
            const obj = JSON.stringify(getObjByName(query1))
            if (obj) {
                res.end(obj)
            } else {
                res.end(JSON.stringify({'status': 'failed', 'message': 'data not in correct format'}))
            }
            break
        default:
            console.log(uri.pathname)
            res.end('404 not found')
    }
})

server.listen(process.env.PORT || port);
console.log('listening on 8080')

// subroutines
// NOTE: this is an ideal place to add your data functionality

function sendFile(res, filename, contentType) {
    contentType = contentType || 'text/html';

    fs.readFile(filename, function (error, content) {
        res.writeHead(200, {'Content-type': contentType})
        res.end(content, 'utf-8')
    })
}

// res : object with same scheme as objects in data array
// return : true if successfull add/update operation
function addOrUpdateRow(res) {

    // check that the obj has same keys
    if (!compareKeys(res, data[0])) {
        console.log("cannot add row because it's not in the right format")
        return false
    }

    // if in dataset, replace
    let found = false
    data.find((o, i) => {
        if (o.name === res.name) {
            data[i] = res
            found = true
        }
    });
    if (found) return true

    // If not in dataset, add to it
    data.push(res)
    console.log("Data on server")
    console.log(data)
    return true
}

// getObj: string name that refers to a data object from the set we have
// return: json object found, if not found returns false
function getObjByName(json) {
    console.log("attempting to get via name=" + json.name)
    let obj = data.find(o => o.name === json.name)
    console.log("found: " + JSON.stringify(obj))
    if (obj) {
        return obj
    } else return false;
}

// copied from https://stackoverflow.com/questions/14368596/how-can-i-check-that-two-objects-have-the-same-set-of-property-names
function compareKeys(a, b) {
    var aKeys = Object.keys(a).sort();
    var bKeys = Object.keys(b).sort();
    return JSON.stringify(aKeys) === JSON.stringify(bKeys);
}