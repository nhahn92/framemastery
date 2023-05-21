// This function retrieves all data about Vehicles
// Passing one of the following parameters will return a specific collection:
// "archwing," "necramech," "kdrive"
async function getVehiclesData(type) {
    try {
        const response = await fetch("https://api.warframestat.us/items/");
        const json = await response.json();

        // New collections filled with filtered objects
        let archwingsArray = json.filter(element => element.productCategory === "SpaceSuits");
        let necramechsArray = json.filter(element => element.productCategory === "MechSuits");
        let kdrivesArray = json.filter(element => element.type === "K-Drive Component" && element.uniqueName.includes("Deck"));

        // Returns a collection based on passed parameter
        if (type === "archwing") {
            return archwingsArray;
        } else if (type === "necramech") {
            return necramechsArray;
        } else if (type === "kdrive") {
            return kdrivesArray;
        }
        
    } catch (err) {
        console.log(err);
    }
}

export { getVehiclesData };