
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

function searchBooks(Query) {

}


})