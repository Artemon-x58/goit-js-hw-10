import axios from "axios";
import Notiflix from 'notiflix';

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


function fetchBreeds () {
    return axios.get('https://api.thecatapi.com/v1/breeds').then(response => {
      errorEl.classList.add("is-hidden");
    return  response.data    
  }).catch(err => {
    loader.classList.add("is-hidden");
    Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!");
    })
  };
  
function fetchCatByBreed(breeds) {
    errorEl.classList.add("is-hidden");
    
    textChoose.classList.add("choose");
  textChoose.textContent = "Please choose a cat"
  
    breeds.forEach(breed => {
      const option = document.createElement("option");
      option.value = breed.id ;
      option.textContent = breed.name;
      selectEl.appendChild(option);
    });
    selectEl.classList.remove("is-hidden");
    loader.classList.toggle("is-hidden");

};

export {fetchBreeds, fetchCatByBreed, selectEl, contEl, loader, errorEl, wrapEl, imgKat, title, descKat, temp, textChoose, content}