// This function retrieves all data about Mods
// Passing one of the following parameters will return a specific collection:
// "all", "warframe," "primary," "secondary," "melee," "archwing," "archgun,"
// "archmelee," "necramech," "companion," "kdrive," "plexus," "parazon," "stance,"
// "set"
async function getModsData(type) {
    try {
        const response = await fetch("https://api.warframestat.us/mods/");
        const json = await response.json();
        
        // New collections filled with filtered objects
        let warframeModsArray = json.filter(element => element.type === "Warframe Mod");
        let primaryModsArray = json.filter(element => element.type === "Primary Mod" || element.type === "Shotgun Mod");
        let secondaryModsArray = json.filter(element => element.type === "Secondary Mod");
        let meleeModsArray = json.filter(element => element.type === "Melee Mod");
        let archwingModsArray = json.filter(element => element.type === "Archwing Mod");
        let archgunModsArray = json.filter(element => element.type === "Arch-Gun Mod");
        let archmeleeModsArray = json.filter(element => element.type === "Arch-Melee Mod");
        let necramechModsArray = json.filter(element => element.type === "Necramech Mod");
        let companionModsArray = json.filter(element => element.type === "Companion Mod");
        let kdriveModsArray = json.filter(element => element.type === "K-Drive Mod");
        let plexusModsArray = json.filter(element => element.type === "Plexus Mod");
        let parazonModsArray = json.filter(element => element.type === "Parazon Mod");
        let stanceModsArray = json.filter(element => element.type === "Stance Mod");
        let setModsArray = json.filter(element => element.type === "Mod Set Mod");

        // Returns a collection based on passed parameter
        if (type === "all") {
            return json;
        } else if (type === "warframe") {
            return warframeModsArray;
        } else if (type === "primary") {
            return primaryModsArray;
        } else if (type === "secondary") {
            return secondaryModsArray;
        } else if (type === "melee") {
            return meleeModsArray;
        } else if (type === "archwing") {
            return archwingModsArray;
        } else if (type === "archgun") {
            return archgunModsArray;
        } else if (type === "archmelee") {
            return archmeleeModsArray;
        } else if (type === "necramech") {
            return necramechModsArray;
        } else if (type === "companion") {
            return companionModsArray;
        } else if (type === "kdrive") {
            return kdriveModsArray;
        } else if (type === "plexus") {
            return plexusModsArray;
        } else if (type === "parazon") {
            return parazonModsArray;
        } else if (type === "stance") {
            return stanceModsArray;
        } else if (type === "set") {
            return setModsArray;
        } 

    } catch (err) {
        console.log(err);
    }
}

getModsData();
export { getModsData };