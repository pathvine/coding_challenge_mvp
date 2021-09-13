$(document).ready (function () {
  ;(function refreshStarsContainer () {
    // Empty the #starsContainer first.
    $('#starsContainer').empty ();

    // Append new set of stars to the #starsContainer.
    $('#starsContainer').append (function () {
      let string = "";

      for (let s = 1; s <= 5; s++) {
        string += "<img id='star" + s + "' rating='" + s + "' class='update-star' src='/graphics/" +
                  ($('#stars').val () >= s ? "yellowstar" : "graystar") +
                  ".svg' width='25' height='25'>";
      }

      return string;
    });
    
    // Set how many stars to show on the Add review form upon the start of the page.
    updateStars ($('#stars').val ());

    // Update the average rating upon the start of the page.
    $.ajax ({
      url: "/reviews",
      method: "GET",
      contentType: "application/json",
      success: function (res) {
        // Update the list of reviews and the average rating.
        if (res.avgRating) { updateAvgRating (res.avgRating); }
        if (res.reviews) { updateReviews (res.reviews); }
      }
    });
  }) ();

  $('#reviewForm').on ('submit', function () {
    event.preventDefault ();

    // POST request via ajax.
    $.ajax ({
      url: "/",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify ({ rating: Number ($('#stars').val ()), review: $('#review').val () }),
      success: function (res) {
        // Update the list of reviews and the average rating.
        if (res.avgRating) { updateAvgRating (res.avgRating); }
        if (res.reviews) { updateReviews (res.reviews); }

        // Clear the input values.
        $('#review').val ('');
        $('#stars').val (3);

        // Update the review stars to default state.
        updateStars ($('#stars').val ());
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

  // Show/hide the div#addReviewFormContainer.
  $('#addReview').on ('click', function () {
    let currentFormContainerState = $('#addReviewFormContainer').attr ('style');

    $('#addReviewFormContainer').attr ('style', (currentFormContainerState === "display: none") ? "display: visible" : "display: none");
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

// Function to update the list of existing reviews.
function updateReviews (reviews) {
  $('#reviewsContainer').empty ();
  $('#reviewsContainer').append (function () {
    // Html string to be inserted into the #reviewsContainer div.
    let reviewHtml = "";

    for (let r = reviews.length - 1; r >= 0; r--) {
      for (let s = 0; s < 5; s++) {
        reviewHtml += "<img src='/graphics/" + ((reviews[r].rating > s) ? "yellowstar.svg" : "graystar.svg") + "' width='25' height='25'>";
      }

      reviewHtml += "&nbsp;&nbsp;";
      reviewHtml += "<span class='bold-font'>" + reviews[r].rating + "</span>";
      reviewHtml += "<span class='gray-font'>,&nbsp;" + reviews[r].review + "</span><br/>";
    }

    return reviewHtml;
  });
}

// Function to update the average rating of reviews.
function updateAvgRating (avgRating) {
  $('#avgRatingCell').empty ();
  $('#avgRatingCell').append (function () {
    let avgRatingCellHtml = "<span id='averageRating' class='rating'>" + avgRating + "</span>&nbsp;&nbsp";

    for (let s = 0; s < 5; s++) {
      avgRatingCellHtml += "<img src='/graphics/" + ((avgRating > s) ? "yellowstar.svg" : "graystar.svg") + "' width='25' height='25'>";
    }

    return avgRatingCellHtml;
  });
}
