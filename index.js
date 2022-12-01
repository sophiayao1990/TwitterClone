import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

const tweetInput = document.getElementById("tweet-input");

document.addEventListener("click", (e) => {
  if (e.target.dataset.likes) {
    handleLikeClick(e.target.dataset.likes);
  } else if (e.target.dataset.retweets) {
    handleRetweetClick(e.target.dataset.retweets);
  } else if (e.target.dataset.replies) {
    handleReplyClick(e.target.dataset.replies);
  } else if (tweetInput.value && e.target.id === "tweet-btn") {
    handleTweetBtnClick();
  }
});

const handleLikeClick = (tweetId) => {
  const matchLikeObj = tweetsData.filter((tweet) => tweet.uuid === tweetId)[0];
  if (matchLikeObj.isLiked) {
    matchLikeObj.likes--;
  } else {
    matchLikeObj.likes++;
  }
  matchLikeObj.isLiked = !matchLikeObj.isLiked;
  render();
};

const handleRetweetClick = (tweetId) => {
  const matchRetweetObj = tweetsData.filter(
    (tweet) => tweet.uuid === tweetId
  )[0];
  if (matchRetweetObj.isRetweeted) {
    matchRetweetObj.retweets--;
  } else {
    matchRetweetObj.retweets++;
  }
  matchRetweetObj.isRetweeted = !matchRetweetObj.isRetweeted;
  render();
};

const handleReplyClick = (tweetId) => {
  document.getElementById(`replies-${tweetId}`).classList.toggle("hidden");
};

const handleTweetBtnClick = () => {
  tweetsData.unshift({
    handle: `@Jingfei💎`,
    profilePic: `images/avatar.jpg`,
    likes: 0,
    retweets: 0,
    tweetText: `${tweetInput.value}`,
    replies: [],
    isLiked: false,
    isRetweeted: false,
    uuid: uuidv4(),
  });
  render();
  tweetInput.value = "";
};

const getHtml = () => {
  let feedHtml = "";

  tweetsData.forEach(function (tweet) {
    let replyHtml = "";
    tweet.replies.forEach(function (reply) {
      replyHtml += `
        <div class="tweet-reply">
            <img src="${reply.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${reply.handle}</p>
                    <p class="tweet-text">${reply.tweetText}</p>
                </div>
        </div>`;
    });

    feedHtml += `
    <div class="tweet-container">
        <div class='tweet'>
            <img src="${tweet.profilePic}" alt="" class="profile-pic">
            <div class='tweet-content'>
                <p class="handle">${tweet.handle}</p>
                <p class="tweet-text">${tweet.tweetText}</p>
                <div class="tweet-details">
                    <span class="tweet-detail" >
                        <i class="fa-solid fa-comment-dots" data-replies='${
                          tweet.uuid
                        }'></i>
                        ${tweet.replies.length}
                    </span>
                    <span class="tweet-detail" >
                        <i class="fa-solid fa-heart ${
                          tweet.isLiked ? "liked" : ""
                        }" data-likes='${tweet.uuid}'></i>
                        ${tweet.likes}
                    </span>
                    <span class="tweet-detail" >
                        <i class="fa-solid fa-retweet ${
                          tweet.isRetweeted ? "retweeted" : ""
                        }" data-retweets = '${tweet.uuid}'></i>
                        ${tweet.retweets}
                    </span>
                </div>
            </div>
        </div> 
        <div id="replies-${tweet.uuid}" class='hidden'>
        ${replyHtml}
        </div> 
    </div>`;
  });
  return feedHtml;
};

const render = () => {
  document.getElementById("feed").innerHTML = getHtml();
};
render();
