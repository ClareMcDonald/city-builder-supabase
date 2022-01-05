import { checkAuth, logout, fetchCity, createDefaultCity, updateWaterfront, updateSkyline, updateCastle } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const cityNameEl = document.querySelector('#city-name');
const waterfrontImgEl = document.getElementById('waterfront-img');
const skylineImgEl = document.querySelector('#skyline-img');
const castleImgEl = document.querySelector('#castle-img');
const slogansEl = document.querySelector('#slogan-list');
const sloganForm = document.querySelector('#slogan-form');
const nameForm = document.querySelector('#name-form');
const waterfrontDropdown = document.querySelector('#waterfront');
const skylineDropdown = document.querySelector('#skyline');
const castleDropdown = document.querySelector('#castle');

/*console.log(
    cityNameEl,
    waterfrontImgEl,
    skylineImgEl,
    castleImgEl,
    slogansEl,
    sloganForm,
    nameForm,
    waterfrontDropdown,
    skylineDropdown,
    castleDropdown
); */

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {
    const city = await fetchCity();

    if (!city) {
        const newCity = await createDefaultCity();
        displayCity(newCity);
    } else {
        displayCity(city);
    }
});

waterfrontDropdown.addEventListener('change', async() => {
    const selectedWaterfront = waterfrontDropdown.value;

    const updatedWaterfront = await updateWaterfront(selectedWaterfront);
    displayCity(updatedWaterfront);
});

skylineDropdown.addEventListener('change', async() => {
    const selectedSkyline = skylineDropdown.value;

    const updatedSkyline = await updateSkyline(selectedSkyline);
    displayCity(updatedSkyline);
});

castleDropdown.addEventListener('change', async() => {
    const selectedCastle = castleDropdown.value;

    const updatedCastle = await updateCastle(selectedCastle);
    displayCity(updatedCastle);
});

function displayCity(city) {
    console.log(city);
    waterfrontImgEl.src = `../assets/waterfront-${city.waterfront_id}.png`;
    skylineImgEl.src = `../assets/skyline-${city.skyline_id}.png`;
    castleImgEl.src = `../assets/castle-${city.castle_id}.png`;
}