function dandrLoad() {
    for (let i = 1; i < 27; i++) {
        let checked = false;
        let strItem = "step" + i;
        let strChecked = localStorage.getItem(strItem);
        
        if (strChecked) {
            checked = (strChecked == "true");
        }
        else {
            localStorage.setItem(strItem, checked);
        }
        let inputElement = document.getElementById(strItem);
        inputElement.checked = checked;
    }  
}

function dandrStore() {
    for (let i = 1; i < 27; i++) {
        let strItem = "step" + i;
        let inputElement = document.getElementById(strItem);
        checked = inputElement.checked;
        localStorage.setItem(strItem, checked);
    } 
}

