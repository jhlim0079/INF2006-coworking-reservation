// mockReservedDatabase.js - Temporary mock database for reserved workspaces

const reservedWorkspaces = [
    {
      reservation_id: 1,
      user_id: 101, // Example user ID
      workspace_id: 5,
      workspace_name: "Private Office 101",
      location: "Downtown Branch",
      reservation_date: "2025-03-15",
      start_time: "09:00 AM",
      end_time: "05:00 PM",
      status: "confirmed",
      payment_status: "paid upon arrival",
      created_at: "2025-02-10",
      updated_at: "2025-02-12"
    },
    {
      reservation_id: 2,
      user_id: 101, // Same user ID for multiple reservations
      workspace_id: 8,
      workspace_name: "Meeting Room A",
      location: "Midtown Branch",
      reservation_date: "2025-03-20",
      start_time: "10:00 AM",
      end_time: "02:00 PM",
      status: "pending",
      payment_status: "unpaid",
      created_at: "2025-02-11",
      updated_at: "2025-02-12"
    }
  ];
  
  // Function to retrieve reservations for a specific user
  export function getReservationsByUser(userId) {
    return reservedWorkspaces.filter(reservation => reservation.user_id === userId);
  }
  