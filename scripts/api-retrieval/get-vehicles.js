// This function retrieves all data about Vehicles
// Passing one of the following parameters will return a specific collection:
// "all", "archwing," "necramech," "kdrive," "plexus"

// Missing Plexus object
const plexus = {
    isPrime: false,
    masteryReq: 0,
    name: "Plexus"
}

async function getVehiclesData(type) {
    try {
        const response = await fetch("https://api.warframestat.us/items/");
        const json = await response.json();

        // New collections filled with filtered objects
        let allVehiclesArray = json.filter(element => ["SpaceSuits", "MechSuits"].includes(element.productCategory) || element.type === "K-Drive Component" && element.uniqueName.includes("Deck"));
        let archwingsArray = json.filter(element => element.productCategory === "SpaceSuits");
        let necramechsArray = json.filter(element => element.productCategory === "MechSuits");
        let kdrivesArray = json.filter(element => element.type === "K-Drive Component" && element.uniqueName.includes("Deck"));
        let plexusArray = [];

        // Adds missing Plexus object to applicable arrays
        allVehiclesArray.splice(9, 0, plexus);
        plexusArray.push(plexus);

        // Returns a collection based on passed parameter
        if (type === "all") {
            return allVehiclesArray;
        } else if (type === "archwing") {
            return archwingsArray;
        } else if (type === "necramech") {
            return necramechsArray;
        } else if (type === "kdrive") {
            return kdrivesArray;
        } else if (type === "plexus") {
            return plexusArray;
        }
        
    } catch (err) {
        console.log(err);
    }
}

export { getVehiclesData, plexus };