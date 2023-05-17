// This function retrieves all data about Weapons
async function getWeaponsData() {
    try {
        const response = await fetch("https://api.warframestat.us/weapons/");
        const json = await response.json();
        return json;
    } catch (err) {
        console.log(err);
    }
}

export { getWeaponsData };