// eslint-disable-next-line no-unused-vars
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

// This function is triggered when the user logs in
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if username and password are correct
    if (username === 'guest' && password === 'guest') {
        // Hide the login page and show the main content
        document.getElementById('login').classList.add('hidden');
        document.getElementById('main-screen').classList.remove('hidden');

        // Show the home section by default
        showSections('home');
    } else {
        // If the credentials are incorrect, show an alert
        alert("Enter a valid username and password!");
    }
}

// Wait for the DOM to be fully loaded before showing the login page
document.addEventListener('DOMContentLoaded', function() {
    // Ensure the login page is shown initially, and the main screen is hidden
    document.getElementById('login').classList.remove('hidden');
    document.getElementById('main-screen').classList.add('hidden');
});