// This function retrieves all data about Warframes, Archwings, and Necramechs
// Passing one of the following parameters will return a specific collection:
// "regular," "prime"
async function getWarframesData(type) {
    try {
        const response = await fetch("https://api.warframestat.us/warframes/");
        const json = await response.json();

        // New collections filled with filtered objects
        let warframesArray = json.filter(element => element.productCategory === "Suits" && element.isPrime === false);
        let warframesPrimeArray = json.filter(element => element.productCategory === "Suits" && element.isPrime === true);

        // Returns a collection based on passed parameter
        if (type === "regular") {
            return warframesArray;
        } else if (type === "prime") {
            return warframesPrimeArray;
        }

    } catch (err) {
        console.log(err);
    }
}

export { getWarframesData };