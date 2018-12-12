/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$('#document').ready(function(e) {

  // Fake data taken from tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];


  function createTweetElement(tweet) {
    const $tweet = $("<article>").addClass("tweet");
    const $header = $("<header>");
    const { user: { avatars: { small }, name, handle }, content } = tweet;

    //header
    const $headerimg = $('<img id="dynamic">');
    $headerimg.attr('src',  small);
    const $headerh2 = $("<h2>").text(name);
    const $headerh3 = $("<h3>").text(handle);

    $header.append($headerimg);
    $header.append($headerh2);
    $header.append($headerh3);
    $tweet.append($header);

    //body
    const $body = $("<p>").text(content.text);
    $tweet.append($body);

    //footer
    const date = moment(tweet["created_at"]).fromNow();
    const $footer = $("<footer>").text(date);

    // maybe use icons (ex: fontawesome)
    const $footerIMG1 = $('<img src="/images/tweet-icons/heart.png" id="heart">');
    const $footerIMG2 = $('<img src="/images/tweet-icons/refresh.png" id="refresh">');
    const $footerIMG3 = $('<img src="/images/tweet-icons/flag.png" id="flag">');

    // look into jquery object passed to single append (ie: mimic array)
    // multiple appends start to get hectic
    $footer.append($footerIMG1);
    $footer.append($footerIMG2);
    $footer.append($footerIMG3);
    $tweet.append($footer);

    return $tweet;
  }

  function renderTweets(tweets) {
    const $tweets = [];
    for (let tweet of tweets) {
      $tweets.push(createTweetElement(tweet));
    }
    $("#tweet-container").append($tweets);
  };

  // setInterval(createTweetElement, 2000);

  renderTweets(data);


});
