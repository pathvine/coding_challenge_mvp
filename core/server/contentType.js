/* -------------------------------------------------------------------------- */
// This module return the response header's content type based on the request
// file path.
/* -------------------------------------------------------------------------- */
function getContentType (filePath) {
  // Determine the content type based on the filePath. Additional content type
  // and file type association goes to here.
  if (filePath.indexOf (".css") >= 0) { return "text/css"; }
  if (filePath.indexOf (".js") >= 0) { return "text/javascript"; }
  else if (filePath.indexOf (".json") >= 0) { return "application/json"; }
  else if (filePath.indexOf (".svg") >= 0) { return "image/svg+xml"; }
  else { return "text/html"; }
}


// Export the content type.
module.exports = {
  getContentType: getContentType
};
