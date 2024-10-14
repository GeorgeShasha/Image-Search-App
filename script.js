const accessKey = "5I1gQiHk_hB1z9wZSp5j6YJAEiNA9w_MVUVCUyWdrCg";

const searchForm = document.getElementById("search-form");
const searchInputField = document.getElementById("search-input");
const resultsContainer = document.getElementById("search-results");
const showMoreButton = document.getElementById("show-more");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = searchInputField.value;

  const apiUrl = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  try {
    let response = await fetch(apiUrl);
    let data = await response.json();

    if (page === 1) {
      resultsContainer.innerHTML = "";
    }

    const results = data.results;
    results.map((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("image-results");
      const image = document.createElement("img");
      image.src = result.urls.regular;
      image.alt = result.alt_description;
      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = result.alt_description;

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      resultsContainer.appendChild(imageWrapper);
    });

    page++;

    if (page > 1) {
      showMoreButton.style.display = "block";
    }

    console.log(results);
  } catch (error) {
    console.log(error);
  }
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(inputData);
  searchImages();
  page = 1;
});

showMoreButton.addEventListener("click", () => {
  searchImages();
});
