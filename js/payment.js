// payment.js - Handles the mock payment process

document.getElementById('paymentForm').addEventListener('submit', (e) => {
    e.preventDefault();
  
    // Optionally, retrieve the booking details from localStorage if you want to display them:
    const bookingDetails = localStorage.getItem('bookingDetails');
    // You could parse and display them if desired:
    // const details = bookingDetails ? JSON.parse(bookingDetails) : {};
  
    // Simulate payment processing (you could add a spinner or timeout here)
    alert("Payment successful! Thank you for your booking.");
  
    // Clear the booking details if needed
    localStorage.removeItem('bookingDetails');
  
    // Redirect to the reservations page (user.html)
    window.location.href = 'user.html';
  });
  