const form = document.querySelector(".tweet-form");
const loadingElement = document.querySelector(".loading");
const API_URL = "http://localhost:5000";

loadingElement.style.display = "none";

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name");
  const content = formData.get("content");

  const tweet = {
    name,
    content,
  };
  console.log("tweet", tweet);
  await fetch(`${API_URL}/tweets`, {
    method: "POST",
    body: tweet,
    header: {
      "content-type": "application/json",
    },
  });

  form.style.display = "none";
  loadingElement.style.display = "";

  function swapDisplay() {
    form.style.display = "";
    loadingElement.style.display = "none";
  }
  setTimeout(swapDisplay, 2000);
});
