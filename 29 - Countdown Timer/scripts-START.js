const timerdiv = document.querySelector('.timer');
const buttons = timerdiv.querySelectorAll('[data-time]');
const timerDisplay = timerdiv.querySelector('.display__time-left')
const endTime = timerdiv.querySelector('.display__end-time');
let countdown;

function timer(seconds) {
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayEndTime(then);
    displayTimeLeft(seconds)
    countdown = setInterval(() => {
        let secondsLeft = Math.round((then - Date.now()) / 1000);
        displayTimeLeft(secondsLeft);
        console.log(secondsLeft);
        if(secondsLeft <= 0) {
            clearInterval(countdown);
            return;
        };
    }, 1000);
};

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' + remainderSeconds : remainderSeconds}`;
    timerDisplay.textContent = display;
    document.title = display;  
};

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const minutes = end.getMinutes();
    const hours = end.getHours();
    endTime.textContent = `be back at: ${hours - 12}:${minutes < 10 ? '0' + minutes : minutes}`;
};

function startTimer() {
const seconds = parseInt(this.dataset.time);
timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const minutes = document.customForm.minutes.value
    this.reset()
    timer(minutes * 60);
});


//  1 function timer(seconds)
/* 
    Guardamos en una variable el tiempo en el momento que
corre la funcion (el inicio).
    Otra variable para guardar cuando termina el timer.
    Usamos un interval que corra cada un segundo,
 guardando en una variable cunatos segundos quedan entre
 el presente y el final.
    Si no quedan segundos de diferencia entre el presente
y el final el timer se debe parar
    Si quedan segundos hay que actualizar el display
mostrando cuantos segundos quedan (otra funcion). los
segundos deben ser numeros enteros.
    El interval no arranca de inmediato, tarda 1s, la
consecuencia es que cuando corremos displayTimeLeft() en
el timer ya paso un segundo, por lo tanto no muestra el
primer segundo. Hay que arreglar eso.
*/

// 2 function displayTimeLeft(seconds)
/*
    Guardamos los segundos en minutos sin segundos. por ej
si quedan 2 minutos 36 segundos guardamos 2.
    Guardamos los segundos que despreciamos en la variable
de arriba en otra variable.
    Guardamos en una variable lo que vamos a mostrar en el
display. queremos un formato del estilo 11:11.
    Si quedan < 10s el dispay debe ser 1:06 y no 1:6.
    Mostamos en el display y en el titulo de la pestaña
los segundo que quedan.
*/

// 3 function displayEndTime(timestamp)
/*
    Esta funcion va a que hora termina la cuenta atras.
    Primero usamos el timestamp para crear un objeto date
con el valor de a que momento termina.
    El objeto creado con date tiene mucha informacion,
vamos a tomar la hora y los minutos.
    Cambiamos el texto del display end time a 'be back at
"la hora y minutos que termina"'.
    Esta funcion debe correr en la primer funcion.
    Queremos que el display tenga un formato 0-12 y no 12-24
para la hora(No hace falta aclarar AM / PM).
    Si los minutos < 10 quremos que se vea 3:00 y no 3:0.
*/

// 4 function startTimer()
/* 
    Esta funcion corre cuando el usuario toca alguno de
los botones con [data-time].
    pasamos la info del data-time a un numero 
(no usa Number()). y la guardamos en una variable.
despues corremos la primera funcion pasando esa variable
    Hay que modificar la primer funcion para que si toco dos
botones se cancele el interval del primer click.
*/

// 5 function(e)
/* 
    Queremos una funcion que haga correr el timer en base
al submit del usuario en el form.
    le agregamos un eventListener al form, el hace esto
sin seleccionar el objeto (lo hace asi no pq haya que
hacerlo así, sino para mostrar otra manera de hacerlo). 
    Esto es posible porque los elementos form y input tienen
 un atributo name.

    Cuando corre la funcion la pagina no se debe actualizar.
    Guardamos los minutos que hace input el usuario
    en una variable.
    Queremos que el input vuelva a su estado original 
despues de haber guardado la informacion en la variable
(no es un if).
    Pasamos la primera funcion pasando los minutos * 60
    (pq la primera funcion toma segundos)
*/