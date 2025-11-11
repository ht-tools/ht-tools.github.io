function showDialog(dialogId) {
    const dialog = document.getElementById(dialogId);
    dialog.showModal();
}

function closeDialog(dialogId) {
    const dialog = document.getElementById(dialogId);
    dialog.close();
}