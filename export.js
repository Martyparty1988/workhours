// Export to JSON
document.getElementById('exportJSON').addEventListener('click', () => {
    const jsonData = JSON.stringify(entries, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'zaznamy.json';
    link.click();
});

// Export to CSV
document.getElementById('exportCSV').addEventListener('click', () => {
    const csv = entries.map(entry => `${entry.employee},${entry.dateStr},${entry.arrival},${entry.departure},${entry.dailyEarnings}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'zaznamy.csv';
    link.click();
});