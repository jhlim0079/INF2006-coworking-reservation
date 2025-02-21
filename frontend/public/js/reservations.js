import { getWorkspaces } from './mockDatabase.js'; // Temporary, remove when deploying to AWS

/* 
// ----- Future AWS Integration -----
// Uncomment and adjust the following function when you're ready to fetch data from AWS (e.g., via API Gateway):
// async function fetchWorkspacesFromAWS() {
//   try {
//     const response = await fetch('https://your-api-endpoint.amazonaws.com/prod/workspaces');
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const workspaces = await response.json();
//     return workspaces;
//   } catch (error) {
//     console.error('Error fetching workspaces:', error);
//     return [];
//   }
// }
*/

// Render workspace cards to the DOM
function renderWorkspaces(data) {
  const container = document.getElementById('workspaceContainer');
  container.innerHTML = ""; // Clear previous content

  if (data.length === 0) {
    container.innerHTML = "<p>No workspaces found.</p>";
    return;
  }

  data.forEach(ws => {
    const card = document.createElement('div');
    card.className = 'workspace-card';

    // Display floor plan image if available
    if (ws.floor_plan_image_url) {
      const img = document.createElement('img');
      img.src = ws.floor_plan_image_url;
      img.alt = `${ws.name} floor plan`;
      card.appendChild(img);
    }

    const title = document.createElement('h3');
    title.textContent = ws.name;
    card.appendChild(title);

    const location = document.createElement('p');
    location.innerHTML = `<strong>Location:</strong> ${ws.location}`;
    card.appendChild(location);

    const type = document.createElement('p');
    type.innerHTML = `<strong>Type:</strong> ${ws.type}`;
    card.appendChild(type);

    const price = document.createElement('p');
    price.innerHTML = `<strong>Price:</strong> $${ws.price}`;
    card.appendChild(price);

    const status = document.createElement('p');
    status.innerHTML = `<strong>Status:</strong> ${ws.availability_status}`;
    card.appendChild(status);

    // "Book Now" button (only for available workspaces)
    const btn = document.createElement('button');
    btn.textContent = "Book Now";
    btn.className = "btn";
    btn.disabled = (ws.availability_status.toLowerCase() !== "available");
    btn.addEventListener('click', () => openBookingModal(ws));
    card.appendChild(btn);

    container.appendChild(card);
  });
}

// Filter workspaces based on type, location, and availability (exclude booked)
async function filterWorkspaces() {
  const typeFilter = document.getElementById('typeFilter').value.toLowerCase();
  const locationFilter = document.getElementById('locationFilter').value.toLowerCase();

  // ----- Temporary Data Fetch -----
  // Using the temporary database module:
  const allWorkspaces = getWorkspaces();

  // ----- Future AWS Integration -----  
  // When ready, replace the above line with:
  // const allWorkspaces = await fetchWorkspacesFromAWS();

  // Filter out workspaces that are booked
  const filtered = allWorkspaces.filter(ws => {
    if (ws.availability_status.toLowerCase() === "booked") {
      return false;
    }
    const matchType = typeFilter ? ws.type.toLowerCase() === typeFilter : true;
    const matchLocation = locationFilter ? ws.location.toLowerCase().includes(locationFilter) : true;
    return matchType && matchLocation;
  });

  renderWorkspaces(filtered);
}

// Modal functions for booking simulation
const modal = document.getElementById('bookingModal');
const closeModal = document.getElementById('closeModal');
const modalText = document.getElementById('modalText');

function openBookingModal(workspace) {
  // Set the modal content with workspace info and input fields for date and time.
  modalText.innerHTML = `
    <h3>Booking for "${workspace.name}"</h3>
    <p><strong>Location:</strong> ${workspace.location}</p>
    <p>
      <label for="reservationDate">Reservation Date:</label>
      <input type="date" id="reservationDate" required />
    </p>
    <p>
      <label for="startTime">Start Time:</label>
      <input type="time" id="startTime" required />
    </p>
    <p>
      <label for="endTime">End Time:</label>
      <input type="time" id="endTime" required />
    </p>
  `;
  modal.style.display = "block";

  // Set the minimum allowed date for the reservation date input (today's date)
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayString = `${yyyy}-${mm}-${dd}`;

  const dateInput = document.getElementById('reservationDate');
  dateInput.min = todayString;
  // Optionally, set the default value to today
  dateInput.value = todayString;

  const startTimeInput = document.getElementById('startTime');

  // Update the start time's minimum based on the selected date.
  function updateStartTimeMin() {
    if (dateInput.value === todayString) {
      // If the selected date is today, set the minimum start time to the current time
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const min = String(now.getMinutes()).padStart(2, '0');
      const currentTime = `${hh}:${min}`;
      startTimeInput.min = currentTime;
    } else {
      // Otherwise, allow any time
      startTimeInput.min = "00:00";
    }
  }

  updateStartTimeMin();
  dateInput.addEventListener('change', updateStartTimeMin);
}

closeModal.addEventListener('click', () => {
  modal.style.display = "none";
});

document.getElementById('confirmBooking').addEventListener('click', () => {
  // Retrieve the date and time values from the input fields in the modal
  const reservationDate = document.getElementById('reservationDate').value;
  const startTime = document.getElementById('startTime').value;
  const endTime = document.getElementById('endTime').value;

  // Simple validation: check if all fields have values
  if (!reservationDate || !startTime || !endTime) {
    alert("Please fill in all the required fields before proceeding to payment.");
    return; // Stop execution if validation fails
  }

  // Optionally store booking details in localStorage for the payment page
  const bookingDetails = { reservationDate, startTime, endTime };
  localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

  // Redirect to the payment page
  window.location.href = 'payment.html';
});



document.getElementById('filterBtn').addEventListener('click', filterWorkspaces);

// Initial render of all workspaces (only those not booked)
// ----- Temporary Data Render -----
// Using the temporary database module:
const initialWorkspaces = getWorkspaces().filter(ws => ws.availability_status.toLowerCase() !== "booked");
renderWorkspaces(initialWorkspaces);

/* 
// ----- Future AWS Integration -----
// When ready, replace the above with:
fetchWorkspacesFromAWS()
  .then(data => {
    const availableData = data.filter(ws => ws.availability_status.toLowerCase() !== "booked");
    renderWorkspaces(availableData);
  })
  .catch(error => console.error("Error fetching workspaces:", error));
*/
