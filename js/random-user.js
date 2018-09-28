/* ======================================
    Random staff Generator API
   ====================================== */

// Get directory-card targets
let $dcImage;
let $dcName;
let $dcEmail;
let $dcCity;
let $dcUsername;

// Get modal-card targets
let $mcImage;
let $mcName;
let $mcEmail;
let $mcCity;
let $mcPhone;
let $mcAddress;
let $mcBirthday;

// Initialize variables for Fetch data properties
let sourceImage;
let sourceName;
let sourceEmail;
let sourceCity;
let sourcePhone;
let parsedPhone;
let sourceAddress;
let sourceBirthday;
let sourceUsername;

// Note: Initializing variables inside of any functions only made them accessible to that function and not any nested functions, despitethe fact that nested functions should have access to variables from parent functions. The solution was to initialize these variables on a global scope and update their values after the data was fetched.

// Fetch JSON data for 12 staffs from Random staff API
fetchData('https://randomuser.me/api/?results=12&nat=us')
  .then(data => {
    // Loop through the data results
    data.results.map( staff => {
      // Get properties from staff JSON Object
      currentStaff = data.results.indexOf(staff);
      sourceImage = `${staff.picture.large}`;
      sourceName = `${staff.name.first} ${staff.name.last}`;
      sourceEmail = staff.email;
      sourceCity = staff.location.city;
      sourcePhone = staff.phone;
      parsedPhone = `tel:+1${parsePhoneNumber(staff.phone)}`;
      sourceAddress = `${staff.location.street}, ${staff.location.city}, ${staff.location.state} ${staff.location.postcode}`;
      sourceBirthday = formatBirthday(staff.dob.date);
      sourceUsername = staff.login.username;

      // Get directory-card targets
      $dcImage = $('.directory-card .photo').eq(currentStaff);
      $dcName = $('.directory-card .name').eq(currentStaff);
      $dcEmail = $('.directory-card .email').eq(currentStaff);
      $dcCity = $('.directory-card .city').eq(currentStaff);
      $dcUsername = $('.directory-card .username').eq(currentStaff);

      // Get modal-card targets
      $mcImage = $('.modal-card .photo').eq(currentStaff);
      $mcName = $('.modal-card .name').eq(currentStaff);
      $mcEmail = $('.modal-card .email').eq(currentStaff);
      $mcCity = $('.modal-card .city').eq(currentStaff);
      $mcPhone = $('.modal-card .phone').eq(currentStaff);
      $mcAddress = $('.modal-card .address').eq(currentStaff);
      $mcBirthday = $('.modal-card .birthday').eq(currentStaff);

      insertRandomEmployees(staff);
    }); // end of map()
  }) // end of first then()
; // end of fetchData()


// Function to insert random staff data into directory-cards and modal-cards
function insertRandomEmployees(staff) {

  insertUsername();
  insertBasicInfo($dcImage, $dcName, $dcEmail, $dcCity);
  insertModalInfo();

}


// Function to insert employee username
function insertUsername() {
  $dcUsername.text(`${sourceUsername}`);
}


// Function for inserting basic employee info
function insertBasicInfo (imageTarget, nameTarget,  emailTarget, cityTarget) {

  // Insert employee image
  imageTarget.attr('src', `${sourceImage}`);
  // Insert First and Name
  nameTarget.text(`${sourceName}`);
  // Insert email
  emailTarget.text(`${sourceEmail}`);
  // Insert city
  cityTarget.text(`${sourceCity}`);
} // end of insertBasicInfo()


// Function for populating modal-card
function insertModalInfo() {
  // Insert basic info
  insertBasicInfo($mcImage, $mcName, $mcEmail, $mcCity);

  // Insert email into link w/ mailto
  $mcEmail.attr('href', `mailto:${sourceEmail}`);
  // Insert cell number
  $mcPhone.text(`${sourcePhone}`);
  // Insert parsed phone number into link w/ tel
  $mcPhone.attr('href', `${parsedPhone}`);
  // Insert address
  $mcAddress.text(`${sourceAddress}`);
  // Insert birthday
  $mcBirthday.text(`${sourceBirthday}`);
} // end of insertModalInfo()


// Function for parsing phone number
function parsePhoneNumber(phoneString) {
  // Split phone number string into an array of individual string characters
  const splitNum = phoneString.split('');
  // Create array in which to store just numbers/integers from phone number string
  const intArray = [];

  // Return only the characters that are integers
  splitNum.forEach(char => {
    if (Number.isInteger(parseInt(char))) {
      intArray.push(parseInt(char));
    }
  });

  // Return the joined numbers as one long integer
  const parsedNumber = parseInt(intArray.join(''));

  // return new phone number to be added into new array from map()
  return parsedNumber;
} // end of parsePhoneNumber


// Function to rearrange numbers for staff birthday
function formatBirthday(birthday) {
  const year = birthday.substring(0, 4);
  const month = birthday.substring(5, 7);
  const day = birthday.substring(8, 10);

  return `${month}/${day}/${year}`;
}


// 09-27-2018: I only realized in the afternoon, after working on this function for an hour that the CSS property value text-transform: capitalize does what I need this function to do. I may complete this function later for fun.
// Function to capitalize employee data
function capitalize(dataString) {
  // Capitalize the first letter in the data string
  let cappedString = dataString;

  // If first character is not a number...
  if (isNaN(cappedString[0])) {
    cappedString = dataString[0].toUpperCase() + dataString.substring(1);
  }

  // If string does not contain a space...
  if (!cappedString.includes(' ')) {
    //
    return cappedString;
  }
  else {
    // Split word(s) from data into an array of individual characters
    const splitData = cappedString.split('');

    // Loop to find letters to be capitalized
    const multiCap =
      // Loop over split data
      splitData.forEach( char => {
        // If the character before this one is a space
        if (char.index() === ' ') {
          // Capitalize this character
          this.toUpperCase();

        }

      });
      // Join characters back into a string
      cappedString = multiCap.join('');
      return cappedString;

  } // end of else statement
}
