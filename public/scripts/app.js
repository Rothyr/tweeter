$(document).ready(function(event) {
  function loadTweets(){
    $.ajax({
      url: '/tweets',
      method:'GET',
    })
    .then(renderTweets);
  }

  // CREATES TWEET CONTAINER DYNAMICALLY - HEADER, BODY, FOOTER //
  function createTweetElement(tweet) {
    const $tweet = $("<article>").addClass("tweet");
    const $header = $("<header>");
    const { user: { avatars: { small }, name, handle }, content } = tweet;

    // HEADER //
    const $headerimg = $('<img id="dynamic">');
    $headerimg.attr('src',  small);
    const $headerh2 = $("<h2>").text(name);
    const $headerh3 = $("<h3>").text(handle);
    $header.append($headerimg);
    $header.append($headerh2);
    $header.append($headerh3);
    $tweet.append($header);

    // BODY //
    const $body = $("<p>").text(content.text);
    $tweet.append($body);

    // FOOTER //
    const date = moment(tweet["created_at"]).fromNow();
    const $footer = $("<footer>").text(date);
    const $footerIcon1 = $("<i>").addClass("icon fas fa-flag");
    const $footerIcon2 = $("<i>").addClass("icon fas fa-retweet");
    const $footerIcon3 = $("<i>").addClass("icon fas fa-heart");
    $footer.append($footerIcon1);
    $footer.append($footerIcon2);
    $footer.append($footerIcon3);
    $tweet.append($footer);

    return $tweet;
  };

  function renderTweets(tweets) {
    const $tweets = $("#tweet-container");
    for (let tweet of tweets) {
      $tweets.prepend(createTweetElement(tweet));
    }
    return $tweets;
  };

  var $form = $('#tweetSubmitter').submit(function(event){
    event.preventDefault();
    const $textLength = $(".messageText").val().length;
    if ($textLength === 0 || $(".messageText").val() === " ") {
      $(".error").text("Please enter a valid Tweet").slideDown();
      return;
    } else if ($textLength > 140) {
      $(".error").text("Please enter less than 140 characters").slideDown();
      return;
    } else {
      $.post('/tweets', $form.serialize())
      .then(function () {
        loadTweets();
        $('#tweetSubmitter').get(0).reset();
        $('.error').hide();
        $('.counter').text("140");
      });
    }
  });

  $("#Compose").click(function() {
    $(".new-tweet").toggle("slow");
    $(".messageText").focus();
  });

  loadTweets();
  
});
