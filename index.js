import { tweetsData } from "./data.js";

const tweetInput = document.getElementById("tweet-input");

const handleTweetBtn = () => {
  console.log(tweetInput.value);
};

document.getElementById("tweet-btn").addEventListener("click", handleTweetBtn);

const getHtml = () => {
  let feedHtml = "";
  tweetsData.forEach(
    (tweet) =>
      (feedHtml += `
    <div class="tweet">
            <img src="${tweet.profilePic}" alt="" class="profile-pic">
            <div class='tweet-content'>
                <p class="handle">${tweet.handle}</p>
                <p class="tweet-text">${tweet.tweetText}</p>
                <div class="tweet-details">
                    <span class="tweet-detail">
                        <i class="fa-solid fa-comment-dots"></i>
                        ${tweet.replies.length}
                    </span>
                    <span class="tweet-detail">
                        <i class="fa-solid fa-heart"></i>
                        ${tweet.likes}
                    </span>
                    <span class="tweet-detail">
                        <i class="fa-solid fa-retweet"></i>
                        ${tweet.retweets}
                    </span>
                </div>
            </div>
        </div>`)
  );
  return feedHtml;
};

const render = () => {
  document.getElementById("feed").innerHTML = getHtml();
};
render();
