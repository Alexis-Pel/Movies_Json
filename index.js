process.argv.shift();
process.argv.shift();
var moviesTab = require('./movies.json')
var output = "./output";
var input = "./movies.json"

function start(){
    write("log.txt", "------------------------------------------------------")
    search_args()
}

function search_args(){
    write("log.txt", "Arguments " + process.argv)
    if(process.argv[0] == "-action"){
        if (process.argv[2]!= input){
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
    }
    else{
        console.log("Erreur, veuillez réessayer")
    }
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
        tab[index] = JSON.stringify(tab[index]);
        write(output, tab[index]);
    }
    let stop = new Date().getTime();
    write("log.txt", ("Time exceeded : " + (stop - start)))
}
function sort_titre(){
    let start = new Date().getTime();
    let tab = [];
    tab = sort(moviesTab);
    write("log.txt","Sort finished")
    for (let index = 0; index < tab.length; index++) {
        tab[index] = JSON.stringify(tab[index]);
        write(output, tab[index]);
    }
    let stop = new Date().getTime();
    write("log.txt", ("Time exceeded : " + (stop - start)))
}

function write(out, thingToWrite) {
    let fs = require('fs');
    fs.appendFile(out, thingToWrite + "\n", function (err) {
  if (err) return console.log(err);
});
}
start();