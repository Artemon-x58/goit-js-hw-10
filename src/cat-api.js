import axios from "axios";
import Notiflix from 'notiflix';

const selectEl = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

const textChoose = document.createElement("p");
const content = document.createElement("div");

// content.classList.add("content")
// content.append(textChoose)
// document.body.insertAdjacentElement("afterbegin", content)

export function fetchBreeds () {
    return axios.get('https://api.thecatapi.com/v1/breeds').then(response => {
      errorEl.classList.add("is-hidden");
    return  response.data    
  }).catch(err => {
    loader.classList.add("is-hidden");
    Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!");
    })
  };
  


  
export function fetchCatByBreed(breeds) {
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

}