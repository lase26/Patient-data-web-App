async function fetchPatientData() {
  try {
    const response = await fetch('https://api-coalition-tech.herokuapp.com/patients');
    const data = await response.json();

    const jessica = data.find(p => p.name === "Jessica Taylor");

    if (jessica) {
      document.getElementById('name').textContent = jessica.name;
      document.getElementById('email').textContent = jessica.email;
      document.getElementById('age').textContent = jessica.age;
      document.getElementById('gender').textContent = jessica.gender;
      document.getElementById('phone').textContent = jessica.phone;

      plotBPChart(jessica.bloodPressureByYear);
    } else {
      alert("Jessica Taylor not found.");
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

function plotBPChart(bpData) {
  const ctx = document.getElementById('bpChart').getContext('2d');
  const labels = Object.keys(bpData);
  const values = Object.values(bpData);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Blood Pressure',
        data: values,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.4,
        fill: false,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}

window.onload = fetchPatientData;
