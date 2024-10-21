let csvData = [];

// Function to parse the CSV text into an array of objects
function parseCSV(text) {
    const lines = text.split('\n');
    const result = [];

    for (const line of lines) {
        const columns = line.split(',');

        if (columns.length >= 11) {
            result.push({
                employeeId: columns[0],
                firstName: columns[1],
                lastName: columns[2],
                email: columns[3],
                phoneNumber: columns[4],
                hireDate: columns[5],
                jobId: columns[6],
                salary: columns[7],
                commissionPct: columns[8],
                managerId: columns[9],
                departmentId: columns[10]
            });
        }
    }
    return result;
}

// Fetch the CSV file and parse it
function loadCSVFile() {
    fetch('employees.csv')  // Ensure the path to your CSV file is correct
        .then(response => response.text())
        .then(text => {
            csvData = parseCSV(text);  // Parse the CSV text and store it
            alert('CSV file loaded successfully.');
        })
        .catch(error => console.error('Error loading the CSV file:', error));
}

// Call the function to load the CSV file when the page loads
window.onload = loadCSVFile;

// Event listener for employee ID input to auto-fill form
document.getElementById('employeeId').addEventListener('input', function(event) {
    const enteredId = event.target.value.trim();
    const match = csvData.find(row => row.employeeId === enteredId);

    if (match) {
        document.getElementById('firstName').value = match.firstName;
        document.getElementById('lastName').value = match.lastName;
        document.getElementById('email').value = match.email;
        document.getElementById('phoneNumber').value = match.phoneNumber;
        document.getElementById('hireDate').value = match.hireDate;
        document.getElementById('jobId').value = match.jobId;
        document.getElementById('salary').value = match.salary;
        document.getElementById('commissionPct').value = match.commissionPct;
        document.getElementById('managerId').value = match.managerId;
        document.getElementById('departmentId').value = match.departmentId;
    } else {
        // Clear form fields if no match is found
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phoneNumber').value = '';
        document.getElementById('hireDate').value = '';
        document.getElementById('jobId').value = '';
        document.getElementById('salary').value = '';
        document.getElementById('commissionPct').value = '';
        document.getElementById('managerId').value = '';
        document.getElementById('departmentId').value = '';
    }
});
