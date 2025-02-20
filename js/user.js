import { loadReservations, cancelReservation } from "./reserved.js";

// Simulated logged-in user ID
const loggedInUserId = 101;

console.log("User.js loaded"); // Debugging: Ensure the script is running

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded"); // Debugging: Ensure event fires

  loadReservations(loggedInUserId); // Call function from reserved.js

  const confirmBookingBtn = document.getElementById("confirmBookingBtn");
  if (confirmBookingBtn) {
    confirmBookingBtn.addEventListener("click", confirmBooking);
  }
});
//Logout Function
document.addEventListener("DOMContentLoaded", () => {
  const logoutLink = document.getElementById("logoutLink");
  if (logoutLink) {
    logoutLink.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent the default anchor behavior
      logoutUser(); // Call the logout function
    });
  }
});

function logoutUser() {
  localStorage.removeItem("userRole"); // Clear stored role
  window.location.href = "index.html"; // Redirect to homepage
}

/* 
// ----- AWS Integration (Uncomment when deploying) -----
// async function cancelUserBookingAWS(reservationId) {
//   try {
//     const response = await fetch("https://your-aws-api-endpoint.com/cancelReservation", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ reservation_id: reservationId }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to cancel reservation on AWS");
//     }

//     console.log(`Reservation ${reservationId} canceled successfully on AWS.`);
//   } catch (error) {
//     console.error("Error canceling reservation on AWS:", error);
//   }
// }
*/

// Simulated cancel function (calls `reserved.js`)
function cancelUserBooking(reservationId) {
  if (confirm("Are you sure you want to cancel this booking?")) {
    console.log(`Simulating cancellation of reservation ${reservationId}...`);
    cancelReservation(reservationId); // Call function from reserved.js
  }
}

// Confirm booking (just simulates redirecting to payment)
function confirmBooking() {
  alert("Booking confirmed! Redirecting to payment...");
  window.location.href = "payment.html";
}

// Expose functions globally for inline JS in `user.html`
window.cancelUserBooking = cancelUserBooking;
window.confirmBooking = confirmBooking;
