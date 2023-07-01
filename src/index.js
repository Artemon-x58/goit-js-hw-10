import axios from "axios";
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchCatByBreed } from "./cat-api";

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
content.append(textChoose)
document.body.insertAdjacentElement("afterbegin", content)


selectEl.classList.add("is-hidden");
imgKat.width = '600';
imgKat.height = '600';
imgKat.style.borderRadius = "10px"


fetchBreeds()
.then(breeds => {
  
  textChoose.classList.add("choose");
textChoose.textContent = "Please choose a cat"
// document.body.appendChild(textChoose);

  
  breeds.forEach(breed => {
    const option = document.createElement("option");
    option.value = breed.id ;
    option.textContent = breed.name;
    
    selectEl.appendChild(option);
  });
  selectEl.classList.remove("is-hidden");
  loader.classList.toggle("is-hidden");
  
  
});

selectEl.addEventListener('change', (e) => {
  loader.classList.toggle("is-hidden");
  contEl.style.display = "none";
  textChoose.classList.add("is-hidden");
    
    const breedId = e.srcElement.value;
    // console.log(breedId)
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
        wrapEl.style.marginLeft = "15px"
        

        // console.log(response.data[0]);
        loader.classList.toggle("is-hidden");
        contEl.style.display = "flex";
        contEl.style.marginTop = "15px";
        
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