import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';



const btnEl = document.querySelector('button[type = "button"]');
const daysItem = document.querySelector('span[data-days]');
const hoursItem = document.querySelector('span[data-hours]');
const minutesItem = document.querySelector('span[data-minutes]');
const secondsItem = document.querySelector('span[data-seconds]');



let timeLeft;
let chooseDate;
let timer;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDate) {
    if (selectedDate[0] <= new Date()) {
      btnEl.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btnEl.disabled = false;
      chooseDate = selectedDate[0].getTime();
      timeLeft = chooseDate - new Date();
      Notiflix.Notify.success('Counting down');
    }
    
  },
};

flatpickr('#datetime-picker', options);

function convertMs(timeLeft) {
  
    const second = 1000;
    
    const minute = second * 60;
    
    const hour = minute * 60;
    
    const day = hour * 24;
    
    const days = Math.floor(timeLeft / day);
    
    const hours = Math.floor((timeLeft % day) / hour);
    
    const minutes = Math.floor(((timeLeft % day) % hour) / minute);
    
    const seconds = Math.floor((((timeLeft % day) % hour) % minute) / second);
    
  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
  const formattedValue = value.toString().padStart(2, '0');
  return formattedValue;
}

function getCounter() {
  timer = setInterval(() => {
    timeLeft = chooseDate - new Date().getTime();
    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    daysItem.innerHTML = addLeadingZero(days);
    hoursItem.innerHTML = addLeadingZero(hours);
    minutesItem.innerHTML = addLeadingZero(minutes);
    secondsItem.innerHTML = addLeadingZero(seconds);

    if (timeLeft < 0) {
      clearInterval(timer);
      daysItem.innerHTML = '00';
      hoursItem.innerHTML = '00';
      minutesItem.innerHTML = '00';
      secondsItem.innerHTML = '00';
    }
  }, 1000);
}
btnEl.addEventListener('click', getCounter);

