let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const buttons = document.querySelectorAll('.timer__button');
const form = document.querySelector('#custom');
const timeEnd = document.querySelector('.display__end-time');

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayLeft(seconds);
  const end = new Date(then)
  timeEnd.textContent = `Finish : ${end.getHours()}:${end.getMinutes()}`

  countdown = setInterval(function() {
    const timeLeft = Math.round((then - Date.now())/1000);
    //check if < 0
    if ( timeLeft < 0) {
    clearInterval(countdown);
    return;
    }

    // display
    displayLeft(timeLeft);

  }, 1000)
}

function displayLeft(seconds) {
  //const hour = Math.floor(seconds / 3600);
  const min = Math.floor(seconds /60 )
  const sec = seconds % 60;
  console.log(min, sec);
  timerDisplay.textContent = `${displayZero(min)}:${displayZero(sec)}`;
  // add as page title
  document.title = `${displayZero(min)}:${displayZero(sec)}`;
}

function displayZero(number) {
  if (number < 10) {
    return `0${number}`;
  } else {
    return number;
  }
}

function setTime() {
  timer(this.dataset.time);
}

function enterNumb(e) {
  if (e.keyCode == 13) {
    e.preventDefault();
    mins = form[0].value * 60
    timer(mins);
    this.reset();
  }
}

buttons.forEach(button => { button.addEventListener('click', setTime)});
form.addEventListener('keydown', enterNumb)
