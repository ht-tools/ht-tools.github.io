let jsonData = {
    "employees": [
        { "Date/Time": "3/5/2025 5:00 PM", "Dichlor": "0", "Bleach": "0", "pH/TA Down (SB)": "0", "pH/TA Down (MA)": "0", "TA Up": "0", "pH Up": "0", "Calcium Chloride": "0", "CYA": "0", "FC": "0", "CC": "0", "pH": "0", "TA": "0", "CH": "0", "Filter": "Cleaned" },
        { "Date/Time": "3/5/2025 5:00 PM", "Dichlor": "0", "Bleach": "0", "pH/TA Down (SB)": "0", "pH/TA Down (MA)": "0", "TA Up": "0", "pH Up": "0", "Calcium Chloride": "0", "CYA": "0", "FC": "0", "CC": "0", "pH": "0", "TA": "0", "CH": "0", "Filter": "Replaced" }
    ]
}

createTable(jsonData.employees);

function createTable(data) {
    const table = document.createElement('table');
    const tableHead = document.createElement('thead');
    const tableBody = document.createElement('tbody');
  
    // Append the table head and body to table
    table.appendChild(tableHead);
    table.appendChild(tableBody);

    table.setAttribute('class', 'setupTables');
  
    // Creating table head
    let row = tableHead.insertRow();
    Object.keys(data[0]).forEach(key => {
      let th = document.createElement('th');
      th.textContent = key.toUpperCase();
      row.appendChild(th);
    });
  
    // Creating table body
    data.forEach(item => {
      let row = tableBody.insertRow();
      Object.values(item).forEach(value => {
        let cell = row.insertCell();
        cell.textContent = value;
      });
    });
  
    // Append the table to the HTML document
    document.getElementById('jsonTable').appendChild(table);
  }
/*
  var testObject = { 'one': 1, 'two': 2, 'three': 3 };

  // Put the object into storage
  localStorage.setItem('testObject', JSON.stringify(testObject));
  
  // Retrieve the object from storage
  var retrievedObject = localStorage.getItem('testObject');
  
  console.log('retrievedObject: ', JSON.parse(retrievedObject));
  */