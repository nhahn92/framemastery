// This function retrieves all data about Weapons
// Passing one of the following parameters will return a specific collection:
// "primary," "secondary," "melee," "archgun," "archmelee," "zaw," "kitgun,"
// "sentinel," "amp"
async function getWeaponsData(type) {
    try {
        const response = await fetch("https://api.warframestat.us/items/");
        const json = await response.json();

        // New collections filled with filtered objects
        let primaryWeaponsArray = json.filter(element => element.category === "Primary" && element.type !== "Companion Weapon");
        let secondaryWeaponsArray = json.filter(element => element.category === "Secondary");
        let meleeWeaponsArray = json.filter(element => element.category === "Melee" && element.type !== "Zaw Component");
        let archgunWeaponsArray = json.filter(element => element.category === "Arch-Gun");
        let archmeleeWeaponsArray = json.filter(element => element.category === "Arch-Melee" && element.name !== "Corufell");
        let zawsArray = json.filter(element => element.type === "Zaw Component" && element.uniqueName.includes("Tip") && !element.uniqueName.includes("PvPVariant"));
        let kitgunsArray = json.filter(element => element.type === "Kitgun Component" && element.uniqueName.includes("Barrel") || element.uniqueName.includes("Barrels"));
        let sentinelWeaponsArray = json.filter(element => element.type === "Companion Weapon");
        let ampsArray = json.filter(element => element.type === "Amp" && element.uniqueName.includes("Barrel") || element.name === "Sirocco");

        // Returns a collection based on passed parameter
        if (type === "primary") {
            return primaryWeaponsArray;
        } else if (type === "secondary") {
            return secondaryWeaponsArray;
        } else if (type === "melee") {
            return meleeWeaponsArray;
        } else if (type === "archgun") {
            return archgunWeaponsArray;
        } else if (type === "archmelee") {
            return archmeleeWeaponsArray;
        } else if (type === "zaw") {
            return zawsArray;
        } else if (type === "kitgun") {
            return kitgunsArray;
        } else if (type === "sentinel") {
            return sentinelWeaponsArray;
        } else if (type === "amp") {
            return ampsArray;
        }

    } catch (err) {
        console.log(err);
    }
}

export { getWeaponsData };