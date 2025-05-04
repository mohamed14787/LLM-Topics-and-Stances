// src/utils/formattedDate.js
// This function is used on the Home Page to display a formatted date.
export default function getFormattedDate() {
  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return currentDate.toLocaleDateString("en-US", options);
}
