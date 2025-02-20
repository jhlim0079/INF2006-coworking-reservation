import { getReservationsByUser as fetchReservations } from "./mockReservedDatabase.js";

const loggedInUserId = 101;
let userReservations = []; // Store bookings locally

console.log("User.js loaded"); // Debugging: Ensure the script is running

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded"); // Debugging: Ensure event fires

  loadUserBookings(loggedInUserId);

  const confirmBookingBtn = document.getElementById("confirmBookingBtn");
  if (confirmBookingBtn) {
    confirmBookingBtn.addEventListener("click", confirmBooking);
  }
});

// Define mock data in case `mockReservedDatabase.js` isn't available
function getMockReservations(userId) {
  return [
    {
      reservation_id: 1,
      workspace_name: "Cozy Desk",
      location: "Singapore",
      reservation_date: "2025-02-20",
      start_time: "9:00 AM",
      end_time: "12:00 PM",
      status: "Confirmed",
      payment_status: "Paid",
    },
    {
      reservation_id: 2,
      workspace_name: "Meeting Room A",
      location: "New York",
      reservation_date: "2025-02-21",
      start_time: "1:00 PM",
      end_time: "4:00 PM",
      status: "Pending",
      payment_status: "Unpaid",
    },
  ];
}

// Load user bookings and render them (use mock data if `fetchReservations` fails)
function loadUserBookings(userId) {
  console.log("Loading bookings for user:", userId);

  try {
    userReservations = fetchReservations(userId) || getMockReservations(userId);
  } catch (error) {
    console.warn("Error fetching reservations. Using mock data.");
    userReservations = getMockReservations(userId);
  }

  console.log("Bookings retrieved:", userReservations);
  renderUserBookings();
}

// Render "My Bookings" section
function renderUserBookings() {
  const container = document.getElementById("userBookingsContainer");

  if (!container) {
    console.error("Error: userBookingsContainer not found");
    return;
  }

  container.innerHTML = userReservations.length
    ? userReservations.map(createUserBookingCard).join("")
    : "<p>No bookings found.</p>";

  console.log("User bookings rendered");
}

// Create a user booking card
function createUserBookingCard(booking) {
  return `
    <div class="reserved-card" data-reservation-id="${booking.reservation_id}">
      <h3>${booking.workspace_name}</h3>
      <p><strong>Location:</strong> ${booking.location}</p>
      <p><strong>Date:</strong> ${booking.reservation_date}</p>
      <p><strong>Time:</strong> ${booking.start_time} - ${booking.end_time}</p>
      <p><strong>Status:</strong> ${booking.status}</p>
      <p><strong>Payment:</strong> ${booking.payment_status}</p>
      <button class="cancel-btn" onclick="cancelUserBooking(${booking.reservation_id})">Cancel</button>
    </div>
  `;
}

// Simulate canceling a reservation without modifying the database
function cancelUserBooking(reservationId) {
  if (confirm("Are you sure you want to cancel this booking?")) {
    userReservations = userReservations.filter(
      (res) => res.reservation_id !== reservationId
    );
    renderUserBookings(); // Update UI without affecting actual data
  }
}

// Confirm booking (just simulates redirecting to payment)
function confirmBooking() {
  alert("Booking confirmed! Redirecting to payment...");
  window.location.href = "payment.html";
}

// Expose functions globally for inline event listeners
window.cancelUserBooking = cancelUserBooking;
window.confirmBooking = confirmBooking;
