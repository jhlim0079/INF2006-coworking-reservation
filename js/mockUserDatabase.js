// mockLoginDatabase.js - Temporary mock database for user login/signup

// An array to store user credentials (not secure for production)
const users = [
    {
      username: "testuser",
      email: "test@example.com",
      password: "password123"
    }
  ];
  
  // Retrieve all users
  export function getUsers() {
    return users;
  }
  
  // Add a new user
  export function addUser(username, email, password) {
    // Basic check to avoid duplicates in the mock DB
    const existingUser = users.find(u => u.username === username || u.email === email);
    if (existingUser) {
      return { success: false, message: "User already exists" };
    }
  
    users.push({ username, email, password });
    return { success: true, message: "User registered successfully" };
  }
  