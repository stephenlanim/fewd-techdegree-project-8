/* ======================================
    Fetch API
   ====================================== */
 /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 These scripts are tested and working scripts for using the Fetch API native to modern browsers.

 When you need to fetch something, call the fetchData() function and pass in the URL.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// Function to return JSON-parsed data (as Promise) to eliminate step in future fetches
function fetchData(url) {
 return fetch(url)
        // Check status of fetch response
        .then(checkStatus)
        // Parse response into JSON
        .then(response => response.json())
        // Catch any errors and log them to the console
        .catch((error) => console.log('Looks like there was a problem:', error));
}

// Function to check fetch response
function checkStatus(response) {
  // If response status is OK...
  if (response.ok) {
    // return the goodies
    return Promise.resolve(response);
  }
  // Else, if things are not OK...
  else {
    // tell us what happened
    return Promise.reject(new Error(response.statusText));
  }
}
