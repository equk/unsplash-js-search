const API_CLIENTID = ''
const form = document.querySelector('form');
const input = document.querySelector('input');
const imageSection = document.querySelector('.images');
const API_URL = `https://api.unsplash.com/search/photos?page=1&per_page=20&client_id=${API_CLIENTID}`

form.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
  event.preventDefault();
  let searchTerm = input.value;

  searchStart();
  search(searchTerm)
    .then(displayImages)
}

function searchStart() {
  imageSection.innerHTML = '';
}

function search(searchTerm) {
  let url = `${API_URL}&query=${searchTerm}`;
  return fetch(url)
    .then(response => response.json())
    .then(result => {
        return result.results;
    });
}

function displayImages(images) {
  images.forEach(image => {
    let imageContainer = document.createElement('div');
    imageContainer.className = 'ImageResult'
    imageSection.appendChild(imageContainer);
    let imageElement = document.createElement('img');
    imageElement.src = image.urls.regular;
    imageContainer.appendChild(imageElement);
    let imageLink = document.createElement('a');
    imageLink.href = image.links.html;
    imageLink.target = '_blank';
    let imageUser = image.user.name;
    imageLink.append('View on Unsplash');
    imageLink.className = 'view_link';
    imageContainer.appendChild(imageLink);
    let creatorLink = document.createElement('a');
    creatorLink.href = image.user.links.html;
    creatorLink.target = '_blank';
    creatorLink.append(`Photo by: ${imageUser}`);
    creatorLink.className = 'user_link';
    imageContainer.appendChild(creatorLink);
  });
}