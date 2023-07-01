import axios from "axios";
import Notiflix from 'notiflix';

export function fetchBreeds () {
    return axios.get('https://api.thecatapi.com/v1/breeds').then(response => {
    //   errorEl.classList.add("is-hidden");
    return  response.data    
  }).catch(err => {
    // loader.classList.add("is-hidden");
    Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!");
    })
  };

