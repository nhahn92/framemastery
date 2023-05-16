// Retrieves all data about Warframes (items)
// Don't start with index 0; it's Amesha
// Ash is 1, Ash Prime is 2
async function getWarframesData() {
    try {
        const result = await fetch("https://api.warframestat.us/warframes");
        const json = await result.json();
        return json;
    } catch (err) {
        console.log(err);
    }
}

export { getWarframesData };