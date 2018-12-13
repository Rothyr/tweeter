/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$('#document').ready(function(event) {

//   function loadTweets () {
//   var $button = $('tweet-container');
//   $button.on('click', function () {
//     console.log('Button clicked, performing AJAX call...');
//     $.ajax('"/tweets', { method: 'GET' })
//     .then(function (renderTweets) {
//       console.log('Success: ', renderTweets);
//       $button.replaceWith(renderTweets);
//     });
//   });
// }

function loadTweets(){
    //load the tweets from the route /tweets - GET

    $.ajax({
      url: '/tweets',
      method:'GET',
      // success:function(result){
      //   console.log("After ajax call");
      //   console.log(result);
      //   renderTweets(result);
      // },
      // error: function(error){
      //   console.log("there was an error");
      //   console.log(error);
      // }
    })
    .then(renderTweets);
  }

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

    // NOTE TO SELF: LOOK IN TO USING ICONS (I.E. FONTAWESOME)
    const $footerIMG1 = $('<img src="/images/tweet-icons/heart.png" id="heart">');
    const $footerIMG2 = $('<img src="/images/tweet-icons/refresh.png" id="refresh">');
    const $footerIMG3 = $('<img src="/images/tweet-icons/flag.png" id="flag">');

    // NOTE TO SELF: look into jquery object passed to single append (ie: mimic array)
    $footer.append($footerIMG1);
    $footer.append($footerIMG2);
    $footer.append($footerIMG3);
    $tweet.append($footer);

    return $tweet;
  }

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
      });
    }
  })

  $("#Compose").click(function() {
    $(".new-tweet").toggle("slow");
    $(".messageText").focus();
  });

  // * TEST CODE TO MIMIC RELOAD * //
  // setTimeout(() => {
  //   renderTweets(data)
  // }, 1000);

  //renderTweets(data)
  loadTweets();

});
