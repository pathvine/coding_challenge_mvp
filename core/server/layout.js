let header, footer;

header = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'>";
header += "<link rel='stylesheet' href='/public/stylesheets/variables.css'>";
header += "<link rel='stylesheet' href='/public/stylesheets/fonts.css'>";
header += "<link rel='stylesheet' href='/public/stylesheets/form.css'>";
header += "<link rel='stylesheet' href='/public/stylesheets/container.css'>";
header += "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js'></script>";
header += "<script src='/submit.js'></script>";
header += "<title>Coding Challenge MVP</title></head><body>";

footer = "</body></html>";

module.exports = {
  header: header,
  footer: footer
};
