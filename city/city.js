import { checkAuth, logout, fetchCity, createDefaultCity } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const cityNameEl = document.querySelector('#city-name');
const waterfrontImgEl = document.querySelector('#waterfront-img');
const skylineImgEl = document.querySelector('#skyline-img');
const castleImgEl = document.querySelector('#castle-img');


logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {
    const city = await fetchCity();

    if (!city) await createDefaultCity();

    displayCity();
});




async function displayCity(city) {

}