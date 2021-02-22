let currentUser;
let loginForm = document.querySelector(".login-form");
let signupForm = document.querySelector(".signup-form");
const API_URL = "http://localhost:5000";

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const email = formData.get("email");
  const password = formData.get("password");

  const userInfo = JSON.stringify({
    email: email,
    password: password,
  });

  fetch(`${API_URL}/login`, {
    method: "POST",
    body: userInfo,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(`User ${result.firstName} ${result.lastName} found`);
      currentUser = result;
      console.log("currentUser", currentUser);
    })
    .catch((error) => {
      alert("Wrong Email or Password");
      console.log("error", error);
    });
  //
});
