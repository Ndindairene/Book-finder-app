
document.addEventListener("DOMContentLoaded", function () {
  // Replace with your API key
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

  // A function to update the author and description in the bookDetails div
  function displayResults(books) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (books) {
      books.forEach((book) => {
        const bookInfo = book.volumeInfo;
        const title = bookInfo.title;
        const authors = bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown';
        const description = bookInfo.description || 'No description available';
        const thumbnail = bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : 'no-image.png';

        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.innerHTML = `
          <h2>${title}</h2>
          <p>Author(s): ${authors}</p>
          <img src="${thumbnail}" alt="${title} cover">
          <button class="description-button">Description</button>
          <p class="book-description" style="display: none;">${description}</p>
        `;

        resultsDiv.appendChild(bookElement);
      });
    } else {
      resultsDiv.innerHTML = 'No results found.';
    }
  }
});




