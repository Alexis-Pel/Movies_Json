process.argv.shift();
process.argv.shift();
const fs = require('fs');
const { mkdir } = require('fs/promises');
const request = require('request')
var moviesTab = require("./movies.json");
var output = "./output.json";
var input = "./movies.json";
var download = false;
var save_path = "./images/"

/**
 * Cette fonction démarre la fonction search_args()
 */
function start() {
  write("log.txt", "------------------------------------------------------");
  search_args();
}

/**
 * Cette fonction recherche les arguments et lance les fonction correspondantes
 * @return {*} None
 */
function search_args() {
    let start = 0;
  write("log.txt", "Arguments " + process.argv);
  if(process.argv[0] == "-save"){
    if(process.argv[1] != "-action"){
        start = 2;
        save_path = process.argv[1];
    }
    else{
        start = 1;
    }
    download = true;
  }
  if (process.argv[start] == "-action") {
    if (process.argv[start + 2] != input && process.argv[start + 2] != "./movies.json") {
      input = process.argv[start + 2];
      try {
        moviesTab = require(input);
      } catch (error) {
      }
    }
    if (process.argv[start + 1] == "sort_titre") {
      if (process.argv[start + 3] != output) {
        output = process.argv[start + 3];
      }
      sort_titre();
    } else if (process.argv[start + 1] == "sort_date") {
      if (process.argv[start + 3] != output) {
        output = process.argv[start + 3];
      }
      sort_date();
    } else if (process.argv[start+1] == "transform") {
      transform();
    } else if (process.argv[start+1] == "search_key_word") {
      if (process.argv[start+3] != null) {
        if (process.argv[start+4] != null) {
          search_key_word(process.argv[start+3], process.argv[start+4]);
        }
        if(process.argv[start+1] == "search_date" ){
            search_by_year(); 
         }
        }
    }
    if (process.argv[start+1] == "search_date") {
      search_by_year();
    }
  } 
}
/**
 * Cette fonction permet d'afficher les films correspondants au mot clé et au genre
 * @param {*} keyword le mot clé à rechercher
 * @param {*} genre le genre à rechercher
 */
function search_key_word(keyword, genre) {
  write("log.txt", "Search By : Keyword, Genre");
  write("log.txt", "Keyword : " + keyword)
  write("log.txt", "Genre : " + genre)
  tab = moviesTab;
  let save_tab = [];
  for (let i = 0; i < tab.length - 1; i++) {
    let index = tab[i].title;
    let movieGenres = tab[i].genres;
    index = JSON.stringify(index);
    if (index.includes(keyword)) {
      if (movieGenres != null) {
        for (let index = 0; index < movieGenres.length; index++) {
          if (movieGenres[index] == genre) {
            console.log(tab[i]);
            save_tab.push(tab[i]);
          }
        }
      }
    }
  }
  if(download == true) {
    download_images(save_tab);
}
}
/**
 * Cette fonction permet de transformer des secondes en années et de l'ajouter aprés leur titre
 */
function transform() {
    write("log.txt", "Transform")
  let start = new Date().getTime();

  for (i = 0; i < moviesTab.length; i++) {
    let fDate = moviesTab[i].release_date;
    let annéeMovie = Math.floor(fDate / 60 / 60 / 24 / 365 + 1970);
    var d = new Date(moviesTab[i].release_date);
    moviesTab[i].title = moviesTab[i].title + " (" + annéeMovie + ")";
    moviesTab[i] = JSON.stringify(moviesTab[i]) + "\n";
  }
  write(output, moviesTab);
  let stop = new Date().getTime();
  write("log.txt", "Time exceeded : " + (stop - start) / 60 + " secondes");
}

/**
 * Cette fonction permet de trier le tableau des films, par titres
 * @param {*} tab le tableau à trier
 * @return {*} tab, le tableau trié par titres
 */
