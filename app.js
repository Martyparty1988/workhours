// Data entries for testing
const entries = [
    { id: "1", employee: "Marty", dateStr: "2024-12-10", arrival: "08:00", departure: "12:00", dailyEarnings: 1600 },
    { id: "2", employee: "Maru", dateStr: "2024-12-11", arrival: "09:00", departure: "14:00", dailyEarnings: 1375 }
];

// Render entries in the table
function renderEntries(entries = []) {
    const tableBody = document.getElementById('entriesTable');
    if (entries.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="no-data">Žádné záznamy k zobrazení</td></tr>`;
        return;
    }
    tableBody.innerHTML = entries.map(entry => `
        <tr>
            <td>${entry.employee}</td>
            <td>${entry.dateStr}</td>
            <td>${entry.arrival}</td>
            <td>${entry.departure}</td>
            <td>${entry.dailyEarnings} Kč</td>
        </tr>
    `).join('');
}

// Theme toggle
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Screenshot functionality
document.getElementById('saveScreenshot').addEventListener('click', () => {
    const target = document.getElementById('screenshotTarget');
    html2canvas(target).then(canvas => {
        const link = document.createElement('a');
        link.download = 'zaznamy.png';
        link.href = canvas.toDataURL();
        link.click();
    }).catch(error => {
        console.error("Error generating screenshot:", error);
    });
});

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderEntries(entries);
});