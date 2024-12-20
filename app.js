document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

function renderEntries(entries, from, to) {
    // Filtrování a vykreslení dat
    const filtered = entries.filter(entry => {
        const date = new Date(entry.dateStr);
        return (!from || date >= from) && (!to || date <= to);
    });

    const tableBody = document.getElementById('entriesTable');
    tableBody.innerHTML = filtered.map(entry => `
        <tr>
            <td>${entry.employee}</td>
            <td>${entry.dateStr}</td>
            <td>${entry.arrival}</td>
            <td>${entry.departure}</td>
            <td>${entry.dailyEarnings} Kč</td>
            <td><button class="removeEntryBtn" data-id="${entry.id}">Smazat</button></td>
        </tr>`).join('') || `<tr><td colspan="6" class="no-data">Žádné záznamy</td></tr>`;
}

document.getElementById('filterFrom').addEventListener('input', () => renderEntries(entries));
document.getElementById('filterTo').addEventListener('input', () => renderEntries(entries));