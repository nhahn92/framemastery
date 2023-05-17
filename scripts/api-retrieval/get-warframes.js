// This function retrieves all data about Warframes, Archwings, and Necramechs
// Passing "regular," "prime," "archwing," or "necramech" as this function's parameter will return a specific array
async function getWarframesData(type) {
    try {
        const response = await fetch("https://api.warframestat.us/warframes/");
        const json = await response.json();

        // Four empty arrays to be filled with filtered objects
        let warframesArray = [];
        let warframesPrimeArray = [];
        let archwingsArray = [];
        let necramechsArray = [];

        json.forEach(element => {
            // Filters out Archwings and Necramechs
            if (element.productCategory === "Suits") {
                // Further filters out Prime Warframes to make a new array, "warframesArray"
                if (element.isPrime === false) {
                    warframesArray.push(element);
                // Further filters out non-Prime Warframes to make a new array, "warframesPrimeArray"
                } else if (element.isPrime === true) {
                    warframesPrimeArray.push(element);
                }
            // Filters out Warframes and Necramechs to make a new array, "archwingsArray"
            } else if (element.productCategory === "SpaceSuits") {
                archwingsArray.push(element);
            // Filters out Warframes and Archwings to make a new array, "necramechsArray"
            } else if (element.productCategory === "MechSuits") {
                necramechsArray.push(element);
            }
        });

        // Returns an array based on passed parameter
        if (type === "regular") {
            return warframesArray;
        } else if (type === "prime") {
            return warframesPrimeArray;
        } else if (type === "archwing") {
            return archwingsArray;
        } else if (type === "necramech") {
            return necramechsArray;
        }
    } catch (err) {
        console.log(err);
    }
}

export { getWarframesData };