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
            console.log("This is when HTTP request returns, and user is sent success message.");
            const response = JSON.parse(this.responseText);
            document.getElementById('message').textContent = response.message;
            // Here, the page should also change to the main menu (since they created an account).
            // There, it will give them a welcome prompt, instead of here, but this will do for now.
        }else{
            console.log("Something went wrong :(");
        }
    };

    // Open connection
    xhttp.open("POST", ("/register"), true);

    // Tells server the request body contains JSON data
    xhttp.setRequestHeader("Content-Type", "application/json");

    // Send request
    xhttp.send(JSON.stringify(data));

}

// DOM - LOGIN
document.addEventListener('DOMContentLoaded', function() {
    // Ensure the login page is shown initially, and the main screen is hidden
    document.getElementById('login').classList.remove('hidden');
    document.getElementById('main-screen').classList.add('hidden');
});
