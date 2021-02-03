process.argv.shift();
process.argv.shift();
console.log(process.argv);

for (let index = 0; index < process.argvlength; index++) {
    if(process.argv[index] == "-action"){
        if(process.argv[index+1] == "sort_titre"){
            sort_titre();
        }
    }
    else{
        console.log("Erreur, veuillez reéssayer")
    }   
}

function sort_titre(){

}