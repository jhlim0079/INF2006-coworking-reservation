// signup.js - Handles user sign-up functionality

import { addUser } from './mockUserDatabase.js'; // <-- Temporary mock DB for sign up

/* 
// ----- AWS Integration (uncomment this later) -----
// async function signUpUserAWS(username, email, password) {
//   try {
//     const response = await fetch('https://your-aws-endpoint.com/signup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username, email, password })
//     });
//     const result = await response.json();
//     return result; // e.g., { success: true/false, message: '...' }
//   } catch (error) {
//     console.error('Error signing up:', error);
//     return { success: false, message: 'Error signing up' };
//   }
// }
*/

document.getElementById('signupForm').addEventListener('submit', handleSignUp);

function handleSignUp(e) {
  e.preventDefault();

  // Grab form values
  const username = document.getElementById('signupUsername').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value.trim();

  // ----- Using mock DB (temporary) -----
  const result = addUser(username, email, password);
  if (result.success) {
    alert("Sign Up successful! You can now log in.");
    // Optionally, redirect to login.html here.
  } else {
    alert(result.message);
  }

  /*
  // ----- AWS Integration (uncomment this later) -----
  // signUpUserAWS(username, email, password).then(result => {
  //   if (result.success) {
  //     alert("Sign Up successful! You can now log in.");
  //   } else {
  //     alert(result.message);
  //   }
  // });
  */
}
