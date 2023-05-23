// Imports missing Plexus object
import { plexus } from "./get-vehicles.js";

// This function retrieves all data about All Items:
// Warframes, Primary Weapons, Secondary Weapons, Melee Weapons,
// Companions, Vehicles, Zaws, Kitguns, and Amps
async function getAllItemsData() {
    try {
        const response = await fetch("https://api.warframestat.us/items/");
        const json = await response.json();

        let allItemsArray = json.filter(element =>
            // Warframes, Archwings, and Necramechs
            ["Suits", "SpaceSuits", "MechSuits"].includes(element.productCategory) ||
            // Primary Weapons, Companion Weapons, Secondary Weapons, Archguns, and Archmelee
            ["Primary", "Secondary", "Arch-Gun", "Arch-Melee"].includes(element.category) ||
            // Melee Weapons
            element.category === "Melee" && element.type !== "Zaw Component" ||
            // Zaws
            element.type === "Zaw Component" && element.uniqueName.includes("Tip") && !element.uniqueName.includes("PvPVariant") ||
            // Kitguns
            element.type === "Kitgun Component" && element.uniqueName.includes("Barrel") || element.uniqueName.includes("Barrels") ||
            // Amps
            element.type === "Amp" && element.uniqueName.includes("Barrel") || element.name === "Sirocco" ||
            // Companions
            ["Pets", "Sentinel"].includes(element.type) || element.category === "Pets" && element.name.includes("Venari") ||
            // K-Drives
            element.type === "K-Drive Component" && element.uniqueName.includes("Deck")
        );

        // Splices missing Plexus object with the allItemsArray collection alphabetically
        allItemsArray.splice(458, 0, plexus);

        return allItemsArray;
        
    } catch (err) {
        console.log(err);
    }
}

export { getAllItemsData };