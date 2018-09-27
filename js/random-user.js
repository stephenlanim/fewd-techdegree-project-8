/* ======================================
    Random User Generator API
   ====================================== */


// Fetch JSON data for 12 users from Random User API
fetchData('https://randomuser.me/api/?results=12')
//
  .then(data => {
    console.log(data);
  });

// Function to insert random user data into directory-cards and modal-cards
function insertRandomUsers(jsonObject) {
  //For each random user...


}

// Get directory-card targets
const $dcImage = $('.directory-card .avatar');
const $dcName = $('.directory-card .name');
const $dcEmail = $('.directory-card .email');
const $dcCity = $('.directory-card .city');

// Get modal-card targets
const $mcImage = $('.modal-card .avatar');
const $mcName = $('.modal-card .name');
const $mcEmail = $('.modal-card .email');
const $mcCity = $('.modal-card .city');
const $mcPhone = $('.modal-card .phone');
const $mcAddress = $('.modal-card .address');
const $mcBirthday = $('.modal-card .birthday');

// Function for inserting basic employee info
  // variables to pass in: image, name, email, city
  // ... I may also need to pass in the object properties from the JSON object, perhaps as "sources".
function insertBasicInfo (sourceImg, sourceEmail, sourceCity, imageTarget, emailTarget, cityTarget) {

  // Insert employee image
  imageTarget.
  // Insert First and Name

  // Insert email

  // Insert city

}

// Function for populating modal-card

  // Insert basic info

  // Insert email into link w/ mailto

  // Insert cell number

  // Insert parsed phone number into link w/ tel

  // Insert address

  // Insert birthday

// Function to capitalize employee first and last name

// Function for parsing phone number
