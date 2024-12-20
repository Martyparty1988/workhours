let martyData = [];
let maruData = [];
let summaryData = [];

document.getElementById('martyTab').addEventListener('click', () => switchTab('marty'));
document.getElementById('maruTab').addEventListener('click', () => switchTab('maru'));
document.getElementById('summaryTab').addEventListener('click', () => switchTab('summary'));

// Přepínání tabů
function switchTab(tab) {
    document.querySelectorAll('.tab-content').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelector(`#${tab}Section`).classList.add('active');
}

// Výpočet pracovní doby
function calculateWorkHours(arrival, departure, pause, wellness, overtime) {
    const [arrH, arrM] = arrival.split(':').map(Number);
    const [depH, depM] = departure.split(':').map(Number);
    const totalMinutes = (depH * 60 + depM) - (arrH * 60 + arrM) - (pause * 60) - (wellness * 60) + (overtime * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
}

// Přidání řádku pro Marty
document.getElementById('addMartyRow').addEventListener('click', () => {
    const date = prompt("Datum:");
    const arrival = prompt("Příchod:");
    const departure = prompt("Odchod:");
    const pause = parseFloat(prompt("Pauza (h):")) || 0;
    const wellness = parseFloat(prompt("Wellness (h):")) || 0;
    const overtime = parseFloat(prompt("Více-práce (h):")) || 0;
    const workHours = calculateWorkHours(arrival, departure, pause, wellness, overtime);
    const dailyEarnings = parseFloat(prompt("Den. výdělek (Kč):")) || 0;
    const debt = parseFloat(prompt("Na dluh (Kč):")) || 0;
    martyData.push({ date, arrival, departure, pause, wellness, overtime, workHours, dailyEarnings, debt });
    renderTable('marty', martyData);
    calculateStats('marty', martyData);
});

// Funkce pro generování tabulek
function renderTable(tab, data) {
    const tableBody = document.getElementById(`${tab}TableBody`);
    tableBody.innerHTML = data.map(row => `
        <tr class="${parseFloat(row.debt) > 0 ? 'row-debt' : ''}">
            ${Object.values(row).map(value => `<td>${value}</td>`).join('')}
        </tr>
    `).join('');
}

// Funkce pro statistiky
function calculateStats(tab, data) {
    const totalDays = data.length;
    const totalWorkHours = data.reduce((sum, row) => sum + parseFloat(row.workHours.split('h')[0]), 0);
    const totalEarnings = data.reduce((sum, row) => sum + parseFloat(row.dailyEarnings), 0);

    const statsElement = document.getElementById(`${tab}Stats`);
    statsElement.innerHTML = `
        <p>Počet dnů: ${totalDays}</p>
        <p>Celkové hodiny: ${totalWorkHours}</p>
        <p>Celkový výdělek: ${totalEarnings} Kč</p>
    `;
}

// Inicializace
switchTab('marty');