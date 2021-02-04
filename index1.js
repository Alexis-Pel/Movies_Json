rocess.argv.shift();
process.argv.shift();

var moviesTab = require("./movies.json");

function search_args() {
  if (process.argv[0] == "-action") {
    if (process.argv[1] == "transform") {
      for (i = moviesTab; i < moviesTab.length; i++) {
        console.log(moviesTab.title);
      }
    }
  } else {
    console.log("Erreur, veuillez réessayer");
  }
}

function date() {
  if (process.argv[1] == "./movies.json") {
    const date = moviesTab[1].release_date;
    console.log(moviesTab[1].title + " ");
  }
}

search_args();
