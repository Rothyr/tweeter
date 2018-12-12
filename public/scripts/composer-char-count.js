//*   Composer Character Counter File   *//

$(document).ready(function() {

  $(".messageText").on('input', function() {
    const textLength = $(this).val().length;
    const maxChar = 140;
    const charRemaining = maxChar - textLength;
    const counter = $(this).siblings(".counter");
    const negative = "negativeCounter";
    counter.html(charRemaining);

    if (charRemaining < 0) {
      counter.addClass(negative);
    } else {
      counter.removeClass(negative);
    }
  });
});




