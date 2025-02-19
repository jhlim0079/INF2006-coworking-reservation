/* Updated admin.js with Admin Authentication and Integration with reserved.js */
// admin.js - Handles Admin functionalities

import {
  getRooms,
  addRoom,
  deleteRoom,
  updateRoom,
  getBookings,
  deleteBooking,
} from "./mockAdminDatabase.js";
import { loadReservations } from "./reserved.js"; // Keep reservation functions intact

// Function to check if user is an admin
function checkAdminAuth() {
  const userRole = localStorage.getItem("userRole"); // Assuming user role is stored in localStorage
  if (userRole !== "admin") {
    alert("Access Denied: Admins Only");
    window.location.href = "index.html"; // Redirect to homepage if not admin
  }
}
// Function to log out admin
function logoutAdmin() {
  localStorage.removeItem("userRole"); // Clear stored role
  window.location.href = "index.html"; // Redirect to homepage
}

document.addEventListener("DOMContentLoaded", () => {
  checkAdminAuth(); // Ensure only admins can access
  loadRooms();
  loadBookings();
  loadReservations(); // Keep user reservation functionalities

  // Add event listener for logout button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logoutAdmin);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  checkAdminAuth(); // Ensure only admins can access
  loadRooms();
  loadBookings();
  loadReservations(); // Keep user reservation functionalities
});

// Load rooms into the admin dashboard
async function loadRooms() {
  const roomContainer = document.getElementById("roomContainer");
  if (!roomContainer) return;
  roomContainer.innerHTML = "";

  let rooms = getRooms();
  /*
  // ----- AWS Integration (uncomment later) -----
  // try {
  //   const response = await fetch('https://your-aws-endpoint.com/rooms');
  //   rooms = await response.json();
  // } catch (error) {
  //   console.error('Error fetching rooms from AWS:', error);
  // }
  */

  rooms.forEach((room) => {
    const roomElement = document.createElement("div");
    roomElement.classList.add("room-item");
    roomElement.innerHTML = `
      <p>${room.name} | Type: ${room.type} | Price: $${room.price} | Location: ${room.location}</p>
      <button onclick="handleEditRoom('${room.id}')">Edit</button>
      <button onclick="handleDeleteRoom('${room.id}')">Delete</button>
    `;
    roomContainer.appendChild(roomElement);
  });
}

// Handle adding a new room
const addRoomForm = document.getElementById("addRoomForm");
if (addRoomForm) {
  addRoomForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const roomName = document.getElementById("roomName").value.trim();
    const roomType = document.getElementById("roomType").value.trim();
    const roomPrice = parseFloat(
      document.getElementById("roomPrice").value.trim()
    );
    const roomLocation = document.getElementById("roomLocation").value.trim();
    if (roomName && roomType && !isNaN(roomPrice) && roomLocation) {
      addRoom({
        name: roomName,
        type: roomType,
        price: roomPrice,
        location: roomLocation,
      });
      /*
      // ----- AWS Integration (uncomment later) -----
      // try {
      //   await fetch('https://your-aws-endpoint.com/rooms', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ name: roomName, type: roomType, price: roomPrice, location: roomLocation })
      //   });
      // } catch (error) {
      //   console.error('Error adding room to AWS:', error);
      // }
      */
      loadRooms();
      alert("Room added successfully!");
    }
  });
}

// Load all bookings into the admin dashboard
async function loadBookings() {
  const bookingContainer = document.getElementById("bookingContainer");
  if (!bookingContainer) return;
  bookingContainer.innerHTML = "";

  let bookings = getBookings();
  /*
  // ----- AWS Integration (uncomment later) -----
  // try {
  //   const response = await fetch('https://your-aws-endpoint.com/bookings');
  //   bookings = await response.json();
  // } catch (error) {
  //   console.error('Error fetching bookings from AWS:', error);
  // }
  */

  bookings.forEach((booking) => {
    const bookingElement = document.createElement("div");
    bookingElement.classList.add("booking-item");
    bookingElement.innerHTML = `
      <p>User: ${booking.username} | Room: ${booking.room} | Date: ${booking.date}</p>
      <button onclick="handleDeleteBooking('${booking.id}')">Delete</button>
    `;
    bookingContainer.appendChild(bookingElement);
  });
}

// Handle deleting a booking
function handleDeleteBooking(bookingId) {
  deleteBooking(bookingId);
  loadBookings();
  alert("Booking deleted successfully!");
}
