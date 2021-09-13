function updateReviews (currentReviews, newReview) {
  // Define variables to store the total rating of all reviews. Default to 0.
  let totalRating = 0;

  /* ------------------------------------------------------------------------ */
  // Begin: Perform new review object validation.
  // Review the object structure.
  if (!newReview || !(newReview.review && newReview.rating)) {
    throw new Error ("Invalid review input");
  }

  // Review the object data.
  if (typeof newReview.review !== "string" || (newReview.rating < 1 || newReview.rating > 5)) {
    throw new Error ("Invalid review input");
  }
  // End: Perform new review object validation.
  /* ------------------------------------------------------------------------ */

  /* ------------------------------------------------------------------------ */
  // Begin: Insert the newReview to currentReviews.
  if (currentReviews && Array.isArray (currentReviews.reviews)) {
    // Save the newReview to currentReviews.
    currentReviews.reviews.push (newReview);

    // Calculate the totalRating and avgRating.
    for (let r = 0; r < currentReviews.reviews.length; r++) {
      totalRating += currentReviews.reviews[r].rating;
      // Calculate the avgRating at the last review.
      if (r === (currentReviews.reviews.length - 1)) {
        currentReviews.avgRating = (totalRating / currentReviews.reviews.length).toFixed (2);
      }
    }
  } else {
    // Invalid currentReviews, we will just refresh the currentReviews.
    currentReviews = { reviews: [newReview], avgRating: newReview.rating };
  }
  // Begin: Insert the newReview to currentReviews.
  /* ------------------------------------------------------------------------ */

  return currentReviews;
}

module.exports = {
  updateReviews: updateReviews
};
