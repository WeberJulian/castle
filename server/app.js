const rp = require('request-promise');
const cheerio = require('cheerio');
const fetch = require("node-fetch");
var hostelFectching = require("./getHostelList")
var { loadHostels, updateHostels } = hostelFectching

async function startup(){
    hostels = await updateHostels()
    //hostels = await loadHostels()
    //hostels = await michelin(hostels)
    console.log(hostels)
}

async function testRelais(){
    var uri = "https://www.relaischateaux.com/us/france/albert-haute-savoie-chamonix-mont-blanc"
    const options = {
        uri: uri,
        transform: function (body) {
            return cheerio.load(body);
        }
    }
    var $ = await rp(options)
    console.log($(".richTextMargin").text())
}

async function testMichelin(){
    var response = await fetch('https://restaurant.michelin.fr/2clh5yg/le-parc-les-crayeres-reims')
    response = await response.text()
    if(response.includes("cotation3etoiles")){
        console.log("yes")
    }
    console.log(response.includes("icon-cotation2etoiles"))
}

startup()
//testMichelin()