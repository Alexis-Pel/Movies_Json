process.argv.shift();
process.argv.shift();
var moviesTab = require("./movies.json");

const fs = require("fs");
data = fs.readFileSync("./movies.json", "utf8");
console.log(data);

function search_args() {
  if (process.argv[0] == "-action") {
    if (process.argv[1] == "transform") {
      console.log(JSON.stringify(data));
    }
  } else {
    console.log("Erreur, veuillez réessayer");
  }
}

function date() {
  if (process.argv[2] == "./movies.json")
    console.log(realease_date.getFullYear);
}

search_args();
