// Retrieves functions from various API-fetching/filtering modules
import { getAllItemsData } from "./api-retrieval/get-all-items.js";
import { getWarframesData } from "./api-retrieval/get-warframes.js";
import { getWeaponsData } from "./api-retrieval/get-weapons.js";
import { getVehiclesData } from "./api-retrieval/get-vehicles.js";
import { getCompanionsData } from "./api-retrieval/get-companions.js";
import { buttonCheck, updateCounters } from "./utility-functions.js";

// DOM Elements
const itemSelectionSortingContainer = document.querySelector("#item-selection-sorting-container");
const itemSelectionContentContainer = document.querySelector("#item-selection-content-container");
const itemSelectionHeader = document.querySelector("#item-selection-header");
const itemCounter = document.querySelector("#item-counter");
const masteryCounter = document.querySelector("#mastery-counter");
const hideCompletedButton = document.querySelector("#hide-completed-button");
const completedItem = document.getElementsByClassName("completed");
const excludeFoundersButton = document.querySelector("#exclude-founders-button");
const foundersItem = document.getElementsByClassName("founders");

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
let totalMasteryAllCounter = allItems.length;
let completeCounter = 0;
let categoryTotal = 0;
let defaultTheme = "Tenno";
masteryCounter.innerHTML = `${totalMasteryCompleteCounter} / ${totalMasteryAllCounter}`;

// Creates elements to populate the #item-selection-content-container depending on passed array
const createDisplay = array => {
    // Updates the counter to match the passed array
    categoryTotal = array.length;
    itemCounter.innerHTML = `(${completeCounter} / ${categoryTotal})`;

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
    
    // Adds click functionality to the items within #item-selection-content-container
    const selectableContent = document.getElementsByClassName("selectable-item");
    const selectableContentContainer = document.getElementsByClassName("selectable-item-container");
    for (let i = 0; i < selectableContent.length; i++) {
        selectableContent[i].addEventListener("click", () => {
            // Adds the "completed" class to clicked items if they don't already have it
            if (!selectableContentContainer[i].classList.contains("completed")) {
                selectableContentContainer[i].classList.add("completed");
                // Adds 1 to the Total Mastery count per click
                totalMasteryCompleteCounter++;
                // Adds 1 to the Complete Counter per click
                completeCounter++;
                // Changes the item's color to faded when completed
                selectableContent[i].style.color = "var(--tenno-faded-green)";
                // Checks if the "Hide Completed" button is active and hides new selections
                if (hideCompletedButton.innerHTML.indexOf("Show Completed") !== -1) {
                    for (let i = 0; i < completedItem.length; i++) {
                        completedItem[i].style.display = "none";
                    }
                }
            // Removes the "completed" class to clicked items if they have it
            } else {
                selectableContentContainer[i].classList.remove("completed");
                // Subtracts 1 from the Total Mastery count per click
                totalMasteryCompleteCounter--;
                // Subtracts 1 from the Complete Counter per click
                completeCounter--;
                // Changes the item's color to default when incompleted
                selectableContent[i].style.color = "var(--tenno-medium-green)";
            }
            updateCounters(masteryCounter, itemCounter, totalMasteryCompleteCounter, totalMasteryAllCounter, completeCounter, categoryTotal);
        })
    }

    // "Hide Completed" Button Functionality
    hideCompletedButton.addEventListener("click", () => {
        buttonCheck(hideCompletedButton, "Hide Completed", "Show Completed", "completed", selectableContentContainer);
        // Keeps completed Founders items hidden if "Exclude Founders" button is active
        if (excludeFoundersButton.innerHTML.indexOf("Include Founders") !== -1) {
            for (let i = 0; i < foundersItem.length; i++) {
                foundersItem[i].style.display = "none";
            }
        }
    })

    // "Exclude Founders" Button Functionality
    excludeFoundersButton.addEventListener("click", () => {
        buttonCheck(excludeFoundersButton, "Exclude Founders", "Include Founders", "founders", selectableContentContainer);
        if (excludeFoundersButton.innerHTML.indexOf("Include Founders") !== -1) {
            // Subtracts the three excluded Founders items from the Total Mastery count
            totalMasteryAllCounter -= 3;
            // If the visible category is Warframes, Secondary Weapons, or Melee Weapons, subtracts the excluded
            // founders item from the total Category count
            if (itemSelectionHeader.innerHTML.includes("Warframes", "Secondary Weapons", "Melee Weapons")) {
                categoryTotal -= 1;
            }
            // Removes the excluded Founders item from the completed Category count as long as it's above 0
            for (let i = 0; i < foundersItem.length; i++) {
                if (foundersItem[i].classList.contains("completed") && completeCounter > 0) {
                    completeCounter -= 1;
                }
            }
        } else {
            // Adds the three included Founders items to the Total Mastery count
            totalMasteryAllCounter += 3;
            // If the visible category is Warframes, Secondary Weapons, or Melee Weapons, adds the included
            // founders item to the total Category count
            if (itemSelectionHeader.innerHTML.includes("Warframes", "Secondary Weapons", "Melee Weapons")) {
                categoryTotal += 1;
            }
            if (hideCompletedButton.innerHTML.indexOf("Show Completed") !== -1) {
                for (let i = 0; i < foundersItem.length; i++) {
                    foundersItem[i].style.display = "none";
                }
            }
            // Adds the included Founders item to the completed Category count
            for (let i = 0; i < foundersItem.length; i++) {
                if (foundersItem[i].classList.contains("completed")) {
                    completeCounter += 1;
                }
            }
        }
        updateCounters(masteryCounter, itemCounter, totalMasteryCompleteCounter, totalMasteryAllCounter, completeCounter, categoryTotal);
    })
};

// Populates the #item-selection-content-container on page load with all Warframes
createDisplay(allWarframes);