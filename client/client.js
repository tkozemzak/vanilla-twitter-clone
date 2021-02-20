const form = document.querySelector(".tweet-form");
const loadingElement = document.querySelector(".loading");
const API_URL = "http://localhost:5000/tweets";

loadingElement.style.display = "none";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name");
  const content = formData.get("content");

  if (name.length <= 0 || content.length <= 0) {
    alert("Please enter a name or message");
  } else if (name.length > 20 || content.length > 280) {
    alert("You have exceeded the character limit");
  } else {
    const tweet = JSON.stringify({
      name: name,
      content: content,
    });
    fetch(API_URL, {
      method: "POST",
      body: tweet,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }).then((res) => {});

    form.style.display = "none";
    loadingElement.style.display = "";

    function swapDisplay() {
      form.style.display = "";
      loadingElement.style.display = "none";
    }
    setTimeout(swapDisplay, 2000);
  }
});
