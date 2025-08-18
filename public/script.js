const apiURL = "https://script.google.com/macros/s/AKfycbz8wlkGlx2XeWTfZ5wXEhRFsO_ePPDrfUtR1fiI90IOLdXbYFN9a-KWSpDy_vM1l3BT/exec";

const form = document.getElementById("feedbackForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    if (data[key]) {
      data[key] += ", " + value;
    } else {
      data[key] = value;
    }
  });

  fetch(apiURL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(() => {
      successMsg.style.display = "block";
      form.reset();

      setTimeout(() => {
        successMsg.style.display = "none";
      }, 5000);
    })
    .catch((err) => console.error("Error!", err));
});
