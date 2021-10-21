const  { MarkovMachine } = require('./markov');
let mm;

beforeEach(function() {
    mm = new MarkovMachine("the cat in the hat");
});


describe("testing class constructor", function () {
   
    test("test words array 1", function() {
       const words = mm.words;
       expect(words.length).toEqual(5);
   }); 
   
   test("test words array 2", function() {
        mm = new MarkovMachine("That Sam-I-am That Sam-I-am! I do not like That Sam-I-am");
        const words = mm.words;
        expect(words.length).toEqual(10);
   });
   
   test("testing chains creating function", function() {
        let chains = mm.makeChains(); 
        expect(chains).toEqual({"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]});
   })
});

describe("testing making text function", function () {

    test("testing text length", function() {
        let text = mm.makeText(3);
        expect(text.split(' ').length).toBeLessThanOrEqual(3);
        text = mm.makeText(10);
        expect(text.split(' ').length).toBeLessThanOrEqual(10);
    }); 
    
    test("testing correct chaining and stop in a result text", function() {
        mm = new MarkovMachine("the cat in hat");
        let text = mm.makeText(200);
        let text_arr = text.split(' ');
        expect(text_arr).toContain('hat');
        if (text_arr.length > 1) {
            expect(text_arr[text_arr.length-2]).toEqual('in');
        }
    });
 });

