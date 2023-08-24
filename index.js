const imageCard = (image) => `<div class="col mb-4">
                          <div class="card mb-4 shadow-sm h-100">
                          <img src=${image.src.large} class="card-img-top" alt=${image.alt} style="height: 200px; object-fit: cover; cursor: pointer" onclick="goToDetails(${image.id})">
                            <div class="card-body d-flex flex-column">
                              <h5 class="card-title" onclick="goToDetails(${image.id})" style="cursor: pointer">${image.alt}</h5>
                                <p class="card-text mt-auto">
                                  <a href=${image.photographer_url} target="_blank">
                                      ${image.photographer}
                                  </a>
                                </p>
                                <div
                                  class="d-flex justify-content-between align-items-center"
                                >
                                  <div class="btn-group">
                                    <button
                                      type="button"
                                      class="btn btn-sm btn-outline-secondary"
                                      onclick="modalLogic(event)"
                                    >
                                      View
                                    </button>
                                    <button
                                      type="button"
                                      class="btn btn-sm btn-outline-secondary"
                                        onclick="hideMe(event)">
                                      Hide
                                    </button>
                                  </div>
                                  <small class="text-muted">${image.id}</small>
                              </div>
                            </div>
                          </div>
                        </div>`;

const hideMe = (event) => {
  event.currentTarget.closest(".col").remove();
};

let loadImages = async (query) => {
  const apiKey = "CuDiCh3GB1AagMLedkRJ8qRV9EeNKBcBroHDXmpN2vdvTYcLIXjqrb5I";

  const resp = await fetch("https://api.pexels.com/v1/search?query=" + query, {
    headers: {
      Authorization: apiKey,
    },
  });
  const body = await resp.json();

  const grid = document.getElementById("myGrid");

  grid.innerHTML = "";
  body.photos.forEach((photo) => {
    grid.innerHTML += imageCard(photo);
  });
};

let searchQuery;

const handleSearchQuery = (ev) => {
  searchQuery = ev.target.value.toLowerCase();
};

const searchImages = () => {
  loadImages(searchQuery);
};

window.onload = () => {
  const loadImagesBtn = document.querySelector(".jumbotron a.btn:first-of-type");
  loadImagesBtn.onclick = () => loadImages("nature");

  const loadSecondaryImagesBtn = document.querySelector(".jumbotron a.btn:nth-of-type(2)");
  loadSecondaryImagesBtn.onclick = () => loadImages("ocean");

  const searchInput = document.querySelector(".jumbotron .form-control");
  searchInput.oninput = (event) => handleSearchQuery(event);

  const searchBtn = document.querySelector(".jumbotron button.btn");
  searchBtn.onclick = () => searchImages();
};
