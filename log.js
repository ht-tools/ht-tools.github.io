// To retrieve the log:
const log = JSON.parse(localStorage.getItem("htLog"));
if (!(log === null)) {
  createTable(log);
}

function createTable(data) {
  const table = document.createElement('table');
  const tableHead = document.createElement('thead');
  const tableBody = document.createElement('tbody');

  // Append the table head and body to table
  table.appendChild(tableHead);
  table.appendChild(tableBody);

  table.setAttribute('class', 'recommendedTable');

  // Creating table head
  let row = tableHead.insertRow();
  Object.keys(data[0]).forEach(key => {
    let th = document.createElement('th');
    th.textContent = key.toUpperCase();
    row.appendChild(th);
  });

  // Creating table body
  //data.forEach(item => {
  data.slice().reverse().forEach(item => {  
    let row = tableBody.insertRow();
    Object.values(item).forEach(value => {
      let cell = row.insertCell();
      cell.textContent = value;
    });
  });

  // Append the table to the HTML document
  document.getElementById('jsonTable').appendChild(table);
}


// Function to clear the log
function eraseLog() {
  if (confirm("Are you sure you want to erase the Log? This action cannot be undone.")) {
    // User pressed OK
    localStorage.removeItem("htLog");
    document.getElementById('jsonTable').innerHTML = ""; // Clear the table in the HTML
    logActivity('Erased Log');
    location.reload(); // Reload the page to reflect changes
  } 
}