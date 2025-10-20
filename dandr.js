function dandrLoad() {
    let checked = false;
    let strItem = "step";
    let strChecked = null;
    let inputElement = null;

    for (let i = 1; i < 20; i++) {
        checked = false;
        strItem = "step" + i;
        strChecked = localStorage.getItem(strItem);
        
        if (strChecked) {
            checked = (strChecked == "true");
        }
        else {
            localStorage.setItem(strItem, checked);
        }
        inputElement = document.getElementById(strItem);
        inputElement.checked = checked;
    }  
}

function dandrStore() {
    let strItem = "step";
    let inputElement = null;

    for (let i = 1; i < 20; i++) {
        strItem = "step" + i;
        inputElement = document.getElementById(strItem);
        checked = inputElement.checked;
        localStorage.setItem(strItem, checked);
    } 
}

// Function to clear the checkboxes
function clearCheckboxes() {
    let strItem = "step";
    let inputElement = null;
    for (let i = 1; i < 20; i++) {
        strItem = "step" + i;
        inputElement = document.getElementById(strItem);
        inputElement.checked = false;
        localStorage.setItem(strItem, false);
    }
}