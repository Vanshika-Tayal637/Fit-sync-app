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

// LOGIN
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if username and password are correct
    if (username === 'guest' && password === 'guest') {
        // Redirect to the FitSync page
        window.location.href = 'fitSync.html'; // Replace with your actual FitSync page URL
    } else {
        // If the credentials are incorrect, show an alert
        alert("Enter a valid username and password!");
    }
}

// onclick changes to register.html page
function change_to_register() {
    window.location.href = 'registration.html';
}

// Onclick initiates AJAX Call
function initiate_registration() {
    var xhttp = new XMLHttpRequest();

    xhttp.onReadystatechange = function() {
        if(this.readyState == 4 && history.status == 200){
            console.log("This is when HTTP request returns, and user is sent success message.");
        }
    };

    // open connection
    xhttp.open("POST", (path), true);

    // send request
    xhttp.send;

}

// DOM - LOGIN
document.addEventListener('DOMContentLoaded', function() {
    // Ensure the login page is shown initially, and the main screen is hidden
    document.getElementById('login').classList.remove('hidden');
    document.getElementById('main-screen').classList.add('hidden');
});