function sort(tab) {
  write("log.txt", "Sort By : Title");
  for (let i = tab.length - 1; i > 1; i--) {
    for (let j = 0; j < tab.length - 1; j++) {
      let hh = tab[j + 1].title.localeCompare(tab[j].title);
      if (hh == -1) {
        let temp = tab[j + 1];
        tab[j + 1] = tab[j];
        tab[j] = temp;
      }
    }
  }
  return tab;
}

/**
 * Cette fonction permet le tri des dates du tableau
 * @param {*} tab Le tableau de movies a trier
 * @return {*} tab Le tableau de movies trié
 */
function sort_date_now(tab) {
  write("log.txt", "Sort By : Date");
  for (let i = tab.length - 1; i > 1; i--) {
    for (let j = 0; j < tab.length - 1; j++) {
      if (tab[j + 1].release_date < tab[j].release_date) {
        let temp = tab[j + 1];
        tab[j + 1] = tab[j];
        tab[j] = temp;
      }
    }
  }
  return tab;
}
/**
 *Cette fonction permet de lancer la fonction de tri par dates, et écrit les
 *résultats dans un fichier
 */
function sort_date() {
  let start = new Date().getTime();
  let tab = [];
  tab = sort_date_now(moviesTab);
  write("log.txt", "Sort finished");
  for (let index = 0; index < tab.length; index++) {
    tab[index] = JSON.stringify(tab[index]) + "\n";
  }
  write(output, tab);
  let stop = new Date().getTime();
  write("log.txt", "Time exceeded : " + (stop - start) / 60 + " secondes");
}

/**
 *Cette fonction permet de lancer la fonction de tri par titre, et écrit les
 *résultats dans un fichier
 */
function sort_titre() {
  let start = new Date().getTime();
  let tab = [];
  tab = sort(moviesTab);
  write("log.txt", "Sort finished");
  for (let index = 0; index < tab.length; index++) {
    tab[index] = JSON.stringify(tab[index]) + "\n";
  }
  write(output, tab);
  let stop = new Date().getTime();
  write("log.txt", "Time exceeded : " + (stop - start) / 60 + " secondes");
}

/**
 * Cette fonction permet d'écrire dans un fichier
 * @param {*} out Le fichier de sortie
 * @param {*} thingToWrite la chose à écrire dans le fichier de sortie
 */
function write(out, thingToWrite) {
  let fs = require("fs");
  fs.appendFile(out, thingToWrite + "\n", function(err) {
    if (err) return console.log(err);
  });
}
function search_by_year() {
    let save_tab = [];
  if (typeof date == "string") {
    return "l'année choisis n'est pas au bon format: \nle format doit être à cette exemple: '1970' ";
  }
  if (process.argv[4] == "true") {
    search_by_year(0);
  }
  if (process.argv[4] == "false") {
    let date = process.argv[3];
    for (let i = 0; i < moviesTab.length; i++) {
      let dateR = moviesTab[i].release_date;
      let year = 1970 + Math.round(dateR / 31536000);
      if (date == year) {
        console.log(moviesTab[i]);
        save_tab.push(tab[i]);
      }
    }
    if(download == true) {
      download_images(save_tab);
  }
  }
  let stop = new Date().getTime();
  write("log.txt", "Time exceeded : " + (stop - start) / 60 + " secondes");
}

function search_by_year_true(i) {
  let date = process.argv[3];
  let dateR = moviesTab[i].release_date;
  let year = 1970 + Math.round(dateR / 31536000);
  if (date == year) {
    console.log(moviesTab[i]);
    if (i < moviesTab.length - 1) {
      search_by_year_true(i + 1);
    }
  } else {
    if (i < moviesTab.length - 1) {
      search_by_year_true(i + 1);
    }
  }
}

/**
 * Fonction qui permet de telecharger les images
 * @param {*} tab le tableau de films
 */
function download_images(tab){
    console.log(tab)
    const download = (url, path, callback) => { request.head(url, (err, res, body) => {
        request(url).pipe(fs.createWriteStream(path)).on('close', callback)
    })}
    for (let index = 0; index < tab.length; index++){
        const url = tab[index].poster;
        const path = save_path + tab[index].title + '.png';
        download(url, path, () => {console.log('Done!')})
    }
}

start();
