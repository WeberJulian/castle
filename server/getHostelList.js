var request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
var he = require('he');
const fetch = require("node-fetch");
const rp = require('request-promise');

module.exports = {
    loadHostels: async function () {
        if (fs.existsSync("hostels.json")) {
            var hostels = fs.readFileSync("hostels.json");
            hostels = await JSON.parse(hostels)
            return hostels
        }
        else {
            return {}
        }
    },
    updateHostels: async function () {
        console.log("Fetching the list of hostels...")
        const options = {
            uri: 'https://www.relaischateaux.com/us/site-map/etablissements',
            transform: function (body) {
                return cheerio.load(body);
            }
        }
        let $ = await rp(options)
        $("#countryF").first().remove()
        var france = $("#countryF").first().html()
        var links = france.split('"').filter(word => word.includes("https://www.relaischateaux.com/us/france/"));
        var hotels = []

        var i, j, temp, chunk = 5;
        for (i = 0, j = links.length; i < j; i += chunk) {
            console.log("Fetching each hostel details : " + Math.floor(i * 100 * 10 / links.length) / 10 + "%")
            temp = links.slice(i, i + chunk);
            hotels = hotels.concat(await batchRequestHostels(temp))
            sleep(150)
        }
        fs.writeFileSync('hostels.json', JSON.stringify(hotels, null, 2));
        return hotels
    },
    onlyMichelin: async function(hostels){
        batchRequestAutocompletion(hostels)
    }
}

async function batchRequestAutocompletion(hotels) {
    let res = []
    var counter = 0
    for (let i = 0; i < hotels.length; i++) {
        res.push(fetch("https://restaurant.michelin.fr/index.php?q=search/autocomplete/" + encodeURI(hotels[i].name)))
    }
    for (let i = 0; i < hotels.length; i++) {
        var response = await res[i]
        response = (await response.json())
        if (response.toString().includes("Aucun résultat.")){
            console.log("pas michelin")
        }
        else{
            response = await JSON.stringify(response)
            if(response.includes("poi")){
                console.log("michelin")
                counter += 1
            }
            else{
                console.log("BUG")
            }
        }
    }
    console.log(counter)
    return hotels
}

async function batchRequestHostels(uris) {
    let res = []
    let hotels = []
    for (let i = 0; i < uris.length; i++) {
        const options = {
            uri: uris[i],
            transform: function (body) {
                return cheerio.load(body);
            }
        }
        res.push(rp(options))
        sleep(20)
    }
    for (let i = 0; i < uris.length; i++) {
        $ = await res[i]
        let image = $(".hotelHeader-img").attr('data-src')
        var name = deleteSpaces($(".mainTitle2")["0"].children[0].data.split("\n")[1])
        name = he.decode(name)
        name = name.split(" – ")[0]
        name = name.split(" - ")[0]
        let url = uris[i]
        url = url.split("/")
        sleep(20)
        let entityId = await getEntityId(url[url.length - 1])
        if (entityId != null) {
            hotels.push({ name: name, uri: uris[i], entityId: entityId, image: "https:"+image})
        }
    }
    return hotels
}

async function getEntityId(hostel) {
    const options = {
        uri: 'https://www.relaischateaux.com/us/etablissement/rooms/0/' + hostel,
        transform: function (body) {
            return cheerio.load(body);
        }
    }
    try {
        let $ = await rp(options)
        let entityId = $("[data-id-entity]").attr("data-id-entity")
        entityId = parseInt(entityId)
        if (isNaN(entityId)) {
            return null
        }
        else {
            return entityId
        }
    } catch{
        return null
    }
}


function deleteSpaces(text) {
    while (text[0] == " ") {
        text = text.substr(1)
    }
    return text
}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}