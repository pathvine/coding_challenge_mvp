/* -------------------------------------------------------------------------- */
// This module contains all the routes for this app.
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
// Begin: Define all the routes for this app.
const routes = new Map ([
        // HTML
        ['/', './core/frontend/views/index.html'],

        // Javascript
        ['/submit.js', './core/frontend/helpers/submit.js'],

        // Json
        ['/reviews', './resources/reviews/reviews.json'],

        // Grahpics
        ['/graphics/yellowstar.svg', './resources/assets/svg/yellowstar.svg'],
        ['/graphics/graystar.svg', './resources/assets/svg/graystar.svg'],

        // CSS
        ['/public/stylesheets/fonts.css', './core/frontend/stylesheets/fonts.css'],
        ['/public/stylesheets/variables.css', './core/frontend/stylesheets/variables.css'],
        ['/public/stylesheets/form.css', './core/frontend/stylesheets/form.css'],
        ['/public/stylesheets/container.css', './core/frontend/stylesheets/container.css']
      ]),
      notFoundRoute = './core/frontend/views/not-found.html';
// End: Define all the routes for this app.
/* -------------------------------------------------------------------------- */

// Export the routes.
module.exports = {
  routes: routes,
  notFoundRoute: notFoundRoute
};
