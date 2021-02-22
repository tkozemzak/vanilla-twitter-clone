const form = document.querySelector(".tweet-form");
const loadingElement = document.querySelector(".loading");
const tweetsElement = document.querySelector(".tweets");
const API_URL = "http://localhost:5000/tweets";

loadingElement.style.display = "none";
//hide loader when data is loaded
const hideLoader = () => {
  form.style.display = "";
  tweetsElement.style.display = "";
  loadingElement.style.display = "none";
};
//hide form and tweets while loading
const hideForm = () => {
  form.style.display = "none";
  tweetsElement.style.display = "none";
  loadingElement.style.display = "";
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const content = formData.get("content");
  //validate submitted data
  if (content.length <= 0) {
    alert("Please enter a name or message");
  } else if (content.length > 280) {
    alert("You have exceeded the character limit");
  } else {
    const tweet = JSON.stringify({
      content: content,
    });
    //if validated, then POST new tweet
    fetch(API_URL, {
      method: "POST",
      body: tweet,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => {
        //hide form while sending tweet to db
        hideForm();
        if (res.status == 200) {
          //delay until db has completed
          setTimeout(hideLoader, 2000);
          form.reset();
          return res.json();
        } else {
          alert("An error occurred");
          setTimeout(hideLoader, 4000);
        }
      })
      .then((tweet) => {
        //add the new tweet to the list of tweets
        addNewestTweet(tweet);
      });
  }
});
//fetch all tweets from DB
const listAllTweets = () => {
  fetch(API_URL)
    .then((res) => {
      return res.json();
    })
    .then((tweets) => {
      return (
        tweets
          //sort tweets by creation date - todo: add sorting feature to sort by new/old/etc
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          //iterate through tweets and create an HTML element for each one
          .forEach((tweet) => {
            const div = document.createElement("div");
            div.classList.add("single-tweet");
            const content = document.createElement("p");
            content.textContent = tweet.content;
            const date = document.createElement("p");
            date.textContent = tweet.created_at;

            div.appendChild(content);
            div.appendChild(date);
            tweetsElement.appendChild(div);
          })
      );
    });
};
//fetch all tweets from DB upon page load
listAllTweets();

const addNewestTweet = (tweet) => {
  const div = document.createElement("div");
  div.classList.add("single-tweet");

  const content = document.createElement("p");
  content.textContent = tweet.content;
  const date = document.createElement("p");
  date.textContent = tweet.created_at;

  div.appendChild(content);
  div.appendChild(date);
  tweetsElement.prepend(div);
};
