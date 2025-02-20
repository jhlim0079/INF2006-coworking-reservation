document.getElementById('paymentForm').addEventListener('submit', (e) => {
  e.preventDefault();

  // Retrieve selected month and year
  const expiryMonth = document.getElementById('expiryMonth').value;
  const expiryYear = document.getElementById('expiryYear').value;

  // Validate expiry date
  if (!expiryMonth || !expiryYear) {
    alert('Please select a valid expiry date.');
    return;
  }

  // Simulate payment processing
  alert("Payment successful! Thank you for your booking.");

  // Clear the booking details if needed
  localStorage.removeItem('bookingDetails');

  // Redirect to the reservations page (user.html)
  window.location.href = 'user.html';
});