function showNotification(message, type = 'success') {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
            background: type === 'success' ? "#4caf50" : "#f44336"
        }
    }).showToast();
}