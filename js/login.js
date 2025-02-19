// login.js - Handles user login functionality

import { getUsers } from './mockLoginDatabase.js'; // <-- Temporary mock DB for login

/* 
// ----- AWS Integration (uncomment this later) -----
// async function loginUserAWS(username, password) {
//   try {
//     const response = await fetch('https://your-aws-endpoint.com/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, password })
//     });
//     const result = await response.json();
//     return result; // e.g., { success: true/false, message: '...' }
//   } catch (error) {
//     console.error('Error logging in:', error);
//     return { success: false, message: 'Error logging in' };
//   }
// }
*/

document.getElementById('loginForm').addEventListener('submit', handleLogin);

function handleLogin(e) {
  e.preventDefault();
  
  // Grab form values
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  // ----- Using mock DB (temporary) -----
  const allUsers = getUsers();
  const foundUser = allUsers.find(u => u.username === username && u.password === password);
  if (foundUser) {
    alert(`Login successful! Welcome, ${foundUser.username}.`);
    // Redirect to profile.html upon successful login
    window.location.href = 'profile.html';
  } else {
    alert("Invalid credentials. Please try again.");
  }

  /* 
  // ----- AWS Integration (uncomment this later) -----
  // loginUserAWS(username, password).then(result => {
  //   if (result.success) {
  //     alert(`Login successful! Welcome, ${username}.`);
  //     window.location.href = 'profile.html';  // Redirect on success
  //   } else {
  //     alert(result.message || "Invalid credentials");
  //   }
  // });
  */
}
