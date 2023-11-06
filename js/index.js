
document.addEventListener("DOMContentLoaded", function () {

  //API key
const APIKEY = "AIzaSyBh8dlHW3oIhYshT0qT3ePRcN2eb6wzgxc";


  // Adding an event listener to the search button
  document.getElementById('searchButton').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput').value;
    if (searchInput) {
      searchBooks(searchInput);
    }
  });

  // Fetching data from the public API
  function searchBooks(query) {
    const maxResults = 8;

    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&key=${APIKEY}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        displayResults(data.items);
      })
      .catch((err) => {
        console.error('Error fetching results', err);
      });
  }

  // Adding event listener to the search results container
  document.getElementById('results').addEventListener('click', function (e) {
    if (e.target.classList.contains('description-button')) {
      const description = e.target.nextElementSibling;
      description.style.display = description.style.display === 'none' ? 'block' : 'none';
    }
  });

//   function displayResults(books) {
//     const resultsDiv = document.getElementById('results');
//     resultsDiv.innerHTML = '';
  
//     if (books) {
//       for (let i = 0; i < books.length; i += 4) { // Display 4 books at a time
//         const rowContainer = document.createElement('div');
//         rowContainer.classList.add('row');
//         resultsDiv.appendChild(rowContainer);
  
//         for (let j = i; j < i + 4&& j < books.length; j++) {
//           const book = books[j];
//           const bookInfo = book.volumeInfo;
//           const title = bookInfo.title;
//           const authors = bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown';
//           const publisher = bookInfo.publisher || 'Publisher not available';
//           const thumbnail = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : 'no-image.png';
  
//           const bookElement = document.createElement('div');
//           bookElement.classList.add('book');
  
//           const imageDiv = document.createElement('div');
//           imageDiv.classList.add('book-image');
//           imageDiv.innerHTML = `<img src="${thumbnail}" alt="${title} cover">`;
  
//           const infoDiv = document.createElement('div');
//           infoDiv.classList.add('info');
  
//           const titleDiv = document.createElement('div');
//           titleDiv.classList.add('book-title');
//           titleDiv.textContent = title;
  
//           const authorsDiv = document.createElement('div');
//           authorsDiv.classList.add('book-authors');
//           authorsDiv.textContent = `Author(s): ${authors}`;
  
//           const publisherDiv = document.createElement('div');
//           publisherDiv.classList.add('book-publisher');
//           publisherDiv.textContent = `Publisher: ${publisher}`;

//           const likeButton = document.createElement('button');
//           likeButton.classList.add('like-button');
//           likeButton.textContent = 'Like';

//           likeButton.addEventListener('click', function () {
//             const heartIcon = `
//   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
//     <path d="M8 14s-2-1.5-3-3C4 10.5 2 9 2 7.5 2 5.5 3.5 4 5.5 4c1.3 0 2.543.693 3.5 1.685C9.957 4.693 11.2 4 12.5 4 14.5 4 16 5.5 16 7.5c0 1.5-2 3-3 3-1-1.5-3-3-3-3z"/>
//   </svg>
// `;
//           })

//           infoDiv.appendChild(likeButton);
//           infoDiv.appendChild(titleDiv);
//           infoDiv.appendChild(authorsDiv);
//           infoDiv.appendChild(publisherDiv);
  
//           bookElement.appendChild(imageDiv);
//           bookElement.appendChild(infoDiv);
  
//           rowContainer.appendChild(bookElement);
//         }
//       }
//     } else {
//       resultsDiv.innerHTML = 'No results found.';
//     }
//   }
  // Define the SVG heart icon
const heartIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
  <path d="M8 14s-2-1.5-3-3C4 10.5 2 9 2 7.5 2 5.5 3.5 4 5.5 4c1.3 0 2.543.693 3.5 1.685C9.957 4.693 11.2 4 12.5 4 14.5 4 16 5.5 16 7.5c0 1.5-2 3-3 3-1-1.5-3-3-3-3z"/>
</svg>
`;

function displayResults(books) {
const resultsDiv = document.getElementById('results');
resultsDiv.innerHTML = '';

if (books) {
  for (let i = 0; i < books.length; i += 4) {
    const rowContainer = document.createElement('div');
    rowContainer.classList.add('row');
    resultsDiv.appendChild(rowContainer);

    for (let j = i; j < i + 4 && j < books.length; j++) {
      const book = books[j];
      const bookInfo = book.volumeInfo;
      const title = bookInfo.title;
      const authors = bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown';
      const publisher = bookInfo.publisher || 'Publisher not available';
      const thumbnail = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : 'no-image.png';

      const bookElement = document.createElement('div');
      bookElement.classList.add('book');

      const imageDiv = document.createElement('div');
      imageDiv.classList.add('book-image');
      imageDiv.innerHTML = `<img src="${thumbnail}" alt="${title} cover">`;

      const infoDiv = document.createElement('div');
      infoDiv.classList.add('info');

      const titleDiv = document.createElement('div');
      titleDiv.classList.add('book-title');
      titleDiv.textContent = title;

      const authorsDiv = document.createElement('div');
      authorsDiv.classList.add('book-authors');
      authorsDiv.textContent = `Author(s): ${authors}`;

      const publisherDiv = document.createElement('div');
      publisherDiv.classList.add('book-publisher');
      publisherDiv.textContent = `Publisher: ${publisher}`;

      // Create a like button
      const likeButton = document.createElement('button');
      likeButton.classList.add('like-button');
      likeButton.innerHTML = heartIcon; // Set the heart icon as content

      // Add an event listener for the like button
      likeButton.addEventListener('click', function () {
        if (bookElement.classList.contains('liked')) {
          // Book is already liked, remove liked class, and change the icon to default color
          bookElement.classList.remove('liked');
          likeButton.classList.remove('red-heart-icon');
        } else {
          // Book is not liked, add liked class, and change the icon color to red
          bookElement.classList.add('liked');
          likeButton.classList.add('red-heart-icon');
        }
      });

      // Append the like button, title, authors, and publisher to the infoDiv
      infoDiv.appendChild(titleDiv);
      infoDiv.appendChild(authorsDiv);
      infoDiv.appendChild(publisherDiv);
      infoDiv.appendChild(likeButton);


      bookElement.appendChild(imageDiv);
      bookElement.appendChild(infoDiv);

      rowContainer.appendChild(bookElement);
    }
  }
} else {
  resultsDiv.innerHTML = 'No results found.';
}
}


});
  