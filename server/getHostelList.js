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
        }
        fs.writeFileSync('hostels.json', JSON.stringify(hotels, null, 2));
        return hotels
    }
}


async function batchRequestHostels(uris) {
    let res = []
    let hostels = []
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
        let citation = $(".citationMsg").text()
        let location = $("span [itemprop='addressLocality']").text()
        let description = deleteSpaces($(".richTextMargin").text().replace("\n", ""))
        var name = deleteSpaces($(".mainTitle2")["0"].children[0].data.split("\n")[1])
        name = he.decode(name)
        name = name.split(" – ")[0]
        name = name.split(" - ")[0]
        let url = uris[i]
        url = url.split("/")
        sleep(20)
        let entityId = await getEntityId(url[url.length - 1])
        if (entityId != null) {
            hostels.push({
                name: name,
                uri: uris[i],
                entityId: entityId,
                image: "https:" + image,
                citation: citation,
                location: location,
                description: description
            })
        }
    }
    hostels = await michelin(hostels)
    return hostels
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

async function michelin(hostels) {
    let res = []
    for (let i = 0; i < hostels.length; i++) {
        res.push(fetch("https://restaurant.michelin.fr/index.php?q=search/autocomplete/" + encodeURI(hostels[i].name.slice(0, -1))))
    }
    let trash = []
    for (let i = 0; i < hostels.length; i++) {
        var response = await res[i]
        response = (await response.json())
        if (response.toString().includes("Aucun résultat.")) {
            trash.push(i)
        }
        else {
            response = await JSON.stringify(response)
            if (response.includes("poi")) {
                response = await JSON.parse(response)
                let keys = Object.keys(response)
                let key = null
                for (let j = keys.length - 1; j != -1; j--) {
                    if (keys[j] != "poi-all" && keys[j].includes("poi")) {
                        key = keys[j]
                    }
                }
                if (key != null) {
                    response = response[key].split('"')[1]
                    hostels[i].michelinUri = "https://restaurant.michelin.fr" + response
                }
            }
        }
    }
    hostels = removeNonMichelin(hostels)
    hostels = await countMichelinStars(hostels)
    return hostels
}

async function countMichelinStars(hostels) {
    let res = []
    for (let i = 0; i < hostels.length; i++) {
        res.push(fetch(hostels[i].michelinUri))
    }
    let star = 0
    for (let i = 0; i < hostels.length; i++) {
        var response = await res[i]
        response = await response.text()
        star = 0
        if (response.includes("icon-cotation1etoile")) {
            star = 1
        }
        else if (response.includes("icon-cotation2etoiles")) {
            star = 2
        }
        else if (response.includes("icon-cotation3etoiles")) {
            star = 3
        }
        else if (response.includes("icon-cotation4etoiles")) {
            star = 4
        }
        else if (response.includes("icon-cotation5etoiles")) {
            star = 5
        }
        else if (response.includes("icon-cotation6etoiles")) {
            star = 6
        }
        hostels[i].michelinStars = star
    }
    return hostels
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

function removeNonMichelin(hostels) {
    let result = []
    for (let i = 0; i < hostels.length; i++) {
        if (hostels[i].michelinUri != undefined) {
            result.push(hostels[i])
        }
    }
    return result
}