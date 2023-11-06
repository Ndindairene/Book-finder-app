
document.addEventListener("DOMContentLoaded", function () {

  window.addEventListener('resize', function () {
    const header = document.getElementById('header');
    if (window.innerWidth < 768) {
      header.style.fontSize = '16px'; // Reduce font size for smaller screens
    } else {
      header.style.fontSize = '24px'; // Restore font size for larger screens
    }
  });

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

  function displayResults(books) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
  
    if (books) {
      for (let i = 0; i < books.length; i += 4) { // Display 4 books at a time
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('row');
        resultsDiv.appendChild(rowContainer);
  
        for (let j = i; j < i + 4&& j < books.length; j++) {
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
  
          infoDiv.appendChild(titleDiv);
          infoDiv.appendChild(authorsDiv);
          infoDiv.appendChild(publisherDiv);
  
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
  