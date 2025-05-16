const { format } = require("morgan");

let workoutSelected = '';

// This function is responsible for showing a specific section and hiding others.
function showSections(section_name) {
    const sections_list = ['home', 'workouts', 'tracker'];

    // Loop through all sections and hide them
    for (let section of sections_list) {
        document.getElementById(section).classList.add('hidden');
    }

    // Show the requested section
    document.getElementById(section_name).classList.remove('hidden');
}

// Runs when a user attempts to login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please enter username and password');
        return;
      }

      fetch('/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      .then(async res => {
        if (res.ok) {
          alert('Login successful!');
          window.location.href = '/home.html';  // Redirect after successful login
        } else {
          const errorText = await res.text();
          alert('Login failed: ' + errorText);
        }
      })
      .catch(err => {
        console.error('Login error:', err);
        alert('An error occurred during login.');
      });
}

function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;

  if (!username || !password || !email) {
      alert('Please enter all boxes!');
      return;
    }

    fetch('/users/registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, email })
    })
    .then(async res => {
      if (res.ok) {
        alert('Registration successful!');
        window.location.href = '/home.html';  // Redirect after successful login
      } else {
        const errorText = await res.text();
        alert('Login failed: ' + errorText);
      }
    })
    .catch(err => {
      console.error('Login error:', err);
      alert('Registration successful!');
      window.location.href = '/home.html';  // Redirect after successful login
    });
}


// Runs when a user attempts to register
function initiate_registration() {

    // Check if user ticked checkbox
    const checkbox = document.getElementById('agreementcheck');
    if (!checkbox.checked){
        alert("Please agree to User Agreement to Register");
        return;
    }

    // Create data object and place info from HTML forms inside
    const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        email: document.getElementById('email').value
    };

    // AJAX Call
    var xhttp = new XMLHttpRequest();

    // What to do when HTTP response received
    xhttp.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200){
            const response = JSON.parse(this.responseText);
            document.getElementById('message').textContent = response.message;
            window.location.href = "home.html";
            welcome(data.username);
        }else{
            console.log("Something went wrong :(");
            const response = "Database not yet responding (500 returned not 200)";
            document.getElementById('message').textContent = response;
            // Sends back to user there was an error
        }
    };

    xhttp.open("POST", ("/register"), true); // Setting up the request type
    xhttp.setRequestHeader("Content-Type", "application/json"); // Tells server the request body contains JSON data
    xhttp.send(JSON.stringify(data)); // Send request

}

// DOM - LOGIN -

// document.addEventListener('DOMContentLoaded', function() {
//     // Ensure the login page is shown initially, and the main screen is hidden.

//     // document.getElementById('login').classList.remove('hidden');
//     // document.getElementById('main-screen').classList.add('hidden');

// });
