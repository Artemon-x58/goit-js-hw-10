import axios from "axios";
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import {fetchBreeds, fetchCatByBreed } from "./cat-api";

axios.defaults.headers.common["x-api-key"] = "live_zLujiNOCDiWSjdGB1YUgqrKxYa2muYh5iurPJARB5ldgMIYXuZnxa876lyRjWeLx";

const selectEl = document.querySelector('.breed-select');
const contEl = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

const wrapEl = document.createElement("div");
const imgKat = document.createElement("img");
const title = document.createElement("h1")
const descKat = document.createElement("p");
const temp = document.createElement("p");
const textChoose = document.createElement("p");
const content = document.createElement("div");

content.classList.add("content")
content.appendChild(textChoose)
document.body.insertAdjacentElement("afterbegin", content)
selectEl.classList.add("is-hidden");


fetchBreeds()
.then(fetchCatByBreed);

selectEl.addEventListener('change', (e) => {
  loader.classList.remove("is-hidden");
  console.log(textChoose)
  textChoose.classList.add("is-hidden");
 
    
    const breedId = e.srcElement.value;
    axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`).then(response => {
      errorEl.classList.add("is-hidden");
        
    const path = response.data[0].breeds[0];
        
        title.textContent = path.name;
        descKat.innerHTML = `<b>Description:</b> ${path.description}`;
        temp.innerHTML = `<b>Temperament:</b> ${path.temperament}`;
        imgKat.src = response.data[0].url;
        contEl.innerHTML = '';
        wrapEl.append(title, descKat, temp)
        wrapEl.classList.add("wrap");
        contEl.append(imgKat, wrapEl);
        
        loader.classList.toggle("is-hidden");
        
    }).catch(err => {
      loader.classList.add("is-hidden");
      Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!")
    });
});

function makeMusic () {
  const audio = document.querySelector("#music");
  audio.play();
  document.body.removeEventListener("click", makeMusic)
}

document.body.addEventListener("click", makeMusic)