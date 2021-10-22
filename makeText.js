/** Command-line tool to generate Markov text. */

const  { MarkovMachine } = require('./markov');
const fs = require('fs');
const axios = require('axios');

// read a given file and start a new Markov Mashine with obtained data 
function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        let mm = new MarkovMachine(data);
        console.log(mm.makeText());
    });
}


// read a content from a given url and start a new Markov Mashine with obtained data 
function webCat(url) {
    axios.get(url)
    .then(resp => {
      let mm = new MarkovMachine(resp.data);
      console.log(mm.makeText());
    })
    .catch(err => {
        console.log(`Error fetching ${url}: ${err}`)
    })
}


if (process.argv[2] == 'file') {
        cat(process.argv[3]); 
    } 
else if (process.argv[2] == 'url') {
        webCat(process.argv[3]);
    }
else {
     console.log("Unknown command");
     process.exit(1);
}
 