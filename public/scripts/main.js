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

function initiate_registration() {

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
            // This is what occurs if the request is successfully returned.
            // Can make the page change to main menu, initiating welcome new user message
        }else{
            console.log("Something went wrong :(");
            // Sends back to user there was an error
        }
    };

    xhttp.open("POST", ("/register"), true); // Setting up the request type
    xhttp.setRequestHeader("Content-Type", "application/json"); // Tells server the request body contains JSON data
    xhttp.send(JSON.stringify(data)); // Send request

}

// DOM - LOGIN
document.addEventListener('DOMContentLoaded', function() {
    // Ensure the login page is shown initially, and the main screen is hidden
    document.getElementById('login').classList.remove('hidden');
    document.getElementById('main-screen').classList.add('hidden');
});
