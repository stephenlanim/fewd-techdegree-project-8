/* ======================================
    Employee Directory Filter
   ====================================== */

const $filter = $('#filter');
const $profile = $('.staff-profile');

// Begin filter after each typed character in input
$filter.on('keyup', function () {

  // For each staff profile
  $profile.each( function () {
    const $userName = $(this).find('.username').text().toLowerCase();
    const $employeeName = $(this).find('.name').text().toLowerCase();
    const $userInput = $filter.val().toLowerCase();

    // if employee's name or username matches user's filter input
    if ($employeeName.includes($userInput) || $userName.includes($userInput)) {
    // show profile
    $(this).show();
    }
    // else hide profile
    else {
      $(this).hide();
    }
  });
});
