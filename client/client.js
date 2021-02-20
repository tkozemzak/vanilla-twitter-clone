const form = document.querySelector(".tweet-form");
const loadingElement = document.querySelector(".loading");
const tweetsElement = document.querySelector(".tweets");
const API_URL = "http://localhost:5000/tweets";

loadingElement.style.display = "none";

const hideLoader = () => {
  form.style.display = "";
  loadingElement.style.display = "none";
};

const hideForm = () => {
  form.style.display = "none";
  loadingElement.style.display = "";
};

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
    })
      .then((res) => {
        hideForm();
        console.log("status", res.status);
        if (res.status == 200) {
          setTimeout(hideLoader, 2000);
          form.reset();
        } else {
          alert("An error occurred");
          setTimeout(hideLoader, 4000);
        }
      })
      .then((createdTweet) => {
        console.log("createdTweet", createdTweet);
      });
  }
});

const listAllTweets = () => {
  fetch(API_URL)
    .then((res) => {
      return res.json();
    })
    .then((tweets) => {
      console.log("tweets:", tweets);
      return tweets.forEach((tweet) => {
        const div = document.createElement("div");
        const header = document.createElement("h3");
        header.textContent = tweet.name;
        const content = document.createElement("p");
        content.textContent = tweet.content;
        const date = document.createElement("p");
        date.textContent = tweet.created_at;

        div.appendChild(header);
        div.appendChild(content);
        div.appendChild(date);
        console.log(tweet.created_at);
        tweetsElement.appendChild(div);
      });
    });
};

listAllTweets();
