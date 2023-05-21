// This function retrieves all data about Companions
// Passing one of the following parameters will return a specific collection:
// "beast," "robotic"
async function getCompanionsData(type) {
    try {
        const response = await fetch("https://api.warframestat.us/items/");
        const json = await response.json();

        // New collections filled with filtered objects
        let beastsArray = json.filter(element => element.type === "Pets" && !element.uniqueName.includes("Zanuka") || element.category === "Pets" && element.name.includes("Venari"));
        let roboticsArray = json.filter(element => element.type === "Sentinel" || element.type === "Pets" && element.uniqueName.includes("Zanuka"));

        // Returns a collection based on passed parameter
        if (type === "beast") {
            return beastsArray;
        } else if (type === "robotic") {
            return roboticsArray;
        }
        
    } catch (err) {
        console.log(err);
    }
}

export { getCompanionsData };