document.addEventListener("DOMContentLoaded", async () => {
  const roomsContainer = document.getElementById("roomsContainer");

  try {
    const response = await fetch("http://localhost:3000/api/rooms");
    if (!response.ok) throw new Error("Failed to fetch rooms");

    const rooms = await response.json();

    roomsContainer.innerHTML = rooms.map(room => `
      <div class="room-card">
        <h3>${room.name}</h3>
        <p>Type: ${room.roomType}</p>
        <p>Price: $${room.price} per day</p>
        <button class="book-btn" onclick="bookRoom(${room.id})">Book Now</button>
      </div>
    `).join("");
  } catch (error) {
    roomsContainer.innerHTML = `<p>Error loading rooms. Please try again.</p>`;
  }
});

function bookRoom(roomId) {
  alert(`Booking Room ID: ${roomId}`);
}
