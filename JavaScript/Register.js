// creamos variables y ponemos el contenido de las text.box del html que el usuario a completado
let userName = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let repeatPassword = document.getElementById("repeat-password");


//let logInButton = document.getElementById("log-in-button");
let form = document.getElementsByClassName("sign-up")[0];
let formWrapper = document.getElementsByClassName("registro")[0];
let signUpButton = document.getElementById("signup-btn");


let userDB = JSON.parse(localStorage.getItem('users'));

signUpButton.addEventListener("click", function(event){
    event.preventDefault();//quita el refresh de la pagina para no perder la info
    deleteErrors();
    
    if (checkValidUser()){
        
        createUser(userName.value, email.value, password.value);
        let bienve = document.createElement('div')
        form.appendChild(bienve)
        bienve.innerHTML = ('Usuario creado correctamente')
        setTimeout(function(){
            window.location.href='index.html' // si se crea usuario va a la pagina de juego
        },2000)
        
    };
})

function checkValidUser() {
    let signUpValidator = new SignUpValidator(userName.value, email.value, password.value, repeatPassword.value);
    
    let usersDB = JSON.parse(localStorage.getItem("users"));
    let validUser = true;

    if(!signUpValidator.checkUserName()){
        signUpValidator.errorCreator("Por favor, introduce un nombre válido", userName)
        validUser=false
    }
    if(!signUpValidator.checkEmail()){
        signUpValidator.errorCreator("Por favor, introduce una dirección de mail válida", email)
        validUser=false
    }
    if(!signUpValidator.checkPassword()){
        signUpValidator.errorCreator("Por favor, introduce una contraseña válida", password)
        validUser=false
    }
    if(!signUpValidator.checkRepeatPassword()){
        signUpValidator.errorCreator("Las contraseñas no coinciden", repeatPassword)
        validUser=false
    }
    if (!signUpValidator.checkEmailInDB(usersDB)){
        signUpValidator.errorCreator("Este mail ya existe", email)
        validUser=false
    }

    return validUser
}

function deleteErrors (){
    let errors = [...document.getElementsByClassName("error")]
    errors ? errors.forEach(error => error.remove()) : null;
}

//creamos la funcion crear usuario que le pasamos los argumentos nombre...
function createUser(name,email,password){
    const newUser = new User (name, email, password)

    if(userDB){ 
        userDB.push(newUser);
    }
        else{
            userDB = [newUser];
        }
        localStorage.setItem('users', JSON.stringify(userDB));
    }




