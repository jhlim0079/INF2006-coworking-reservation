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

  // Ensure modal event listeners are only added once DOM is loaded
  document.getElementById('confirmModify').addEventListener('click', confirmModify);
  document.getElementById('closeModify').addEventListener('click', closeModifyModal);

  // Attach event listeners to enable/disable "Confirm Changes" button
  document.getElementById('modifyDate').addEventListener('input', validateModifyForm);
  document.getElementById('modifyStartTime').addEventListener('input', validateModifyForm);
  document.getElementById('modifyEndTime').addEventListener('input', validateModifyForm);

  // Set the minimum date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('modifyDate').setAttribute("min", today);
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
    card.dataset.reservationId = res.reservation_id; // Store reservation ID

    const title = document.createElement('h3');
    title.textContent = res.workspace_name;
    card.appendChild(title);

    const location = document.createElement('p');
    location.innerHTML = `<strong>Location:</strong> ${res.location}`;
    card.appendChild(location);

    const date = document.createElement('p');
    date.innerHTML = `<strong>Reservation Date:</strong> <span>${res.reservation_date}</span>`;
    card.appendChild(date);

    const time = document.createElement('p');
    time.innerHTML = `<strong>Time:</strong> <span>${res.start_time} - ${res.end_time}</span>`;
    card.appendChild(time);

    const status = document.createElement('p');
    status.innerHTML = `<strong>Status:</strong> ${res.status}`;
    card.appendChild(status);

    const payment = document.createElement('p');
    payment.innerHTML = `<strong>Payment:</strong> ${res.payment_status}`;
    card.appendChild(payment);

    // Modify Button
    const modifyBtn = document.createElement('button');
    modifyBtn.textContent = "Modify";
    modifyBtn.className = "modify-btn";
    modifyBtn.addEventListener('click', () => openModifyModal(res));
    card.appendChild(modifyBtn);

    // Cancel Button
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = "Cancel";
    cancelBtn.className = "cancel-btn";
    cancelBtn.addEventListener('click', () => cancelReservation(res.reservation_id));
    card.appendChild(cancelBtn);

    container.appendChild(card);
  });
}

// Open Modify Modal
function openModifyModal(reservation) {
  const modifyModal = document.getElementById('modifyModal');
  if (!modifyModal) {
    console.error("Modify modal not found in the DOM.");
    return;
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  const modifyDateInput = document.getElementById('modifyDate');
  
  // Set the minimum allowed date to today
  modifyDateInput.setAttribute("min", today);
  
  // If the reservation date is before today, set the value to today, otherwise use the stored date
  if (reservation.reservation_date < today) {
    modifyDateInput.value = today;
  } else {
    modifyDateInput.value = reservation.reservation_date;
  }
  
  // Set the start and end times
  document.getElementById('modifyStartTime').value = reservation.start_time;
  document.getElementById('modifyEndTime').value = reservation.end_time;

  // Store the reservation ID on the modal for reference
  modifyModal.dataset.reservationId = reservation.reservation_id;
  
  // Display the modal
  modifyModal.style.display = "block";

  // Validate the form fields initially
  validateModifyForm();
}

// Validate form fields and enable/disable confirm button
function validateModifyForm() {
  const modifyDate = document.getElementById('modifyDate').value;
  const modifyStartTime = document.getElementById('modifyStartTime').value;
  const modifyEndTime = document.getElementById('modifyEndTime').value;
  const confirmModifyBtn = document.getElementById('confirmModify');

  if (modifyDate && modifyStartTime && modifyEndTime) {
    confirmModifyBtn.disabled = false;
  } else {
    confirmModifyBtn.disabled = true;
  }
}

// Confirm Modify Function
function confirmModify() {
  const modifyModal = document.getElementById('modifyModal');
  if (!modifyModal) return;

  const reservationId = modifyModal.dataset.reservationId;
  const newDate = document.getElementById('modifyDate').value;
  const newStartTime = document.getElementById('modifyStartTime').value;
  const newEndTime = document.getElementById('modifyEndTime').value;

  alert(`Reservation ${reservationId} modified!\nNew Date: ${newDate}\nNew Time: ${newStartTime} - ${newEndTime}`);

  modifyModal.style.display = "none";

  // Reload reservations (this would update the database in a real application)
  loadReservations(loggedInUserId);
}

// Cancel Reservation
function cancelReservation(reservationId) {
  if (confirm("Are you sure you want to cancel this reservation?")) {
    alert(`Reservation ${reservationId} canceled!`);
    
    // Reload reservations (this would update the database in a real application)
    loadReservations(loggedInUserId);
  }
}

// Close Modify Modal
document.getElementById('closeModify').addEventListener('click', () => {
  document.getElementById('modifyModal').style.display = "none";
});
