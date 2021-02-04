process.argv.shift();
process.argv.shift();
var moviesTab = require('./movies.json')

function start(){
    search_args()
}

function search_args(){
    if(process.argv[0] == "-action"){
        if(process.argv[1] == "sort_titre"){
            sort_titre();
        }
    }
    else{
        console.log("Erreur, veuillez réessayer")
    }   
}

function sort(tab){
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

function sort_date(){

}
function sort_titre(){
    let tab = [];
    for (let index = 0; index < moviesTab.length; index++) {
        tab.push(moviesTab[index]);
    }
    tab = sort(tab);
    for (let index = 0; index < tab.length; index++) {
        tab[index] = JSON.stringify(tab[index]);
        write("./sort_titre.json", tab[index]);

    }
}

function write(out, thingToWrite) {
    let fs = require('fs');
    fs.appendFile(out, thingToWrite + "\n", function (err) {
  if (err) return console.log(err);
});
}
start();