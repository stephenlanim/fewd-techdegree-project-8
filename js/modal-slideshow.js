/* ======================================
    Modal & Slideshow
   ====================================== */

   // ============================================
   //   JavaScript Modal Scripts
   // ============================================

   /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   These scripts can be used for any page that uses JavaScript modals.
   Use this document in conjunction with the stylesheet js-modal.css.

   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

   /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   HTML Object Requirements Per Modal

   <!-- Any Parent Container for Set of Modal Objects -->
   <div>

     <!--  Modal Trigger -->
     <!-- - If trigger is a simple button -  -->
     <button class="modal-trigger">Open [Object Name]</button>
     <!-- - OR if trigger is a video screenshot - -->
     <button class="modal-trigger vid-modal-trigger text-center"><img src="[image URL]" alt=""></button>

     <!-- Entire Modal Overlay (w/ transparent background) -->
     <div class="modal-overlay">

       <!-- Container Housing Modal Content (white background) -->
       <div class="modal-content-window">

         <!-- Header section for modal content -->
         <div class="modal-header">
           <!-- Close Button -->
           <button class="close-btn">&#10006; Close</button>
           <!-- Modal Title -->
           <h4 class="modal-title">[Project Title]</h4>
         </div>

         <!-- Embedded Object -->
         <iframe allowfullscreen frameborder=0 src="[URL for embedded video, calendar, form, web page, etc.]"></iframe>

       </div> <!-- End of .modal-content-window -->
     </div> <!-- End of .modal-overlay -->

   </div> <!-- End of modal set -->

   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


   // -------------------------------
   //   Variables
   // -------------------------------

   // Get any modal trigger button
   const $modalTrigger = $(".modal-trigger");

   // Get any modal overlay
   const $modalDiv = $("div.modal-overlay");

   // Get modal content window
   const $modalContent = $("div.modal-content-window");

   // Get modal close button
   const $modalCloseBtn = $(".modal-content-window .close-btn");

   // -------------------------------
   //   Modal by Index in DOM
   // -------------------------------

   /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   09-18-2018: These scripts select and manipulate modal objects by their index number/instance in the DOM. So, unlike the DOM traversal scripts I made a few months ago, these ones do not require that the modal-trigger and modal-overlay content be placed in the same precise manner. They just need to be in the same chronological order to match up the index numbers.
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

   function modalByIndex() {
     // Function for when user clicks modal trigger button
     $($modalTrigger).click(function(e){

       // Loop through all modal divs
       for (let i = 0; i < $modalDiv.length; i++) {
         // If the index of the clicked modal trigger matches the current modal div in the loop
         if ($modalTrigger.index(e.target) === i) {

           // Open the modal corresponding to the clicked trigger
           $modalDiv.eq(i).show();

         } // end of if statement

       } // end of for loop

     });

     // Function for when user clicks close button
     $modalCloseBtn.click(function(e){

       // Loop through all modal divs
       for (let i = 0; i < $modalDiv.length; i++) {
         // If the index of the clicked modal close button matches the current modal div in the loop
         if ($modalCloseBtn.index(this) === i) {
           // Note: I used "this" here to induce event bubbling on the "x" inside the close button.

           // Close the corresponding modal overlay
           $modalDiv.eq(i).toggle('scale', 300);

           // Stop video by replacing src link with same link
           $(this).parent().find("iframe").attr("src", $(this).parent().find("iframe").attr("src"));

         } // end of if statement

       } // end of for loop

     });

     // Function for when user clicks the area outside the modal content window (i.e. the modal overlay)
     $($modalDiv).click(function(e){

       // If the modal div itself is the target...
       if ($modalDiv.is(e.target)) {
         // Note: I used "e.target" here to prevent event bubbling on the $modalDiv's children.

         // Close the clicked modal overlay
         $(this).toggle('scale', 300);

         // Stop video by replacing src link with same link
         $(this).parent().find("iframe").attr("src", $(this).parent().find("iframe").attr("src"));
       }

     });

   }

   modalByIndex();

   // -------------------------------
   //   Modal Slide Show
   // -------------------------------

   /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   These scripts grab the modals in sequence and make them appear as a slideshow when a "previous" and "next" button are clicked.

   Because each modal is in a separate container, the animation for the slideshow does not have the same appearance as a slideshow/carousel in which all elements are in the same container. So I had to make the sliding in and out of the elements overlap a bit using the jQuery delay() method.

   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

   const $previousBtn = $('.view-previous');
   const $nextBtn = $('.view-next');

   function modalSlideShow() {

     // When "Previous" button is clicked...
     $previousBtn.on('click', function (e) {
       // Loop through the modal-overlays
       $modalDiv.each( (i) => {
         // If the index of the clicked button matches the current modal-overlay...
         if ($previousBtn.index(this) === i) {
           // Note: I used "this" here and in the "next" button click function to induce event bubbling on the chevron inside the button.

           // Get current modal-overlay and slide it out to the right after a short delay
           $modalDiv.eq(i).delay(050).toggle('slide', {direction:'right', easing:'swing'}, 600);

           // Show the PREVIOUS modal-overlay in the sequence
           $modalDiv.eq(i - 1).show();

         } // end of if statement

       }); // end of each() loop

     }); // end of click function

     // When the "Next" button is clicked...
     $nextBtn.on('click', function (e) {

       // Loop through the modal-overlays
       $modalDiv.each( (i) => {

         // If the clicked button is the last in the sequence...
         if ($nextBtn.index(this) === $nextBtn.length -1) {
           // Note: I had to subtract 1 because the .length property counts differently from index property.

           // Get the last modal-overlay and slide it out to the left after a short delay
           $modalDiv.eq(this).delay(050).toggle('slide', {direction:'left', easing:'swing'}, 600);

           // Show the first modal-overlay in the sequence
           $modalDiv.eq(0).show();

         } // end of if statement

         // else if the index of the clicked button matches the current modal-overlay...
         if ($nextBtn.index(this) === i) {

           // Get current modal-overlay and slide it out to the left
           $modalDiv.eq(i).delay(050).toggle('slide', {direction:'left', easing:'swing'}, 600);

           // Show the NEXT modal-overlay in the sequence
           $modalDiv.eq(i + 1).show();

         } // end of else if statement

       }); // end of each() loop

     }); // end of click function
   }

   modalSlideShow();
