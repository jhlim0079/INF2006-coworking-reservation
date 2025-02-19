// reserved.js - Handles displaying reserved workspaces

import { getReservationsByUser } from './mockReservedDatabase.js'; // <-- Temporary mock DB

/* 
// ----- AWS Integration (uncomment this later) -----
// async function fetchReservationsFromAWS(userId) {
//   try {
//     const response = await fetch(`https://your-aws-endpoint.com/reservations?userId=${userId}`);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const reservations = await response.json();
//     return reservations; // Array of reserved workspaces
//   } catch (error) {
//     console.error('Error fetching reservations:', error);
//     return [];
//   }
// }
*/

// Simulated logged-in user ID (replace with actual session handling later)
const loggedInUserId = 101; 

document.addEventListener('DOMContentLoaded', () => {
  loadReservations(loggedInUserId);
});

function loadReservations(userId) {
  // ----- Using mock DB (temporary) -----
  const reservations = getReservationsByUser(userId);
  
  /* 
  // ----- AWS Integration (uncomment this later) -----
  // fetchReservationsFromAWS(userId).then(reservations => {
  //   renderReservations(reservations);
  // }).catch(error => console.error("Error fetching reservations:", error));
  */

  renderReservations(reservations);
}

function renderReservations(reservations) {
  const container = document.getElementById('reservedContainer');
  container.innerHTML = ""; // Clear previous content

  if (reservations.length === 0) {
    container.innerHTML = "<p>No reservations found.</p>";
    return;
  }

  reservations.forEach(res => {
    const card = document.createElement('div');
    card.className = 'reserved-card';

    const title = document.createElement('h3');
    title.textContent = res.workspace_name;
    card.appendChild(title);

    const location = document.createElement('p');
    location.innerHTML = `<strong>Location:</strong> ${res.location}`;
    card.appendChild(location);

    const date = document.createElement('p');
    date.innerHTML = `<strong>Reservation Date:</strong> ${res.reservation_date}`;
    card.appendChild(date);

    const time = document.createElement('p');
    time.innerHTML = `<strong>Time:</strong> ${res.start_time} - ${res.end_time}`;
    card.appendChild(time);

    const status = document.createElement('p');
    status.innerHTML = `<strong>Status:</strong> ${res.status}`;
    card.appendChild(status);

    const payment = document.createElement('p');
    payment.innerHTML = `<strong>Payment:</strong> ${res.payment_status}`;
    card.appendChild(payment);

    container.appendChild(card);
  });
}
