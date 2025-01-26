const jokeWrapper = document.querySelector(".joke-wrapper");
const refreshButton = document.querySelector(".refresh-button");
const loaderText = document.querySelector(".loader");

function showLoader() {
  loaderText.classList.add("show");
  jokeWrapper.classList.add("hide");
}

function removeLoader() {
  loaderText.classList.remove("show");
  jokeWrapper.classList.remove("hide");
}

function fetchRandomJoke() {
  showLoader();
  fetch('https://api.freeapi.app/api/v1/public/randomjokes?limit=10&query=science&inc=categories%252Cid%252Ccontent&page=1')
    .then((response) => response.json())
    .then((result) => {
      if (result.success && result.data.data.length > 0) {
        removeLoader();
        const randomIndex = Math.floor(Math.random() * result.data.data.length); 
        displayJoke(result.data.data[randomIndex]); 
        displayJoke(result.data.data[randomIndex])
      } else {
        throw new Error('No jokes found');
      }
    })
    .catch((e) => {
      console.error(e);
      removeLoader();
      jokeWrapper.innerHTML = `<p>Error fetching joke. Please try again.</p>`;
    });
}

function displayJoke(getJoke) {
  console.log(getJoke);
  jokeWrapper.innerHTML = `
    <div class="joke-item">
      <p>${getJoke.content}</p>
      <p>The id is:- ${getJoke.id}</p>
    </div>
  `;
}

fetchRandomJoke();

refreshButton.addEventListener("click", () => {
  fetchRandomJoke();
});