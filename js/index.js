
document.addEventListener("DOMContentLoaded", function() {

//api key
const APIKEY = "AIzaSyBh8dlHW3oIhYshT0qT3ePRcN2eb6wzgxc";

//adding an event listener to the search button

document.getElementById('searchButton').addEventListener('click', () => {
  const searchInput = document.getElementById('searchInput').value;
  if (searchInput) {
    searchBooks(searchInput);
  }
});

// fetching data from the public API
function searchBooks(query) {
 const maxResults = 10;
 
 const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&key=${APIKEY}`;

 fetch (apiUrl)
 .then((response) => response.json())
 .then((data) => {
  displayResults(data.items);
 })
 .catch((err) => {
  console.error('Error fetching results', err);
 });
}

//Adding event listener to the search results container
 document.getElementById('results').addEventListener('click', function(e) {
  if (e.target.classList.contains("book")) {
    // Get the author and description from the clicked book element
    const author = e.target.getAttribute("data-author");
    const description = e.target.getAttribute("data-description");

    // Update the author and description in the bookDetails div
    document.getElementById("author").textContent = author;
    document.getElementById("description").textContent = description;
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
      bookElement.setAttribute("data-author", authors); // Set the author as a data attribute
      bookElement.setAttribute("data-description", description); // Set the description as a data attribute
      bookElement.innerHTML = `
        <h2>${title}</h2>
        <p>Author(s): ${authors}</p>
        <img src="${thumbnail}" alt="${title} cover">
        <p>${description}</p>
      `;

      resultsDiv.appendChild(bookElement);
    });
  } else {
    resultsDiv.innerHTML = 'No results found.';
  }
}
})
