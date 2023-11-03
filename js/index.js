
document.addEventListener("DOMContentLoaded", function() {

//api key
const APIKEY = "AIzaSyBh8dlHW3oIhYshT0qT3ePRcN2eb6wzgxc";

//adding an event listener to the search button

document.getElementById("searchButton").addEventListener("click", () => {
  const searchInput = document.getElementById("searchInput").value;
  if (searchInput) {
    searchBooks(searchInput);
  }
});

// fetching data from the public API
function searchBooks(Query) {
 const maxResults = 10;
 
 const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}&key=${APIKEY}`;

 fetch (apiUrl)
 .then((response) => response.json())
 .then((data) => {
  displayResults(data.items);
 })
 .catch((err) => {
  console.error('Error fetching results', err);
 })
 
}
})