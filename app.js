const martyData = [];
const maruData = [];
const summaryData = [];

document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-content").forEach(tab => tab.classList.remove("active"));
        document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
        document.getElementById(btn.dataset.tab).classList.add("active");
        btn.classList.add("active");
    });
});

// Marty form
document.getElementById("martyForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const date = document.getElementById("martyDate").value;
    const arrival = document.getElementById("martyArrival").value;
    const departure = document.getElementById("martyDeparture").value;
    const pause = parseFloat(document.getElementById("martyPause").value) || 0;
    const workHours = calculateWorkHours(arrival, departure, pause);
    const earnings = (workHours.split("h")[0] * 200).toFixed(2);
    martyData.push({ date, arrival, departure, pause, workHours, earnings });
    renderTable("martyTableBody", martyData);
});

function calculateWorkHours(arrival, departure, pause) {
    const [arrH, arrM] = arrival.split(":").map(Number);
    const [depH, depM] = departure.split(":").map(Number);
    const totalMinutes = (depH * 60 + depM) - (arrH * 60 + arrM) - (pause * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
}

function renderTable(tableId, data) {
    const tableBody = document.getElementById(tableId);
    tableBody.innerHTML = data
        .map(row => `<tr>${Object.values(row).map(val => `<td>${val}</td>`).join("")}</tr>`)
        .join("");
}