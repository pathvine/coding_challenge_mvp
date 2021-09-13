$(document).ready (function () {
  const refreshStarsContainer = function (numOfStars) {
    // Empty the #starsContainer first.
    $('#starsContainer').empty ();

    // Append new set of stars to the #starsContainer.
    $('#starsContainer').append (function () {
      let string = "";

      for (let s = 1; s <= 5; s++) {
        string += "<img id='star" + s + "' rating='" + s + "' class='update-star' src='/graphics/" +
                  (numOfStars >= s ? "yellowstar" : "graystar") +
                  ".svg' width='25' height='25'>";
      }

      return string;
    });
  };

  refreshStarsContainer ();

  $('#reviewForm').on ('submit', function () {
    event.preventDefault ();

    // Get the value of the text field.
    console.log ($('#review').val ());
    console.log ($('#stars').val ());
    console.log ("yay!");

    $.ajax ({
      url: "/",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify ({ stars: Number ($('#stars').val ()), review: $('#review').val () }),
      success: function (res) {
        console.log (res);
      }
    });
  });

  // Update the number of stars to be lit up when the mouse is over or is moved out of them.
  $('.update-star').on ('mouseover mouseout', function () {
    updateStars ($(this).attr('rating'));
  });

  // Recover the number of stars to be lit up when the mouse is moved out of the starsContainer div.
  $('#starsContainer').on ('mouseout', function () {
    updateStars ($('#stars').val ());
  });

  // Set the number of stars to be lit up when one of the stars is clicked.
  $('.update-star').on ('click', function () {
    // Get the rating attribute of the star, and store it inside the #stars hidden input field.
    $('#stars').val($(this).attr('rating'));

    updateStars ($('#stars').val ());
  });
});

// Function to update how many stars to lit up in the Add review form.
function updateStars (numOfStarsToLitUp) {
  let starId;

  for (let s = 1; s <= 5; s++) {
    starId = "#star" + s;
    $(starId).attr ('src', (numOfStarsToLitUp >= s) ? '/graphics/yellowstar.svg' : '/graphics/graystar.svg');
  }
}
