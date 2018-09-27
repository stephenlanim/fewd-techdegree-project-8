/* ======================================
    Random User Generator API
   ====================================== */
// $(document).ready(function () {

// // Get directory-card targets
// const $dcImage = $('.directory-card .photo').eq(user);
// const $dcName = $('.directory-card .name').index(user);
// const $dcEmail = $('.directory-card .email').index(user);
// const $dcCity = $('.directory-card .city').index(user);
//
// // Get modal-card targets
// const $mcImage = $('.modal-card .photo').index(user);
// const $mcName = $('.modal-card .name').index(user);
// const $mcEmail = $('.modal-card .email').index(user);
// const $mcCity = $('.modal-card .city').index(user);
// const $mcPhone = $('.modal-card .phone').index(user);
// const $mcAddress = $('.modal-card .address').index(user);
// const $mcBirthday = $('.modal-card .birthday').index(user);

// Note: Initializing variables inside of any functions only made them accessible to that function and not any nested functions, despitethe fact that nested functions should have access to variables from parent functions. The solution was to initialize these variables on a global scope and update their values after the data was fetched.

// Get directory-card targets
let $dcImage;
let $dcName;
let $dcEmail;
let $dcCity;

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

// Fetch JSON data for 12 users from Random User API
fetchData('https://randomuser.me/api/?results=3&nat=us')
//
  .then(data => {


    // console.log(data);
    console.log(data.results);
    // console.log(`${data.results[0].name.first} ${data.results[0].name.last}`);
    // console.log(capitalize(data.results[0].name.first));
    // console.log(capitalize(data.results[0].location.street));
    // console.log(data.results[0].email);
    // insertRandomUsers(data);
    data.results.map( user => {
      // Get properties from user JSON Object
      currentUser = data.results.indexOf(user);
      sourceImage = `${user.picture.large}`;
      sourceName = `${user.name.first} ${user.name.last}`;
      sourceEmail = user.email;
      sourceCity = user.location.city;
      sourcePhone = user.phone;
      parsedPhone = `tel:+1${parsePhoneNumber(user.phone)}`;
      sourceAddress = `${user.location.street}, ${user.location.city}, ${user.location.state} ${user.location.postcode}`;
      sourceBirthday = formatBirthday(user.dob.date);

      // Get directory-card targets
      $dcImage = $('.directory-card .photo').eq(currentUser);
      $dcName = $('.directory-card .name').eq(currentUser);
      $dcEmail = $('.directory-card .email').eq(currentUser);
      $dcCity = $('.directory-card .city').eq(currentUser);

      // Get modal-card targets
      $mcImage = $('.modal-card .photo').eq(currentUser);
      $mcName = $('.modal-card .name').eq(currentUser);
      $mcEmail = $('.modal-card .email').eq(currentUser);
      $mcCity = $('.modal-card .city').eq(currentUser);
      $mcPhone = $('.modal-card .phone').eq(currentUser);
      $mcAddress = $('.modal-card .address').eq(currentUser);
      $mcBirthday = $('.modal-card .birthday').eq(currentUser);

      console.log(data.results);

      insertRandomUsers(user);
    }); // end of map()
  }); // end of first then()

// I need to test if JSON data can be passed down to nested functions, since that will let me know if I need to pass variables into nested functions or not. I'm guessing I don't since I've used "this" or e.target in nested functions before.

// Function to insert random user data into directory-cards and modal-cards
function insertRandomUsers(user) {
  // Get properties from JSON Object
  // let sourceImage = `${data.picture.large}`;
  // let sourceName = `${data.name.first} ${data.name.last}`;
  // let sourceEmail = data.email;
  // let sourceCity = data.location.city;
  // let sourcePhone = data.phone;
  // let parsedPhone = `tel:+1${parsePhoneNumber(data.phone)}`;
  // let sourceAddress = `${data.location.street}, ${data.location.city}, ${data.location.state} ${data.location.postcode}`;
  // let sourceBirthday = data.email;

  //For each random user... (may use map())
  // data.map( user => {
  insertBasicInfo($dcImage, $dcName, $dcEmail, $dcCity);
  insertModalInfo();


  // });

}


// Function for inserting basic employee info
  // variables to pass in: image, name, email, city
  // ... I may also need to pass in the object properties from the JSON object, perhaps as "sources".
function insertBasicInfo (imageTarget, nameTarget,  emailTarget, cityTarget) {
  // Get properties from JSON Object
  // let sourceImage = `${data.picture.large}`;
  // let sourceName = `${data.name.first} ${data.name.last}`;
  // let sourceEmail = data.email;
  // let sourceCity = data.location.city;
  // let sourcePhone = data.phone;
  // let parsedPhone = `tel:+1${parsePhoneNumber(data.phone)}`;
  // let sourceAddress = `${data.location.street}, ${data.location.city}, ${data.location.state} ${data.location.postcode}`;
  // let sourceBirthday = data.email;

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

// Function to rearrange numbers for user birthday
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

// });
