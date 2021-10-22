/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let mm = {}
    let word_arr = []

    for (let i=0; i < this.words.length; i++) {
      let key_word = this.words[i];
      if ((Object.keys(mm).indexOf(key_word) == -1)) {
        word_arr = [];
      }
      else {
        word_arr = mm[key_word];
      }
      (i+1 == this.words.length) ? word_arr.push(null) : word_arr.push(this.words[i+1]); 
      mm[key_word] = word_arr;
    }
    return mm;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let chains = this.makeChains(); // MM object
    
    // first word to start chaining
    let key_words = Object.keys(chains); // array of key-words in MM object to choose from
    let key_num = key_words.length; // number of words to choose from
    let key_ind = Math.floor(Math.random()*key_num); // random index in key_words array
    let curr_word = key_words[key_ind]; //current word  
    let resultText = curr_word; 
    for (let i = 2; i <= numWords; i++) {
      let next_word_ind = Math.floor(Math.random()*chains[curr_word].length);
      let next_word = chains[curr_word][next_word_ind];
      if (next_word) {
        resultText = [resultText, next_word].join(' ');
        curr_word = next_word; 
      }
      else {
        return resultText;  
      }
    }
    return resultText; 
  }
}

module.exports = { MarkovMachine };