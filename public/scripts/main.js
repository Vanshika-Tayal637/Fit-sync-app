


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

// NOTE: Switched to using AJAX function below for registration as is one of the ask requirements

// Runs when a user attempts to register
function registration() {
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
            window.location.href = "index.html";
        }else{ // Sends back to user there was an error
            console.log("Something went wrong :(");
            window.location.href = "index.html";
        }
    };

    xhttp.open("POST", ("/users/registration"), true); // Setting up the request type
    xhttp.setRequestHeader("Content-Type", "application/json"); // Tells server the request body contains JSON data
    xhttp.send(JSON.stringify(data)); // Send request

}

// USER SAVES WORKOUT
function saveWorkout(exercise){
  console.log("Saving workouts", exercise);

  // AJAX CALL TO SERVER
    var xhttp = new XMLHttpRequest();

    // What to do when HTTP response received
    xhttp.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200){
            alert("Workout Saved Successfully")
        }else{ // Sends back to user there was an error
            console.log("Something went wrong :(");
        }
    };

    xhttp.open("POST", ("/users/save_exercise"), true); // Setting up the request type
    xhttp.setRequestHeader("Content-Type", "application/json"); // Tells server the request body contains JSON data
    xhttp.send(JSON.stringify(exercise)); // Send request

}


// Shows list of Workouts user can choose
async function WorkoutSelection(category) {
  const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${category.toLowerCase()}?limit=10&offset=0`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '0a5d32844bmshb4aef2c2ae6b1e0p1a3d1fjsn02ac7c03610f',
      'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const exercises = await response.json();
    console.log('Fetched exercises:', exercises);

    const list = document.getElementById('workout-list');
    list.innerHTML = '';
    document.getElementById('workout-results').style.display = 'block';

    if (!Array.isArray(exercises) || exercises.length === 0) {
      list.innerHTML = '<li>No exercises found.</li>';
      return;
    }

    exercises.forEach(ex => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>${ex.name}</strong><br>
        <img src="${ex.gifUrl}" alt="${ex.name}" width="200"><br>
        Body Part: ${ex.bodyPart}<br>
      `;

      const button = document.createElement('button');
      button.textContent = 'Save';
      button.onclick = () => saveWorkout(ex);
      listItem.appendChild(button);

      list.appendChild(listItem);
    });

  } catch (error) {
    console.error('Fetch error:', error);
    document.getElementById('workout-results').style.display = 'block';
    document.getElementById('workout-list').innerHTML = '<li>Error loading exercises.</li>';
  }
}


