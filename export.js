function exportToCSV(entries) {
    const fieldnames = Object.keys(entries[0]); // Dynamicky zjistí názvy polí
    let csv = fieldnames.join(",") + "\n"; // Hlavička CSV
    csv += entries.map(entry => 
        fieldnames.map(field => entry[field] || "").join(",")
    ).join("\n"); // Obsah CSV
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "zaznamy.csv";
    link.click();
}