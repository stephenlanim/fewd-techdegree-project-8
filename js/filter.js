/* ======================================
    Employee Directory Filter
   ====================================== */
// Scripts modified from "Photo Gallery Search Feature" in FEWD project 5.

   
const $search = $('#search');
const $thumb = $('.thumbnail');

// Begin search after each typed character in input
$search.on('keyup', function () {

  // For each thumbnail
  $thumb.each( function (index, thumbnail) {
    const $caption = $(this).attr('data-title').toLowerCase();
    const $userInput = $search.val().toLowerCase();

    // if photo caption matches search input
    if ($caption.includes($userInput)) {
    // show thumbnail
    $(this).show();
    }
    // else hide thumbnail
    else {
      $(this).hide();
    }
  });
});
