const form = document.getElementById("birthdayForm");
const dayInput = document.getElementById("birthDay");
const monthInput = document.getElementById("birthMonth");
const result = document.getElementById("result");

function daysUntilNextBirthday(day, month) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let year = today.getFullYear();
  let birthday = new Date(year, month - 1, day);

  while (
    birthday.getDate() !== day ||
    birthday.getMonth() !== month - 1 ||
    birthday < today
  ) {
    year += 1;
    birthday = new Date(year, month - 1, day);
  }

  const remainingMilliseconds = birthday - today;
  return Math.round(remainingMilliseconds / (1000 * 60 * 60 * 24));
}

function isValidBirthDate(day, month) {
  const monthLengths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  return day <= monthLengths[month - 1];
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const day = Number(dayInput.value);
  const month = Number(monthInput.value);

  if (
    !Number.isInteger(day) ||
    day < 1 ||
    day > 31 ||
    !Number.isInteger(month) ||
    month < 1 ||
    month > 12 ||
    !isValidBirthDate(day, month)
  ) {
    result.textContent = "Please enter a valid day and month.";
    result.className = "result error";
    return;
  }

  const remainingDays = daysUntilNextBirthday(day, month);
  result.textContent =
    remainingDays === 0
      ? "Happy Birthday!"
      : `Your next birthday is in ${remainingDays} days.`;
  result.className = "result success";
});
