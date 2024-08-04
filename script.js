// Thresholds for identifying problems
const thresholds = {
    "LTE Setup Success Rate": 98,
    "RRC Setup Success Rate": 98,
    "S1 Conn Success Rate": 99,
    "LTE Call Drop Rate": 1,
    "CELL_Avaib": 99,
    "DL User throughput (kbit_s)": 5000, // Example value, adjust as needed
    "UL User throughput (kbit_s)": 1000, // Example value, adjust as needed
};

// Concise solutions for each problem
const solutions = {
    "Low LTE Setup Success Rate": "Check eNodeB config and core network.",
    "Low RRC Setup Success Rate": "Ensure radio resources and optimize frequency.",
    "Low S1 Conn Success Rate": "Verify S1 interface and core network.",
    "High LTE Call Drop Rate": "Improve signal quality and optimize handovers.",
    "Non-Zero RRC Blocking Rate": "Increase eNodeB capacity and optimize resources.",
    "Non-Zero ERAB Blocking Rate": "Ensure sufficient network resources and reduce congestion.",
    "Low DL User Throughput": "Enhance coverage and reduce interference.",
    "Low UL User Throughput": "Improve uplink signal and reduce interference.",
    "Low Cell Availability": "Resolve hardware issues and monitor performance.",
};

// Function to check for problems and generate solutions
function analyzeData(record) {
    const problems = [];
    
    if (record["LTE Setup Success Rate"] < thresholds["LTE Setup Success Rate"]) {
        problems.push({
            metric: "LTE Setup Success Rate",
            solution: solutions["Low LTE Setup Success Rate"]
        });
    }

    if (record["RRC Setup Success Rate"] < thresholds["RRC Setup Success Rate"]) {
        problems.push({
            metric: "RRC Setup Success Rate",
            solution: solutions["Low RRC Setup Success Rate"]
        });
    }

    if (record["S1 Conn Success Rate"] < thresholds["S1 Conn Success Rate"]) {
        problems.push({
            metric: "S1 Conn Success Rate",
            solution: solutions["Low S1 Conn Success Rate"]
        });
    }

    if (record["LTE Call Drop Rate"] > thresholds["LTE Call Drop Rate"]) {
        problems.push({
            metric: "LTE Call Drop Rate",
            solution: solutions["High LTE Call Drop Rate"]
        });
    }

    if (record["RRC Blocking Rate"] > 0) {
        problems.push({
            metric: "RRC Blocking Rate",
            solution: solutions["Non-Zero RRC Blocking Rate"]
        });
    }

    if (record["ERAB Blocking Rate"] > 0) {
        problems.push({
            metric: "ERAB Blocking Rate",
            solution: solutions["Non-Zero ERAB Blocking Rate"]
        });
    }

    if (record["DL User throughput (kbit_s)"] < thresholds["DL User throughput (kbit_s)"]) {
        problems.push({
            metric: "DL User Throughput",
            solution: solutions["Low DL User Throughput"]
        });
    }

    if (record["UL User throughput (kbit_s)"] < thresholds["UL User throughput (kbit_s)"]) {
        problems.push({
            metric: "UL User Throughput",
            solution: solutions["Low UL User Throughput"]
        });
    }

    if (record["CELL_Avaib"] < thresholds["CELL_Avaib"]) {
        problems.push({
            metric: "Cell Availability",
            solution: solutions["Low Cell Availability"]
        });
    }

    return problems;
}

// Function to render the table with only LTE problems
function renderTable(data, filter = '') {
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = ''; // Clear existing content

    data.forEach(record => {
        const problems = analyzeData(record);
        
        if (problems.length > 0 && record.LABEL.toLowerCase().includes(filter.toLowerCase())) {
            const row = document.createElement('tr');
            const dateCell = document.createElement('td');
            const labelCell = document.createElement('td');
            const problemCell = document.createElement('td');
            const solutionCell = document.createElement('td');

            dateCell.textContent = record.DATE;
            labelCell.textContent = record.LABEL;
            problemCell.textContent = problems.map(p => p.metric).join(", ");
            solutionCell.textContent = problems.map(p => p.solution).join("; ");

            row.appendChild(dateCell);
            row.appendChild(labelCell);
            row.appendChild(problemCell);
            row.appendChild(solutionCell);

            tableBody.appendChild(row);
        }
    });
}

// Function to handle search
function handleSearch(data) {
    const searchInput = document.getElementById('search-input').value;
    renderTable(data, searchInput);
}

// Fetch and load data from the JSON file
function loadAndAnalyzeData() {
    fetch('exel.KPI.json')
        .then(response => response.json())
        .then(data => {
            renderTable(data);

            // Attach search input event listener
            document.getElementById('search-input').addEventListener('input', () => {
                handleSearch(data);
            });
        })
        .catch(error => console.error('Error loading the JSON data:', error));
}

// Run the loading and rendering function on page load
window.onload = function() {
    loadAndAnalyzeData();
};
