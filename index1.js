process.argv.shift();
process.argv.shift();
var output = "./output";

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
  if (process.argv[2] == "./movies.json") {
    for (i = 0; i < moviesTab.length; i++) {
      let titre = moviesTab[i].title;
      let NDate = moviesTab[i].release_date;
      let Année = Math.floor(NDate / 60 / 60 / 24 / 365 + 1970);
      let Ntitre = titre + " (" + Année + ")";
      console.log(Ntitre);
    }
  }
}

search_args();
date();
