const timerdiv = document.querySelector('.timer');
const controls = timerdiv.querySelector('.timer__controls');
const buttons = timerdiv.querySelectorAll('[data-time]');
const timerDisplay = timerdiv.querySelector('.display__time-left')
const endTime = timerdiv.querySelector('.display__end-time');
console.log(timerdiv, controls, buttons);
let countdown;


function timer(seconds) {
clearInterval(countdown);
 const now = Date.now();
 const then = now + seconds * 1000
 displayTimeLeft(seconds);
 displayEndTime(then);
 
 countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    console.log(secondsLeft)
    if(secondsLeft < 0) {
        clearInterval(countdown);
        return;
    }
    displayTimeLeft(secondsLeft);
 }, 1000);
};

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timesStamp) {
 const end = new Date(timesStamp)
 const hour = end.getHours();
 const minutes = end.getMinutes();
 const adjustedHour = hour > 12 ? hour -12 : hour;
 endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}}`;


}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
})