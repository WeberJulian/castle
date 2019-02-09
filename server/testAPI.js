var FormData = require('form-data');
var fetch = require("node-fetch");
var he = require('he');
var request = require('request');
const cheerio = require('cheerio');

// Build formData object.
let formData = new FormData();
formData.append('name', 'John');
formData.append('password', 'John123');

let url = "https://www.relaischateaux.com"

async function getResults() {
    var res = await fetch(url + "/fr/search/run",
        {
            body: formData,
            method: "post"
        })
    console.log(res)
    var result = await res.text();
    console.log(result)
}

var markers = {
    '14': {
        name: "La Bastide Saint-Antoine"
        , type: 'hotel'
        , LatLng: { lat: 43.6455, lng: 6.9257 }
    }
    , '15': {
        name: "Le Club de Cavalière &amp; Spa"
        , type: 'hotel'
        , LatLng: { lat: 43.1508, lng: 6.4343 }
    }
    , '17': {
        name: "Hameau Albert Ier"
        , type: 'hotel'
        , LatLng: { lat: 45.9247, lng: 6.8732 }
    }
    , '18': {
        name: "L’Arnsbourg Restaurant et Hôtel"
        , type: 'hotel'
        , LatLng: { lat: 48.9834, lng: 7.5667 }
    }
    , '30': {
        name: "Relais de la Poste"
        , type: 'hotel'
        , LatLng: { lat: 43.7758, lng: -1.2181 }
    }
    , '31': {
        name: "La Pyramide Patrick Henriroux"
        , type: 'hotel'
        , LatLng: { lat: 45.5165, lng: 4.8671 }
    }
    , '32': {
        name: "Château de Germigney"
        , type: 'hotel'
        , LatLng: { lat: 46.9988, lng: 5.8245 }
    }
    , '39': {
        name: "Maison Rostang"
        , type: 'restaurant'
        , LatLng: { lat: 48.8815, lng: 2.2986 }
    }
    , '41': {
        name: "Le Grand Véfour"
        , type: 'restaurant'
        , LatLng: { lat: 48.8661, lng: 2.338 }
    }
    , '42': {
        name: "Cazaudehore « La Forestière »"
        , type: 'hotel'
        , LatLng: { lat: 48.9139, lng: 2.0833 }
    }
    , '43': {
        name: "Auberge des Templiers"
        , type: 'hotel'
        , LatLng: { lat: 47.7935, lng: 2.7311 }
    }
    , '44': {
        name: "Le Clos"
        , type: 'hotel'
        , LatLng: { lat: 48.7333, lng: 0.9285 }
    }
    , '45': {
        name: "Royal Champagne Hotel &amp; Spa"
        , type: 'hotel'
        , LatLng: { lat: 49.091, lng: 3.9762 }
    }
    , '46': {
        name: "Domaine Les Crayères"
        , type: 'hotel'
        , LatLng: { lat: 49.2412, lng: 4.0517 }
    }
    , '47': {
        name: "Château de Courcelles"
        , type: 'hotel'
        , LatLng: { lat: 49.3382, lng: 3.5693 }
    }
    , '48': {
        name: "Château de Montreuil"
        , type: 'hotel'
        , LatLng: { lat: 50.4661, lng: 1.7613 }
    }
    , '49': {
        name: "La Ferme Saint-Siméon"
        , type: 'hotel'
        , LatLng: { lat: 49.4244, lng: 0.2216 }
    }
    , '50': {
        name: "Château d’Audrieu"
        , type: 'hotel'
        , LatLng: { lat: 49.204, lng: -0.5946 }
    }
    , '51': {
        name: "Les Maisons de Bricourt"
        , type: 'hotel'
        , LatLng: { lat: 48.641, lng: -1.8749 }
    }
    , '52': {
        name: "Manoir de Lan-Kerellec"
        , type: 'hotel'
        , LatLng: { lat: 48.777, lng: -3.5834 }
    }
    , '53': {
        name: "Hôtel de la Plage"
        , type: 'hotel'
        , LatLng: { lat: 48.1335, lng: -4.2681 }
    }
    , '54': {
        name: "Château de Locguénolé"
        , type: 'hotel'
        , LatLng: { lat: 47.7697, lng: -3.2821 }
    }
    , '55': {
        name: "Castel Clara Thalasso &amp; Spa"
        , type: 'hotel'
        , LatLng: { lat: 47.3045, lng: -3.2277 }
    }
    , '56': {
        name: "Le Castel Marie-Louise"
        , type: 'hotel'
        , LatLng: { lat: 47.2822, lng: -2.4082 }
    }
    , '57': {
        name: "Château de Noirieux"
        , type: 'hotel'
        , LatLng: { lat: 47.5761, lng: -0.4695 }
    }
    , '58': {
        name: "Les Hautes Roches"
        , type: 'hotel'
        , LatLng: { lat: 47.4102, lng: 0.7715 }
    }
    , '59': {
        name: "Château de Noizay"
        , type: 'hotel'
        , LatLng: { lat: 47.4224, lng: 0.892 }
    }
    , '60': {
        name: "Les Hauts de Loire"
        , type: 'hotel'
        , LatLng: { lat: 47.5041, lng: 1.1475 }
    }
    , '61': {
        name: "Grand Hôtel du Lion d’Or"
        , type: 'hotel'
        , LatLng: { lat: 47.3601, lng: 1.744 }
    }
    , '62': {
        name: "Restaurant Christopher Coutanceau"
        , type: 'restaurant'
        , LatLng: { lat: 46.1552, lng: -1.1598 }
    }
    , '63': {
        name: "Château de Curzay"
        , type: 'hotel'
        , LatLng: { lat: 46.4838, lng: 0.0487 }
    }
    , '64': {
        name: "La Chapelle Saint-Martin"
        , type: 'hotel'
        , LatLng: { lat: 45.8929, lng: 1.1776 }
    }
    , '65': {
        name: "Moulin de l’Abbaye"
        , type: 'hotel'
        , LatLng: { lat: 45.3628, lng: 0.6464 }
    }
    , '66': {
        name: "Le Vieux Logis"
        , type: 'hotel'
        , LatLng: { lat: 44.8755, lng: 0.8273 }
    }
    , '67': {
        name: "Château de la Treyne"
        , type: 'hotel'
        , LatLng: { lat: 44.8503, lng: 1.5272 }
    }
    , '68': {
        name: "Le Suquet, Sébastien Bras"
        , type: 'hotel'
        , LatLng: { lat: 44.6808, lng: 2.8933 }
    }
    , '69': {
        name: "Château de Mercuès"
        , type: 'hotel'
        , LatLng: { lat: 44.497, lng: 1.395 }
    }
    , '70': {
        name: "Michel Trama"
        , type: 'hotel'
        , LatLng: { lat: 44.1869, lng: 0.797 }
    }
    , '71': {
        name: "Château Cordeillan-Bages"
        , type: 'hotel'
        , LatLng: { lat: 45.1886, lng: -0.7518 }
    }
    , '72': {
        name: "Le Saint-James Bouliac"
        , type: 'hotel'
        , LatLng: { lat: 44.8139, lng: -0.5037 }
    }
    , '73': {
        name: "Les Prés d’Eugénie - Maison Guérard"
        , type: 'hotel'
        , LatLng: { lat: 43.6952, lng: -0.3788 }
    }
    , '74': {
        name: "Hôtel Parc Victoria"
        , type: 'hotel'
        , LatLng: { lat: 43.3962, lng: -1.6563 }
    }
    , '75': {
        name: "La Réserve"
        , type: 'hotel'
        , LatLng: { lat: 43.948, lng: 2.1299 }
    }
    , '76': {
        name: "Domaine d’Auriac"
        , type: 'hotel'
        , LatLng: { lat: 43.192, lng: 2.3369 }
    }
    , '77': {
        name: "Château de Riell"
        , type: 'hotel'
        , LatLng: { lat: 42.6484, lng: 2.3873 }
    }
    , '78': {
        name: "Château d’Adoménil"
        , type: 'hotel'
        , LatLng: { lat: 48.5638, lng: 6.4588 }
    }
    , '79': {
        name: "Hostellerie La Cheneaudière &amp; Spa"
        , type: 'hotel'
        , LatLng: { lat: 48.3896, lng: 7.1807 }
    }
    , '81': {
        name: "La Côte Saint Jacques &amp; Spa"
        , type: 'hotel'
        , LatLng: { lat: 47.9836, lng: 3.3902 }
    }
    , '83': {
        name: "Le Relais Bernard Loiseau – Spa Loiseau des Sens"
        , type: 'hotel'
        , LatLng: { lat: 47.2807, lng: 4.2312 }
    }
    , '84': {
        name: "Hostellerie de Levernois"
        , type: 'hotel'
        , LatLng: { lat: 46.9964, lng: 4.8836 }
    }
    , '85': {
        name: "Maison Lameloise"
        , type: 'hotel'
        , LatLng: { lat: 46.9084, lng: 4.753 }
    }
    , '86': {
        name: "Georges Blanc Parc &amp; Spa"
        , type: 'hotel'
        , LatLng: { lat: 46.2209, lng: 4.9895 }
    }
    , '87': {
        name: "Troisgros"
        , type: 'hotel'
        , LatLng: { lat: 46.01, lng: 3.9921 }
    }
    , '88': {
        name: "Château de Codignat"
        , type: 'hotel'
        , LatLng: { lat: 45.7819, lng: 3.414 }
    }
    , '89': {
        name: "Hôtel et Restaurant Régis et Jacques Marcon"
        , type: 'hotel'
        , LatLng: { lat: 45.1428, lng: 4.4362 }
    }
    , '90': {
        name: "Restaurant Pierre Orsi"
        , type: 'restaurant'
        , LatLng: { lat: 45.7693, lng: 4.8486 }
    }
    , '91': {
        name: "Villa Florentine"
        , type: 'hotel'
        , LatLng: { lat: 45.7627, lng: 4.8254 }
    }
    , '92': {
        name: "Maison Pic"
        , type: 'hotel'
        , LatLng: { lat: 44.9179, lng: 4.8854 }
    }
    , '93': {
        name: "Hôtel Restaurant Auberge du Père Bise – Jean Sulpice"
        , type: 'hotel'
        , LatLng: { lat: 45.8394, lng: 6.2106 }
    }
    , '95': {
        name: "Le Grand Cœur &amp; Spa"
        , type: 'hotel'
        , LatLng: { lat: 45.3976, lng: 6.5669 }
    }
    , '96': {
        name: "La Bonne Étape"
        , type: 'hotel'
        , LatLng: { lat: 44.0937, lng: 6.0104 }
    }
    , '97': {
        name: "Hôtel Crillon le Brave"
        , type: 'hotel'
        , LatLng: { lat: 44.1188, lng: 5.1444 }
    }
    , '99': {
        name: "Le Prieuré Baumanière"
        , type: 'hotel'
        , LatLng: { lat: 43.9634, lng: 4.7963 }
    }
    , '100': {
        name: "Baumanière Hôtel &amp; Spa"
        , type: 'hotel'
        , LatLng: { lat: 43.7435, lng: 4.787 }
    }
    , '101': {
        name: "Le Mas des Herbes Blanches"
        , type: 'hotel'
        , LatLng: { lat: 43.9384, lng: 5.243 }
    }
    , '102': {
        name: "Le Petit Nice-Passedat"
        , type: 'hotel'
        , LatLng: { lat: 43.2802, lng: 5.3521 }
    }
    , '103': {
        name: "Villa Gallici"
        , type: 'hotel'
        , LatLng: { lat: 43.5363, lng: 5.4486 }
    }
    , '104': {
        name: "Le Saint-Paul"
        , type: 'hotel'
        , LatLng: { lat: 43.6956, lng: 7.1227 }
    }
    , '106': {
        name: "Château de La Chèvre d’Or"
        , type: 'hotel'
        , LatLng: { lat: 43.7274, lng: 7.3618 }
    }
    , '107': {
        name: "La Villa Calvi"
        , type: 'hotel'
        , LatLng: { lat: 42.5562, lng: 8.7451 }
    }
    , '108': {
        name: "Grand Hôtel de Cala Rossa &amp; Spa"
        , type: 'hotel'
        , LatLng: { lat: 41.622, lng: 9.3359 }
    }
    , '201': {
        name: "Restaurant Gill"
        , type: 'restaurant'
        , LatLng: { lat: 49.4386, lng: 1.0904 }
    }
    , '204': {
        name: "L’Oasis"
        , type: 'restaurant'
        , LatLng: { lat: 43.5258, lng: 6.9425 }
    }
    , '217': {
        name: "Bas Rupts et Chalet Fleuri"
        , type: 'hotel'
        , LatLng: { lat: 48.0451, lng: 6.866 }
    }
    , '226': {
        name: "Hostellerie de Plaisance"
        , type: 'hotel'
        , LatLng: { lat: 44.8936, lng: -0.1565 }
    }
    , '228': {
        name: "Domaine de la Bretesche &amp; Spa"
        , type: 'hotel'
        , LatLng: { lat: 47.4807, lng: -2.1711 }
    }
    , '237': {
        name: "Le Phébus &amp; Spa - Villa des Anges"
        , type: 'hotel'
        , LatLng: { lat: 43.9289, lng: 5.2562 }
    }
    , '240': {
        name: "Domaine de Rochevilaine"
        , type: 'hotel'
        , LatLng: { lat: 47.5145, lng: -2.5014 }
    }
    , '265': {
        name: "Château de Mirambeau"
        , type: 'hotel'
        , LatLng: { lat: 45.3745, lng: -0.5655 }
    }
    , '267': {
        name: "Hôtel Daniel"
        , type: 'hotel'
        , LatLng: { lat: 48.8727, lng: 2.3073 }
    }
    , '268': {
        name: "L’Hôtel de Toiras &amp; Villa Clarisse"
        , type: 'hotel'
        , LatLng: { lat: 46.2046, lng: -1.3678 }
    }
    , '269': {
        name: "Le Mas de Pierre"
        , type: 'hotel'
        , LatLng: { lat: 43.6835, lng: 7.1243 }
    }
    , '270': {
        name: "Hostellerie La Briqueterie"
        , type: 'hotel'
        , LatLng: { lat: 49.0082, lng: 3.9078 }
    }
    , '284': {
        name: "Le Pré Catelan"
        , type: 'restaurant'
        , LatLng: { lat: 48.864, lng: 2.2508 }
    }
    , '291': {
        name: "Auberge de l’Île Barbe"
        , type: 'restaurant'
        , LatLng: { lat: 45.7971, lng: 4.8312 }
    }
    , '298': {
        name: "Abbaye de la Bussière"
        , type: 'hotel'
        , LatLng: { lat: 47.2159, lng: 4.7226 }
    }
    , '299': {
        name: "Hôtel &amp; Spa du Castellet"
        , type: 'hotel'
        , LatLng: { lat: 43.249, lng: 5.7811 }
    }
    , '300': {
        name: "Le Château de Beaulieu"
        , type: 'hotel'
        , LatLng: { lat: 50.5805, lng: 2.5078 }
    }
    , '301': {
        name: "Brittany &amp; Spa"
        , type: 'hotel'
        , LatLng: { lat: 48.7247, lng: -3.9728 }
    }
    , '302': {
        name: "Hôtel Impérial Garoupe"
        , type: 'hotel'
        , LatLng: { lat: 43.5549, lng: 7.1348 }
    }
    , '304': {
        name: "Flocons de Sel"
        , type: 'hotel'
        , LatLng: { lat: 45.8297, lng: 6.5967 }
    }
    , '323': {
        name: "Château de Rochegude"
        , type: 'hotel'
        , LatLng: { lat: 44.247, lng: 4.8272 }
    }
    , '324': {
        name: "Château de Berne"
        , type: 'hotel'
        , LatLng: { lat: 43.506, lng: 6.3583 }
    }
    , '325': {
        name: "La Bastide de Saint-Tropez"
        , type: 'hotel'
        , LatLng: { lat: 43.2599, lng: 6.6364 }
    }
    , '326': {
        name: "La Signoria &amp; Spa"
        , type: 'hotel'
        , LatLng: { lat: 42.5372, lng: 8.7843 }
    }
    , '327': {
        name: "Le Couvent des Minimes Hôtel &amp; Spa L&#039;Occitane"
        , type: 'hotel'
        , LatLng: { lat: 43.9384, lng: 5.7712 }
    }
    , '343': {
        name: "Restaurant Alexandre"
        , type: 'restaurant'
        , LatLng: { lat: 43.7681, lng: 4.4226 }
    }
    , '344': {
        name: "Coquillade Village"
        , type: 'hotel'
        , LatLng: { lat: 43.8802, lng: 5.3167 }
    }
    , '345': {
        name: "Cap d’Antibes Beach Hotel"
        , type: 'hotel'
        , LatLng: { lat: 43.5614, lng: 7.1183 }
    }
    , '346': {
        name: "Monte-Carlo Beach"
        , type: 'hotel'
        , LatLng: { lat: 43.7512, lng: 7.444 }
    }
    , '366': {
        name: "Pan Deï Palais"
        , type: 'hotel'
        , LatLng: { lat: 43.2708, lng: 6.641 }
    }
    , '377': {
        name: "La Bastide de Capelongue"
        , type: 'hotel'
        , LatLng: { lat: 43.8214, lng: 5.3177 }
    }
    , '386': {
        name: "Maison Decoret"
        , type: 'hotel'
        , LatLng: { lat: 46.1246, lng: 3.4192 }
    }
    , '395': {
        name: "Anne de Bretagne"
        , type: 'hotel'
        , LatLng: { lat: 47.1541, lng: -2.2144 }
    }
    , '406': {
        name: "La Bastide"
        , type: 'hotel'
        , LatLng: { lat: 43.9517, lng: -0.0444 }
    }
    , '407': {
        name: "Saint James Paris"
        , type: 'hotel'
        , LatLng: { lat: 48.871, lng: 2.2793 }
    }
    , '408': {
        name: "Restaurant Guy Lassausaie"
        , type: 'restaurant'
        , LatLng: { lat: 45.8727, lng: 4.7706 }
    }
    , '416': {
        name: "Au Cœur du Village Hôtel &amp; Spa"
        , type: 'hotel'
        , LatLng: { lat: 45.9045, lng: 6.4227 }
    }
    , '428': {
        name: "Jiva Hill Resort"
        , type: 'hotel'
        , LatLng: { lat: 46.2694, lng: 6.0195 }
    }
    , '430': {
        name: "Hôtel Le Chabichou Restaurants &amp; Spa"
        , type: 'hotel'
        , LatLng: { lat: 45.4162, lng: 6.629 }
    }
    , '431': {
        name: "Restaurant Mirazur"
        , type: 'restaurant'
        , LatLng: { lat: 43.7859, lng: 7.5281 }
    }
    , '445': {
        name: "Passage 53"
        , type: 'restaurant'
        , LatLng: { lat: 48.8713, lng: 2.3417 }
    }
    , '446': {
        name: "La Grenouillère"
        , type: 'hotel'
        , LatLng: { lat: 50.471, lng: 1.7547 }
    }
    , '458': {
        name: "Le Domaine de Verchant"
        , type: 'hotel'
        , LatLng: { lat: 43.6229, lng: 3.9229 }
    }
    , '466': {
        name: "Auberge du Jeu de Paume"
        , type: 'hotel'
        , LatLng: { lat: 49.194, lng: 2.4806 }
    }
    , '486': {
        name: "Hotel &amp; Restaurant Thierry Drapeau"
        , type: 'hotel'
        , LatLng: { lat: 46.8799, lng: -1.4058 }
    }
    , '499': {
        name: "La Maison d&#039;Uzès"
        , type: 'hotel'
        , LatLng: { lat: 44.0128, lng: 4.4211 }
    }
    , '505': {
        name: "Pierre Gagnaire"
        , type: 'restaurant'
        , LatLng: { lat: 48.8733, lng: 2.3003 }
    }
    , '506': {
        name: "Château des Avenières"
        , type: 'hotel'
        , LatLng: { lat: 46.0575, lng: 6.0991 }
    }
    , '507': {
        name: "Les Bergeries de Palombaggia"
        , type: 'hotel'
        , LatLng: { lat: 41.5661, lng: 9.3268 }
    }
    , '508': {
        name: "Lucas Carton"
        , type: 'restaurant'
        , LatLng: { lat: 48.8697, lng: 2.3233 }
    }
    , '517': {
        name: "La Maison des Bois – Marc Veyrat"
        , type: 'hotel'
        , LatLng: { lat: 45.8773, lng: 6.4045 }
    }
    , '518': {
        name: "Yoann Conte – Bord du Lac Hôtel Restaurant"
        , type: 'hotel'
        , LatLng: { lat: 45.8814, lng: 6.1775 }
    }
    , '529': {
        name: "Tiara Yaktsa"
        , type: 'hotel'
        , LatLng: { lat: 43.4856, lng: 6.9412 }
    }
    , '541': {
        name: "Le Taillevent"
        , type: 'restaurant'
        , LatLng: { lat: 48.8743, lng: 2.302 }
    }
    , '567': {
        name: "La Grande Maison de Bernard Magrez"
        , type: 'hotel'
        , LatLng: { lat: 44.8529, lng: -0.5892 }
    }
    , '568': {
        name: "Marquis Faubourg Saint-Honoré"
        , type: 'hotel'
        , LatLng: { lat: 48.8698, lng: 2.3208 }
    }
    , '569': {
        name: "Le Chambard"
        , type: 'hotel'
        , LatLng: { lat: 48.1386, lng: 7.2656 }
    }
    , '573': {
        name: "Assiette Champenoise"
        , type: 'hotel'
        , LatLng: { lat: 49.2478, lng: 4.0038 }
    }
    , '583': {
        name: "Hôtel du Bois Blanc"
        , type: 'hotel'
        , LatLng: { lat: 46.2338, lng: 5.0712 }
    }
    , '588': {
        name: "Villa René Lalique"
        , type: 'hotel'
        , LatLng: { lat: 48.9187, lng: 7.3651 }
    }
    , '593': {
        name: "La Villa Archange"
        , type: 'restaurant'
        , LatLng: { lat: 43.5722, lng: 7.015 }
    }
    , '596': {
        name: "Château de Bagnols"
        , type: 'hotel'
        , LatLng: { lat: 45.9168, lng: 4.6088 }
    }
    , '606': {
        name: "Maison Doucet"
        , type: 'hotel'
        , LatLng: { lat: 46.4334, lng: 4.2751 }
    }
    , '607': {
        name: "Hôtel-Spa La Bouitte – Restaurant René et Maxime Meilleur"
        , type: 'hotel'
        , LatLng: { lat: 45.3689, lng: 6.5133 }
    }
    , '609': {
        name: "Clarance Hôtel"
        , type: 'hotel'
        , LatLng: { lat: 50.6388, lng: 3.057 }
    }
    , '611': {
        name: "Hôtel Restaurant Clos des Sens - Laurent PETIT"
        , type: 'hotel'
        , LatLng: { lat: 45.9177, lng: 6.1446 }
    }
    , '621': {
        name: "Hôtel Les Barmes de l&#039;Ours"
        , type: 'hotel'
        , LatLng: { lat: 45.4478, lng: 6.9749 }
    }
    , '634': {
        name: "Auberge des Glazicks"
        , type: 'hotel'
        , LatLng: { lat: 48.1806, lng: -4.2346 }
    }
    , '653': {
        name: "Au Crocodile"
        , type: 'restaurant'
        , LatLng: { lat: 48.5837, lng: 7.7473 }
    }
    , '654': {
        name: "Château de Valmer"
        , type: 'hotel'
        , LatLng: { lat: 43.1918, lng: 6.5878 }
    }
    , '660': {
        name: "L&#039;Auberge Basque"
        , type: 'hotel'
        , LatLng: { lat: 43.3677, lng: -1.5845 }
    }
    , '664': {
        name: "Hôtel Splendide Royal Paris"
        , type: 'hotel'
        , LatLng: { lat: 48.871, lng: 2.3154 }
    }
    , '674': {
        name: "Château de Fonscolombe"
        , type: 'hotel'
        , LatLng: { lat: 43.6394, lng: 5.4684 }
    }
    , '679': {
        name: "Restaurant Serge Vieira"
        , type: 'hotel'
        , LatLng: { lat: 44.8441, lng: 3.002 }
    }
    , '686': {
        name: "Hôtel Restaurant En Marge"
        , type: 'hotel'
        , LatLng: { lat: 43.4906, lng: 1.4458 }
    }
    , '688': {
        name: "Restaurant Greuze"
        , type: 'restaurant'
        , LatLng: { lat: 46.5656, lng: 4.9079 }
    }
    , '689': {
        name: "Château Lafaurie-Peyraguey Hôtel &amp; Restaurant LALIQUE"
        , type: 'hotel'
        , LatLng: { lat: 44.5498, lng: -0.3373 }
    }
    , '690': {
        name: "Hotel Ile de la Lagune Thalasso &amp; Spa"
        , type: 'hotel'
        , LatLng: { lat: 42.6077, lng: 3.0353 }
    }
    , '696': {
        name: "Château de Drudas"
        , type: 'hotel'
        , LatLng: { lat: 43.7555, lng: 1.0986 }
    }
}

function extractHotel(liste){
    for (var k in liste){
        console.log(he.decode(liste[k].name))
    }
}

extractHotel(markers)
