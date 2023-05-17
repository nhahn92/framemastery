// This function retrieves all data about Mods
async function getModsData() {
    try {
        const response = await fetch("https://api.warframestat.us/mods/");
        const json = await response.json();
        return json;
    } catch (err) {
        console.log(err);
    }
}

export { getModsData };