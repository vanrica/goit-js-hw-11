import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  input: document.querySelector("#datetime-picker"),
  startBtn: document.querySelector("[data-start]"),
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
};

// Safety: if markup is wrong, fail loudly instead of silently “not working”
if (
  !refs.input ||
  !refs.startBtn ||
  !refs.days ||
  !refs.hours ||
  !refs.minutes ||
  !refs.seconds
) {
  throw new Error("Timer markup missing. Check id/data-* attributes in 1-timer.html");
}

let userSelectedDate = null;
let timerId = null;

// Start disabled on first load
refs.startBtn.disabled = true;

// Prevent manual typing (avoids invalid strings like "dfdf")
refs.input.setAttribute("readonly", "readonly");

flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    // User closed without selecting / invalid input
    if (!selectedDates.length) {
      userSelectedDate = null;
      refs.startBtn.disabled = true;
      return;
    }

    const picked = selectedDates[0];
    const now = new Date();

    if (picked.getTime() <= now.getTime()) {
      userSelectedDate = null;
      refs.startBtn.disabled = true;

      iziToast.error({
        message: "Please choose a date in the future",
        position: "topRight",
      });

      return;
    }

    userSelectedDate = picked;
    refs.startBtn.disabled = false;
  },
});

refs.startBtn.addEventListener("click", onStart);

function onStart() {
  if (!userSelectedDate) return;

  refs.startBtn.disabled = true;
  refs.input.disabled = true;

  // Update immediately so user sees countdown right away
  tick();

  timerId = setInterval(tick, 1000);
}

function tick() {
  const diff = userSelectedDate.getTime() - Date.now();

  if (diff <= 0) {
    clearInterval(timerId);
    timerId = null;

    renderTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    // After stop: input active again, Start remains disabled until new valid date chosen
    refs.input.disabled = false;
    refs.startBtn.disabled = true;
    userSelectedDate = null;

    return;
  }

  renderTime(convertMs(diff));
}

function renderTime({ days, hours, minutes, seconds }) {
  // Days can be more than 2 digits → no padding
  refs.days.textContent = String(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

