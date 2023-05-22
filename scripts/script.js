// Retrieves data from various API-fetching/filtering modules
import { getWarframesData } from "./api-retrieval/get-warframes.js";
import { getModsData } from "./api-retrieval/get-mods.js";
import { getWeaponsData } from "./api-retrieval/get-weapons.js";
import { getVehiclesData } from "./api-retrieval/get-vehicles.js";
import { getCompanionsData } from "./api-retrieval/get-companions.js";

// Empty arrays to be populated with specific values
let warframesNames = [];
let warframesPrimeNames = [];
let archwingsNames = [];
let necramechsNames = [];

// Note to self: May not need empty arrays at all and can use the "getValues" function to populate HTML
// Utility function to populate empty arrays from retrieved API data through passed parameters
// "Type" should be either "regular," "prime," "archwing," or "necramech"
// "Array" should choose one of the empty arrays above
// "ObjectProperty" should correspond with a property like "name" or "type" from the API json
// "Category" should be something like "warframes," "weapons," "mods," et cetera
async function getValues(type, array, objectProperty, category) {
    let data;
    if (category === "warframes") {
        data = await getWarframesData(type);
    }
    data.forEach(element => {
        array.push(element[objectProperty]);
    })
}

//getValues("regular", warframesNames, "name", "warframes");
//getValues("prime", warframesPrimeNames, "name", "warframes");
//getModsData();
//getWeaponsData();

console.log(warframesNames);
console.log(warframesPrimeNames);
console.log(archwingsNames);
console.log(necramechsNames);