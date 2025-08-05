import React, { useEffect, useState } from 'react';
import './App.css';
import Chart from 'chart.js/auto';
import data from './patient.json';

const App = () => {
  const [patient, setPatient] = useState(null);

  // Load patient
  useEffect(() => {
    const jessica = data.find(p => p.name === 'Jessica Taylor');
    console.log("Jessica:", jessica);
    setPatient(jessica);
  }, []);

  // Render chart after patient is set and canvas is rendered
  useEffect(() => {
    if (patient?.bloodPressureByYear) {
      const ctx = document.getElementById('bpChart')?.getContext('2d');
      if (!ctx) return; // failsafe

      const labels = Object.keys(patient.bloodPressureByYear);
      const values = Object.values(patient.bloodPressureByYear);

      new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Blood Pressure',
            data: values,
            borderColor: '#3f83f8',
            backgroundColor: 'rgba(63, 131, 248, 0.1)',
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: { beginAtZero: false }
          }
        }
      });
    }
  }, [patient]); // only run after patient is loaded

  if (!patient) return <div className="loader">Loading...</div>;

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="logo">Dashboard</div>
        <nav>
          <ul>
            <li className="active">Overview</li>
            <li>Patients</li>
            <li>Appointments</li>
          </ul>
        </nav>
      </aside>
      <main className="main">
        <header className="header">
          <h1>{patient.name}</h1>
        </header>
        <section className="info-cards">
          <div className="card">Age: {patient.age}</div>
          <div className="card">Gender: {patient.gender}</div>
          <div className="card">Phone: {patient.phone}</div>
        </section>
        <section className="chart-section">
          <h2>Blood Pressure Over Time</h2>
          <canvas id="bpChart" width="400" height="200"></canvas>
        </section>
      </main>
    </div>
  );
};

export default App;
