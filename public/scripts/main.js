let workoutSelected='';
function login(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if(username&&password){
        document.getElementById('login').classList.add('hidden');
        document.getElementById('main-screen').classList.remove('hidden');
        showSections('home');
    }else{
        alert("Enter a valid username and password!");
    }
}

function showSections(section_name){
    const sections_list=['home','workouts','tracker'];
    for (let i of sections_list){
        document.getElementById(i).classList.add('hidden');

    };
    document.getElementById(section_name).classList.remove('hidden');
}