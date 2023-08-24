const apiKey = "CuDiCh3GB1AagMLedkRJ8qRV9EeNKBcBroHDXmpN2vdvTYcLIXjqrb5I";
const loadImagesBtn = document.getElementById("loadImagesBtn");
const loadSecondaryImagesBtn = document.getElementById("loadSecondaryImagesBtn");
const card = document.querySelectorAll(".card");

const headers = {
  Authorization: apiKey,
};

loadImagesBtn.addEventListener("click", () => {
  const apiUrl = "https://api.pexels.com/v1/search?query=people";

  fetch(apiUrl, { headers })
    .then((response) => response.json())
    .then((data) => {
      const photos = data.photos;
      const cardElements = document.querySelectorAll(".card");

      photos.forEach((photo, index) => {
        if (index < cardElements.length) {
          const card = cardElements[index];
          const imageElement = card.querySelector(".card-img-top");
          const titleElement = card.querySelector(".card-title");
          const textElement = card.querySelector(".card-text");

          imageElement.src = photo.src.medium;
          titleElement.textContent = photo.alt;
          textElement.textContent = `Photographer: ${photo.photographer}`;
        }
      });
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
});
