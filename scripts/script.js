// Retrieves functions from various API-fetching/filtering modules
import { getAllItemsData } from "./api-retrieval/get-all-items.js";
import { getWarframesData } from "./api-retrieval/get-warframes.js";
import { getWeaponsData } from "./api-retrieval/get-weapons.js";
import { getVehiclesData } from "./api-retrieval/get-vehicles.js";
import { getCompanionsData } from "./api-retrieval/get-companions.js";

// DOM Elements
const itemSelectionSortingContainer = document.querySelector("#item-selection-sorting-container");
const itemSelectionContentContainer = document.querySelector("#item-selection-content-container");
const itemCounter = document.querySelector("#item-counter");
const masteryCounter = document.querySelector("#mastery-counter");

// Filtered API Data
const allItems = await getAllItemsData();
const allWarframes = await getWarframesData("all");
const regularWarframes = await getWarframesData("regular");
const primeWarframes = await getWarframesData("prime");
const primaryWeapons = await getWeaponsData("primary");
const secondaryWeapons = await getWeaponsData("secondary");
const meleeWeapons = await getWeaponsData("melee");
const archgunWeapons = await getWeaponsData("archgun");
const archmeleeWeapons = await getWeaponsData("archmelee");
const zawWeapons = await getWeaponsData("zaw");
const kitgunWeapons = await getWeaponsData("kitgun");
const sentinelWeapons = await getWeaponsData("sentinel");
const ampWeapons = await getWeaponsData("amp");
const allVehicles = await getVehiclesData("all");
const archwingVehicles = await getVehiclesData("archwing");
const necramechVehicles = await getVehiclesData("necramech");
const kdriveVehicles = await getVehiclesData("kdrive");
const plexusVehicles = await getVehiclesData("plexus");
const allCompanions = await getCompanionsData("all");
const beastCompanions = await getCompanionsData("beast");
const roboticCompanions = await getCompanionsData("robotic");

// Counters & Defaults
let totalMasteryCompleteCounter = 0;
let defaultTheme = "Tenno";
masteryCounter.innerHTML = `${totalMasteryCompleteCounter} / ${allItems.length}`;

// Creates elements to populate the #item-selection-content-container depending on passed array
const createDisplay = array => {
    const itemNames = array.map(item => {
        // Adds "non-prime" or "prime" classes depending on the item
        if (!["Excalibur Prime", "Lato Prime", "Skana Prime"].includes(item.name)) {
            if (!item.isPrime) {
                return `<div class="selectable-item-container non-prime">
                    <button class="selectable-item">${item.name}</button>
                </div>`;
            } else {
                return `<div class="selectable-item-container prime">
                    <button class="selectable-item">${item.name}</button>
                </div>`;
            }
        // Adds the "founders" and "prime" classes to Excalibur Prime, Lato Prime, and Skana Prime
        } else {
            return `<div class="selectable-item-container founders prime">
                <button class="selectable-item">${item.name}</button>
            </div>`;
        }
    })

    // Populates the #item-selection-content-container with item names from the passed array
    itemSelectionContentContainer.innerHTML = itemNames.join("");
    // Populates the #item-selection-content-container header with the number of items from the passed array
    itemCounter.innerHTML = `(${array.length})`;
    
    // Adds click functionality to the items within #item-selection-content-container
    const selectableContent = document.getElementsByClassName("selectable-item");
    for (let i = 0; i < selectableContent.length; i++) {
        selectableContent[i].addEventListener("click", () => {
            // Adds the "completed" class to clicked items if they don't already have it
            if (!selectableContent[i].classList.contains("completed")) {
                selectableContent[i].classList.add("completed");
                // Adds +1 to the Total Mastery count per click
                totalMasteryCompleteCounter++;
                // Changes the item's color to faded when completed
                selectableContent[i].style.color = "var(--tenno-faded-green)";
            // Removes the "completed" class to clicked items if they have it
            } else {
                selectableContent[i].classList.remove("completed");
                // Subtracts -1 from the Total Mastery count per click
                totalMasteryCompleteCounter--;
                // Changes the item's color to default when incompleted
                selectableContent[i].style.color = "var(--tenno-medium-green)";
            }
            // Changes the Total Mastery count after a click
            masteryCounter.innerHTML = `${totalMasteryCompleteCounter} / ${allItems.length}`;
        })
    }
};

// Populates the #item-selection-content-container on page load with all Warframes
createDisplay(allWarframes);