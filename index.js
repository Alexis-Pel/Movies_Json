process.argv.shift();
process.argv.shift();
const { PassThrough } = require('stream');
var moviesTab = require('./movies.json')
var output = "./output.json";
var input = "./movies.json"

function start(){
    write("log.txt", "------------------------------------------------------")
    search_args()
}

function search_args(){
    write("log.txt", "Arguments " + process.argv)
    if(process.argv[0] == "-action"){
        if (process.argv[2]!= input && process.argv[2] != "./movies.json"){
            input = process.argv[2];
            try {
                moviesTab = require(input);
            } catch (error) {
                console.log("Erreur, le fichier séléctionné n'est pas valide")
            }
        }
        if(process.argv[1] == "sort_titre"){
            if(process.argv[3]!= output){
                output = process.argv[3];
            }
            sort_titre();
        }
        else if (process.argv[1] == "sort_date"){
            if(process.argv[3]!= output){
                output = process.argv[3];
            }
            sort_date();
        }
        else if (process.argv[1] == "transform") {
            transform();
        }
        else if (process.argv[1] == "search_key_word"){
            if(process.argv[3] != null){
                if (process.argv[4] != null){
                    search_key_word(process.argv[3], process.argv[4]);
                }
            }
            else{
                return;
            }
        }
        if(process.argv[1] == "search_by_year" ){
            search_by_year(); 
         }
    }
    else{
        console.log("Erreur, veuillez réessayer")
    }
}

function search_key_word(keyword, genre){
    write("log.txt","Search By : Keyword")
    tab = moviesTab;
    for (let i = 0; i < tab.length-1; i++) {
        let index = tab[i].title;
        let movieGenres = tab[i].genres;
        index = JSON.stringify(index);
        if (index.includes(keyword)){
            if (movieGenres != null){
                for (let index = 0; index < movieGenres.length; index++) {
                    if (movieGenres[index] == genre){
                        console.log(tab[i]);
                    }
                    
                }
            }
        }
    }
}
function transform(){
    let start = new Date().getTime();

    for (i = 0; i < moviesTab.length; i++) {
        let fDate = moviesTab[i].release_date;
        let annéeMovie = Math.floor((((((fDate) / 60) / 60) / 24) / 365) + 1970);
        var d = new Date(moviesTab[i].release_date);
        moviesTab[i].title = moviesTab[i].title + " (" + annéeMovie + ")";
        moviesTab[i] = JSON.stringify(moviesTab[i]) + "\n";
    }
    write(output,moviesTab)
    let stop = new Date().getTime();
    write("log.txt", ("Time exceeded : " + (stop - start) /60) + " secondes")
}
function sort(tab){
    write("log.txt","Sort By : Title")
    for (let i = tab.length-1; i > 1; i--) {
        for (let j = 0; j < tab.length-1; j++) {
            let hh = tab[j+1].title.localeCompare(tab[j].title)
            if(hh == -1){
                let temp = tab[j+1];
                tab[j+1] = tab[j];
                tab[j] = temp;
            }
        }
    }
    return tab;
}

function sort_date_now(tab){
    write("log.txt","Sort By : Date")
    for (let i = tab.length-1; i > 1; i--) {
        for (let j = 0; j < tab.length-1; j++) {
            if(tab[j+1].release_date < tab[j].release_date){
                let temp = tab[j+1];
                tab[j+1] = tab[j];
                tab[j] = temp;
            }
        }
    }
    return tab;
}

function sort_date(){
    let start = new Date().getTime();
    let tab = [];
    tab = sort_date_now(moviesTab);
    write("log.txt","Sort finished")
    for (let index = 0; index < tab.length; index++) {
        tab[index] = JSON.stringify(tab[index]) + "\n";
    }
    write(output,tab)
    let stop = new Date().getTime();
    write("log.txt", ("Time exceeded : " + (stop - start) /60) + " secondes")
}
function sort_titre(){
    let start = new Date().getTime();
    let tab = [];
    tab = sort(moviesTab);
    write("log.txt","Sort finished")
    for (let index = 0; index < tab.length; index++) {
        tab[index] = JSON.stringify(tab[index]) + "\n";
    }
    write(output,tab)
    let stop = new Date().getTime();
    write("log.txt", ("Time exceeded : " + (stop - start) /60) + " secondes")
}

function write(out, thingToWrite) {
    let fs = require('fs');
    fs.appendFile(out, thingToWrite + "\n", function (err) {
  if (err) return console.log(err);
});
}
function search_by_year(){
    
    if(typeof date == "string" ){
        return "l'année choisis n'est pas au bon format: \nle format doit être à cette exemple: '1970' ";
    }
    if(process.argv[4] == "true"){
        search_(0);
    }
    if(process.argv[4] == "false"){
        let date = process.argv[3];
        for(let i =0; i < moviesTab.length; i++){
            let dateR = moviesTab[i].release_date;
            let year = 1970 + Math.round(dateR / 31536000);
            if(date == year){
                console.log(moviesTab[i]);
            }
        }
    }
}
function search_(i){
    let date = process.argv[3];
        let dateR = moviesTab[i].release_date;
            let year = 1970 + Math.round(dateR / 31536000);
            if(date == year){
                console.log(moviesTab[i]);
                if(i < moviesTab.length-1){
                    search_(i+1);
                }
            }
            else{
                if(i < moviesTab.length-1){
                    search_(i+1);
                }
            }
}
start();