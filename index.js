import { tweetsData } from "./data.js";

const tweetInput = document.getElementById("tweet-input");

const handleTweetBtn = () => {
  console.log(tweetInput.value);
};
document.addEventListener("click", (e) => {
  if (e.target.dataset.likes) {
    handleLikeClick(e.target.dataset.likes);
  } else if (e.target.dataset.retweets) {
    handleRetweetClick(e.target.dataset.retweets);
  } else if (e.target.dataset.replies) {
    handleReplyClick(e.target.dataset.replies);
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
  console.log(tweetId);
};

document.getElementById("tweet-btn").addEventListener("click", handleTweetBtn);

const getHtml = () => {
  let feedHtml = "";
  let replyHtml = "";

  tweetsData.forEach(function (tweet) {
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
        <div id="replies-${tweet.uuid}">
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
