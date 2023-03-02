const API_KEY = "3c2e82db9e2d443885703504c72675ad";
const API_URL = `https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=${API_KEY}`;

const resultsContainer = document.querySelector(".results");
const loader = document.querySelector(".loader");

let html = "";

async function getRawgData() {
  try {
    const res = await fetch(API_URL);
    const jsonRes = await res.json();
    const results = jsonRes.results;

    for (let i = 0; i < results.length; i++) {
      html = `<div class="game">
                <h3 class="name">🕹 ${results[i].name}</h3>
                <p class="rating">⭐ ${results[i].rating}</p>
                <p class="tags">🏷 ${results[i].tags.length}</p>
              </div>`;

      resultsContainer.innerHTML += html;

      if (i === 7) {
        break;
      }
    }
  } catch (error) {
    html = `<div class="error">
              <h3 class="name">Oops! An error has occurd when fetching games.</h3>
              <p>Error: ${error}</p>
            </div>`;

    resultsContainer.innerHTML = html;
  } finally {
    loader.style.display = "none";
  }
}

getRawgData();
